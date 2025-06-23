const mongoose = require("mongoose");

const LoginLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Khóa ngoại trỏ sang users.id
    ip_address: { type: String, required: true }, // Địa chỉ IP đăng nhập
    device_info: { type: String, required: true }, // Thông tin thiết bị đăng nhập
    status: { type: String, required: true }, // Kết quả: 'success', 'fail', 'locked',...
    created_at: { type: Date, default: Date.now } // Thời điểm login
});

module.exports = mongoose.model("LoginLog", LoginLogSchema);

