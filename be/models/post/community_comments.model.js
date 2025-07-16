const mongoose = require("mongoose");

const CommunityCommentSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityPost", required: true }, // Bình luận thuộc bài nào
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai bình luận
    content: { type: String, required: true }, // Nội dung bình luận
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityComment", default: null }, // Trả lời bình luận nào
    status: { type: String, default: "active" }, // Trạng thái bình luận
    created_at: { type: Date, default: Date.now }, // Thời điểm bình luận
    updated_at: { type: Date, default: Date.now }, // Thời điểm sửa bình luận
});

module.exports = mongoose.model("CommunityComment", CommunityCommentSchema);
