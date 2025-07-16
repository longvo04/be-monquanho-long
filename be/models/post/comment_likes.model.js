const mongoose = require("mongoose");

const CommentLikeSchema = new mongoose.Schema({
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityComment", required: true }, // Like cho comment nào
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai like
    created_at: { type: Date, default: Date.now }, // Thời điểm like
});

module.exports = mongoose.model("CommentLike", CommentLikeSchema);
