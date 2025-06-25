const CommunityPostsModel = require('../models/post/community_posts.model');
const CommunityCommentsModel = require('../models/comment/community_comments.model');
const PostLikesModel = require('../models/post/post_likes.model');
const PostCategoriesModel = require('../models/post/post_categories.model');
const PostImagesModel = require('../models/post/post_images.model');
const commentService = require('./comment.service');
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require('../middleware/cloudinary.middleware');
const toSlug = require('../utils/slug.util');

// Tạo Post mới
exports.createPost = async (postData, imageFiles) => {
    try {

        // Thêm ảnh vào dữ liệu bài đăng nếu có
        const imageUrls = await uploadImageToCloudinary(imageFiles);
        postData.slug = toSlug(postData.title); // Tạo slug từ tiêu đề bài đăng
        const communityPost = new CommunityPostsModel(postData);
        const savedPost = await communityPost.save();
        // Nếu có ảnh, lưu vào PostImagesModel refer đến post id hiện tại
        if (imageUrls.length > 0) {
            const postImages = imageUrls.map(url => ({
                post_id: savedPost._id,
                image_url: url
            }));
            await PostImagesModel.insertMany(postImages);
        }
        return {...savedPost.toObject(), images: imageUrls };
    } catch (error) {
        console.error("Lỗi khi tạo bài viết mới:", error.message);
        throw new Error("Lỗi khi tạo bài viết mới: " + error.message);
    }
};

exports.getAllPostsWithDetails = async () => {
    try {
        // Lấy tất cả bài viết
        const posts = await CommunityPostsModel.find()
            .populate({
                path: "user",
                select: '_id name avatar_url',
            })
            .populate({
                path: "category",
                select: '_id name description',
            })
            .select('_id user_id category_id title content status created_at updated_at slug')
            
        // Lấy chi tiết cho từng bài viết
        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            // Ảnh của bài viết
            const images = await PostImagesModel.find({ post_id: post._id }).select('_id image_url');

            // Bình luận của bài viết
            const comments = await commentService.getCommentsByPostId(post._id);
            // const comments = await CommunityCommentsModel.find({ post_id: post._id, parent_id: null })
            //     .populate({
            //         path: "childComment",
            //         select: '_id content user_id created_at updated_at',
            //         populate: {
            //             path: "user",
            //             select: '_id name avatar_url',
            //         }
            //     })
            //     .select('_id content user_id created_at updated_at')
            //     .lean()

            // Lượt thích của bài viết
            const likes = await PostLikesModel.find({ post_id: post._id }).select('_id user_id created_at');


            return { 
                ...post.toObject(),
                images,
                comments,
                likes
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
        if (!id) {
            throw new Error("ID bài đăng không được cung cấp");
        }
        // Lấy bài đăng theo ID
        const post = await CommunityPostsModel.findById(id)
            .populate({
                path: "user",
                select: '_id name avatar_url',
            })
            .populate({
                path: "category",
                select: '_id name description',
            })
            .select('_id user_id category_id title content status created_at updated_at slug')
        if (!post) {
            throw new Error("Bài đăng không tồn tại");
        }
        const images = await PostImagesModel.find({ post_id: post._id }).select('_id image_url');

        // Bình luận của bài viết
        const comments = await commentService.getCommentsByPostId(post._id);

        // Lượt thích của bài viết
        const likes = await PostLikesModel.find({ post_id: post._id }).select('_id user_id created_at');

        postWithDetails = {
            ...post.toObject(),
            images,
            comments,
            likes
        };
        return postWithDetails;
    } catch (error) {
        console.error("Lỗi khi lấy bài đăng:", error.message);
        throw new Error("Lỗi khi lấy bài đăng: " + error.message);
    }
}

exports.getPostsByCategory = async (categoryId) => {
    try {
        const category = await PostCategoriesModel.findById(categoryId).select('_id name description');
        if (!category) {
            throw new Error("Danh mục không tồn tại");
        }
        const posts = await CommunityPostsModel.find({ category_id: categoryId });
        if (!posts) {
            return []; // Trả về mảng rỗng nếu không có bài viết nào
        }

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
        console.error("Có lỗi khi lấy danh sách chi tiết bài viết theo danh mục:", error);
        throw new Error("Có lỗi khi lấy danh sách chi tiết bài viết theo danh mục: " + error.message);
    }
}

exports.deletePost = async (id) => {
    try {
        // Xóa ảnh khỏi Cloudinary
        const allImages = await PostImagesModel.find({ post_id: id });
        const deletePromises = allImages.map(async (image) => {
            await deleteImageFromCloudinary("images/" + image.image_url.split('/').pop().split('.')[0].trim());
        });
        await Promise.all(deletePromises);
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

exports.deleteAllPosts = async () => {
    try {
        // Xóa tất cả các ảnh trên Cloudinary
        const allImages = await PostImagesModel.find({});
        const deletePromises = allImages.map(async (image) => {
            await deleteImageFromCloudinary(image.image_url.split('/').pop().split('.')[0]);
        });
        await Promise.all(deletePromises);
        // Xóa tất cả ảnh liên quan đến bài đăng
        await PostImagesModel.deleteMany({});
        // Xóa tất cả bình luận liên quan đến bài đăng
        await CommunityCommentsModel.deleteMany({});
        // Xóa tất cả lượt thích liên quan đến bài đăng
        await PostLikesModel.deleteMany({});
        // Cuối cùng, xóa tất cả bài đăng
        return await CommunityPostsModel.deleteMany({});
    } catch (error) {
        console.error("Lỗi khi xóa tất cả yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi xóa tất cả yêu cầu liên hệ: " + error.message);
    }
}

exports.updatePost = async (id, updateData, imageFiles, removedImagesId) => {
    try {
        // Xóa ảnh khỏi cloundinary nếu có ảnh bị xóa
        if (removedImagesId && removedImagesId.length > 0) {
            const deletePromises = removedImagesId.map(async (imageId) => {
                const image = await PostImagesModel.findById(imageId);
                if (image) {
                    // Xóa ảnh khỏi Cloudinary
                    deleteImageFromCloudinary(image.image_url.split('/').pop().split('.')[0]);
                }
            });
            await Promise.all(deletePromises);
            await PostImagesModel.deleteMany({ _id: { $in: removedImagesId } });
        }
        // Nếu có ảnh mới, tải lên Cloudinary
        let imageUrls = [];
        if (imageFiles && imageFiles.length > 0) {
            imageUrls = await uploadImageToCloudinary(imageFiles);
        }

        const updatedPost = await CommunityPostsModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            throw new Error("Bài đăng không tồn tại");
        }

        // Nếu có ảnh mới, lưu vào PostImagesModel refer đến post id hiện tại
        if (imageUrls.length > 0) {
            const postImages = imageUrls.map(url => ({
                post_id: id,
                image_url: url
            }));
            await PostImagesModel.insertMany(postImages);
        }

        return { ...updatedPost.toObject(), images: imageUrls };
    } catch (error) {
        console.error("Lỗi khi cập nhật bài viết:", error.message);
        throw new Error("Lỗi khi cập nhật bài viết: " + error.message);
    }
}