const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Ai gửi yêu cầu
    name: { type: String, required: true }, // Tên người liên hệ (tự nhập)
    email: { type: String, required: true }, // Email liên hệ (tự nhập)
    category: { type: String, required: true }, // Loại yêu cầu (hỗ trợ, góp ý, báo lỗi...)
    content: { type: String, required: true }, // Nội dung yêu cầu/hỏi đáp
    status: { type: String, default: "pending" }, // Trạng thái: pending/answered/closed
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi
    updated_at: { type: Date, default: Date.now }, // Cập nhật trả lời
});

module.exports = mongoose.model("Contact", ContactSchema);
