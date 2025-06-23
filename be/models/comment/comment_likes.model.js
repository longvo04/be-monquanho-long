const mongoose = require("mongoose");

const CommentLikesSchema = new mongoose.Schema({
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "community_comments", required: true }, // Bài đăng mà like thuộc về
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Ai gửi like
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi bình luận
});

module.exports = mongoose.model("CommentLikes", CommentLikesSchema);
