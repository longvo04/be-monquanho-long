const CommunityPostsModel = require('../models/post/community_posts.model');
const CommunityCommentsModel = require('../models/comment/community_comments.model');
const PostLikesModel = require('../models/post/post_likes.model');
const PostCategoriesModel = require('../models/post/post_categories.model');
const PostImagesModel = require('../models/post/post_images.model');

// Tạo Post mới không có ảnh
exports.createPost = async (postData, imageUrls) => {
    try {
        const communityPost = new CommunityPostsModel(postData);
        const savedPost = await communityPost.save();
        // Nếu có ảnh, lưu vào PostImagesModel
        if (imageUrls.length > 0) {
            const postImages = new PostImagesModel({
                post_id: savedPost._id,
                image_url: imageUrls
            });
            await postImages.save();
        }
        return savedPost;
    } catch (error) {
        console.error("Lỗi khi tạo yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi tạo yêu cầu liên hệ: " + error.message);
    }
};

exports.getAllPostsWithDetails = async () => {
    try {
        // Lấy tất cả bài viết
        const posts = await CommunityPostsModel.find();

        // Lấy chi tiết cho từng bài viết
        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            // Ảnh của bài viết
            const images = await PostImagesModel.find({ post_id: post._id }).select('_id image_url');

            // Bình luận của bài viết
            const comments = await CommunityCommentsModel.find({ post_id: post._id }).select('_id content user_id created_at');

            // Lượt thích của bài viết
            const likes = await PostLikesModel.find({ post_id: post._id }).select('_id user_id created_at');

            // Danh mục của bài viết
            const category = await PostCategoriesModel.findById(post.category_id).select('_id name description');

            return {
                ...post.toObject(),
                images,
                comments,
                likes,
                category
            };
        }));

        return postsWithDetails;
    } catch (error) {
        console.error("Có lỗi khi lấy danh sách chi tiết bài viết:", error);
        throw new Error("Có lỗi khi lấy danh sách chi tiết bài viết: " + error.message);
    }
}

exports.getPostById = async (id) => {
    try {
        const post = await CommunityPostsModel.findById(id);
        if (!post) {
            throw new Error("Bài đăng không tồn tại");
        }
        const images = await PostImagesModel.find({ post_id: post._id }).select('_id image_url');

        // Bình luận của bài viết
        const comments = await CommunityCommentsModel.find({ post_id: post._id }).select('_id content user_id created_at');

        // Lượt thích của bài viết
        const likes = await PostLikesModel.find({ post_id: post._id }).select('_id user_id created_at');

        // Danh mục của bài viết
        const category = await PostCategoriesModel.findById(post.category_id).select('_id name description');
        postWithDetails = {
            ...post.toObject(),
            images,
            comments,
            likes,
            category
        };
        return postWithDetails;
    } catch (error) {
        console.error("Lỗi khi lấy bài đăng:", error.message);
        throw new Error("Lỗi khi lấy bài đăng: " + error.message);
    }
}

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
        // Xóa tất cả ảnh liên quan đến bài đăng
        await PostImagesModel.deleteMany({ post_id: id });
        // Xóa tất cả bình luận liên quan đến bài đăng
        await CommunityCommentsModel.deleteMany({ post_id: id });
        // Xóa tất cả lượt thích liên quan đến bài đăng
        await PostLikesModel.deleteMany({ post_id: id });
        // Cuối cùng, xóa bài đăng
        return await CommunityPostsModel.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi xóa yêu cầu liên hệ: " + error.message);
    }
};