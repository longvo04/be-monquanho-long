const mongoose = require("mongoose");

const PostImagesSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityPosts", required: true }, // Bài đăng mà ảnh thuộc về
    image_url: { type: String },
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi ảnh
});

module.exports = mongoose.model("PostImages", PostImagesSchema);
