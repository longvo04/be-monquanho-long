const mongoose = require("mongoose");

const CommunityPostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai đăng bài
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostCategory", required: true }, // Thuộc chủ đề nào
    content: { type: String, required: true }, // Nội dung bài viết
    status: { type: String, default: "active" }, // Trạng thái bài viết
    image_urls: [{ type: String }], // Mảng đường dẫn ảnh
    created_at: { type: Date, default: Date.now }, // Thời điểm đăng
    updated_at: { type: Date, default: Date.now }, // Thời điểm sửa bài
});

module.exports = mongoose.model("CommunityPost", CommunityPostSchema);
