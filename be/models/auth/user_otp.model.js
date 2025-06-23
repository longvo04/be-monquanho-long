const mongoose = require("mongoose");

const UserOtpSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Khóa ngoại trỏ sang users.id
    otp_code: { type: String, required: true }, // Mã OTP gửi cho người dùng
    type: { type: String, required: true }, // Loại OTP (register, reset, 2FA, ...)
    expires_at: { type: Date, required: true }, // Thời gian hết hiệu lực OTP
    used: { type: Boolean, default: false }, // Đã sử dụng OTP chưa
    temp_password: { type: String, default: null }, // Lưu mật khẩu mới tạm thời
    created_at: { type: Date, default: Date.now } // Thời điểm tạo mã OTP
});

module.exports = mongoose.model("UserOtp", UserOtpSchema);

