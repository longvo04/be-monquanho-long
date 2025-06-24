const mongoose = require("mongoose");

const PostImagesSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "community_posts", required: true }, // Bài đăng mà ảnh thuộc về
    image_url: { 
        type: [String], 
        required: true, 
        validate: [val => val.length <= 5, '{PATH} Chỉ được đăng nhiều nhất 5 ảnh'],
        default: []
    }, // Danh sách URL ảnh, tối đa 5 ảnh
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi ảnh
});

module.exports = mongoose.model("PostImages", PostImagesSchema);
