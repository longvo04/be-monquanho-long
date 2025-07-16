const mongoose = require("mongoose");

const PostImageSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityPost", required: true }, // Khóa ngoại sang community_posts.id
    image_url: { type: String, required: true }, // Đường dẫn ảnh
    created_at: { type: Date, default: Date.now }, // Thời điểm upload ảnh
});

module.exports = mongoose.model("PostImage", PostImageSchema);
