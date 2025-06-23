const CommunityPostsModel = require('../models/post/community_posts.model');
const PostImagesModel = require('../models/post/post_images.model');
const CommunityCommentsModel = require('../models/comment/community_comments.model');
const PostLikesModel = require('../models/post/post_likes.model');
const CommentLikesModel = require('../models/comment/comment_likes.model');

// Tạo Post mới không có ảnh
exports.createPost = async (postData) => {
    try {
        const communityPost = new CommunityPostsModel(postData);
        return await communityPost.save();
    } catch (error) {
        console.error("Lỗi khi tạo yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi tạo yêu cầu liên hệ: " + error.message);
    }
};

exports.getAllPosts = async () => {
    try {
        return await CommunityPostsModel.find()
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng:", error.message);
        throw new Error("Lỗi khi lấy danh sách bài đăng: " + error.message);
    }
};

exports.updatePost = async (id, updateData) => {
    try {
        return await CommunityPostsModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi cập nhật yêu cầu liên hệ: " + error.message);
    }
}

exports.deletePost = async (id) => {
    try {
        return await CommunityPostsModel.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi xóa yêu cầu liên hệ: " + error.message);
    }
};