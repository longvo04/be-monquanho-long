const mongoose = require("mongoose");

const CommunityCommentsSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "community_posts", required: true }, // Bài đăng mà bình luận thuộc về
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Ai gửi bình luận
    content: { type: String, required: true, maxLength: 500 }, // Nội dung bình luận, hỗ trợ emoji
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "community_comments", default: null }, // ID bình luận cha nếu là trả lời, null nếu là bình luận gốc
    status: { type: String, default: "active" }, // Trạng thái: active/hidden/deleted
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi bình luận
    updated_at: { type: Date, default: Date.now }, // Cập nhật bình luận
});

module.exports = mongoose.model("CommunityComments", CommunityCommentsSchema);
