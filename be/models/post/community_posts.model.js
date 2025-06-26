const mongoose = require("mongoose");

const CommunityPostsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Ai gửi đăng bài
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "post_categories", required: true }, // Danh mục bài đăng
    title: { type: String, required: true }, // Tiêu đề bài đăng
    content: { type: String, required: true, maxLength: 1000 }, // Nội dung bài viết, hỗ trợ emoji
    status: { type: String, default: "active" }, // Trạng thái: active/hidden/deleted
    created_at: { type: Date, default: Date.now }, // Thời điểm gửi
    updated_at: { type: Date, default: Date.now }, // Cập nhật trả lời
    slug: { type: String, unique: true }, // Đường dẫn thân thiện với SEO
});

CommunityPostsSchema.virtual('images', {
    ref: 'PostImages',
    localField: '_id',
    foreignField: 'post_id',
});

CommunityPostsSchema.virtual('likeCount', {
    ref: 'PostLikes',
    localField: '_id',
    foreignField: 'post_id',
    count: true // Đếm số lượng like
});

CommunityPostsSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true // Chỉ lấy một đối tượng User
});

CommunityPostsSchema.virtual('category', {
    ref: 'PostCategories',
    localField: 'category_id',
    foreignField: '_id',
});

CommunityPostsSchema.set('toObject', { virtuals: true });
CommunityPostsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("CommunityPosts", CommunityPostsSchema);
