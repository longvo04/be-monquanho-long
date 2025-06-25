const mongoose = require("mongoose");

const CommentLikesSchema = new mongoose.Schema({
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "community_comments", required: true }, // Comment mà like thuộc về
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Ai gửi like
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi bình luận
});

CommentLikesSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
});

CommentLikesSchema.set('toObject', { virtuals: true });
CommentLikesSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("CommentLikes", CommentLikesSchema);
