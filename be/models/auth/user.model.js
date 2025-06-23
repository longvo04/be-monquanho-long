const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Email user, duy nhất, bắt buộc
    password_hash: { type: String, default: null }, // Hash mật khẩu (null nếu dùng Google)
    name: { type: String, required: true, unique: true }, // Tên hiển thị
    avatar_url: { type: String, default: null }, // Đường dẫn ảnh đại diện (có thể null)
    provider: { type: String, required: true }, // Kiểu đăng ký: 'local' hoặc 'google'
    provider_id: { type: String, default: null }, // Google sub nếu OAuth, null nếu local
    role: { type: String, default: 'user' }, // Vai trò: 'user', 'admin',...
    verified: { type: Boolean, default: false }, // Đã xác thực email/Google chưa
    is_banned: { type: Boolean, default: false }, // Có bị khóa tài khoản không
    last_login: { type: Date, default: null }, // Lần đăng nhập gần nhất (có thể null)
    created_at: { type: Date, default: Date.now }, // Thời điểm tạo
    updated_at: { type: Date, default: Date.now }, // Thời điểm cập nhật thông tin
    phone: { type: String, default: null } // Số điện thoại (có thể null)
});

UserSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });

module.exports = mongoose.model("User", UserSchema);
