const mongoose = require("mongoose");

const CommunityPostsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Ai gửi đăng bài
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "post_categories", required: true }, // Danh mục bài đăng
    title: { type: String, required: true }, // Tiêu đề bài đăng
    content: { type: String, required: true, maxLength: 1000 }, // Nội dung bài viết, hỗ trợ emoji
    status: { type: String, default: "active" }, // Trạng thái: active/hidden/deleted
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi
    updated_at: { type: Date, default: Date.now }, // Cập nhật trả lời
});

module.exports = mongoose.model("CommunityPosts", CommunityPostsSchema);
