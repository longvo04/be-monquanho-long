const mongoose = require("mongoose");

const PostLikeSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityPost", required: true }, // Like cho bài nào
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai like
    created_at: { type: Date, default: Date.now }, // Thời điểm like
});

module.exports = mongoose.model("PostLike", PostLikeSchema);
