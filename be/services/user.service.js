const User = require('../models/auth/user.model');
const bcrypt = require("bcryptjs");
const UserToken = require("../models/auth/user_token.model");
const LoginLog = require("../models/auth/login_log.model");
const jsonwebtoken = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const jwtExpirySeconds = 3600;

// Tạo người dùng mới
exports.createUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({
            ...userData,
            password_hash: hashedPassword, // Changed from password to password_hash
            password: undefined // Remove password field if it exists in userData
        });
        return await user.save();
    } catch (error) {
        console.error("Lỗi khi tạo người dùng:", error.message);
        throw new Error("Lỗi khi tạo người dùng: " + error.message);
    }
};

// Lấy người dùng theo email
exports.getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error("Lỗi khi tìm người dùng theo email:", error.message);
        throw new Error("Lỗi khi tìm người dùng theo email: " + error.message);
    }
};

// Lấy danh sách người dùng
exports.getAllUsers = async () => {
    try {
        return await User.find().select("-password_hash");
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error.message);
        throw new Error("Lỗi khi lấy danh sách người dùng: " + error.message);
    }
};

// Lấy chi tiết người dùng theo ID
exports.getUserById = async (id) => {
    try {
        return await User.findById(id).select("-password_hash");
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết người dùng:", error.message);
        throw new Error("Lỗi khi lấy chi tiết người dùng: " + error.message);
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (id, updateData) => {
    try {
        return await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password_hash");
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error.message);
        throw new Error("Lỗi khi cập nhật thông tin người dùng: " + error.message);
    }
};

// Xóa người dùng
exports.deleteUser = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error.message);
        throw new Error("Lỗi khi xóa người dùng: " + error.message);
    }
};

// Đăng ký người dùng mới
exports.registerUser = async (userData) => {
    try {
        const { email, password, name, phone } = userData; // Thêm phone

        if (!email || !password || !name) {
            throw new Error("Thiếu thông tin đăng ký");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email đã tồn tại");
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password_hash,
            name,
            phone, // Thêm phone
            provider: "local",
            verified: true,
        });

        return { _id: user._id, email: user.email, name: user.name, phone: user.phone }; // Trả về phone
    } catch (error) {
        console.error("Lỗi đăng ký:", error.message);
        throw error;
    }
};

// Đăng nhập người dùng
exports.loginUser = async (credentials, requestInfo) => {
    try {
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Sai email hoặc mật khẩu");
        }

        if (!user.verified) {
            throw new Error("Tài khoản chưa xác thực");
        }

        if (user.is_banned) {
            throw new Error("Tài khoản đã bị khóa");
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            throw new Error("Sai email hoặc mật khẩu");
        }

        const token = await this.generateAndSaveToken(user, requestInfo);

        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone, // thêm dòng này
            verified: user.verified, // <-- thêm dòng này
            token
        };
    } catch (error) {
        console.error("Lỗi đăng nhập:", error.message);
        throw error;
    }
};

// Đăng nhập với Google
exports.loginWithGoogle = async (idToken, requestInfo) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: idToken,
            audience: GOOGLE_CLIENT_ID // Đảm bảo khớp với Client ID
        });

        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;

        let user = await User.findOne({ provider: 'google', provider_id: sub });

        if (!user) {
            user = await User.create({
                email,
                name,
                avatar_url: picture,
                provider: 'google',
                provider_id: sub,
                verified: true,
                role: 'user',
            });
        }

        if (user.is_banned) {
            throw new Error("Tài khoản đã bị khóa");
        }

        const token = await this.generateAndSaveToken(user, requestInfo);

        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token
        };
    } catch (error) {
        console.error("Lỗi đăng nhập Google:", error.message);
        throw new Error("Token Google không hợp lệ");
    }
};

// Tạo và lưu token
exports.generateAndSaveToken = async (user, requestInfo) => {
    try {
        const token = jsonwebtoken.sign(
            { user: { _id: user._id, email: user.email, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: jwtExpirySeconds }
        );

        await UserToken.create({
            user_id: user._id,
            token,
            device_info: requestInfo.userAgent || '',
            ip_address: requestInfo.ip,
            expires_at: new Date(Date.now() + jwtExpirySeconds * 1000)
        });

        await LoginLog.create({
            user_id: user._id,
            ip_address: requestInfo.ip,
            device_info: requestInfo.userAgent || '',
            status: 'success'
        });

        return token;
    } catch (error) {
        console.error("Lỗi khi tạo token:", error.message);
        throw error;
    }
};