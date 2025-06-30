const mongoose = require("mongoose");

const PostLikesSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityPosts", required: true }, // Bài đăng mà like thuộc về
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai gửi like
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi bình luận
});

module.exports = mongoose.model("PostLikes", PostLikesSchema);
