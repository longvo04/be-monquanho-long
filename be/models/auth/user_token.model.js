const mongoose = require("mongoose");

const UserTokenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Khóa ngoại trỏ sang users.id
    token: { type: String, required: true }, // Lưu token đăng nhập (JWT, refresh token)
    device_info: { type: String, required: true }, // Thông tin thiết bị đăng nhập (user-agent)
    ip_address: { type: String, required: true }, // Địa chỉ IP khi đăng nhập
    expires_at: { type: Date, required: true }, // Thời gian hết hạn token/session
    created_at: { type: Date, default: Date.now } // Thời điểm tạo token/session
});

module.exports = mongoose.model("UserToken", UserTokenSchema);
