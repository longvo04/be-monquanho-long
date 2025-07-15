const CommunityPostsModel = require('../models/post/community_posts.model');
const CommunityCommentsModel = require('../models/comment/community_comments.model');
const PostLikesModel = require('../models/post/post_likes.model');
const PostCategoriesModel = require('../models/post/post_categories.model');
const PostImagesModel = require('../models/post/post_images.model');
const commentService = require('./comment.service');
const { deleteImageFromCloudinary } = require('../middleware/cloudinary.middleware');

// Tạo Post mới
exports.createPost = async (postData) => {
    try {

        // Thêm ảnh vào dữ liệu bài đăng nếu có
        const communityPost = new CommunityPostsModel(postData);
        const savedPost = await communityPost.save();
        // Nếu có ảnh, lưu vào PostImagesModel refer đến post id hiện tại
        return {...savedPost.toObject()};
    } catch (error) {
        console.error("Lỗi khi tạo bài viết mới:", error.message);
        throw new Error("Lỗi khi tạo bài viết mới: " + error.message);
    }
};

exports.addImagesToPost = async (postId, imgUrls) => {
    try {
        // Kiểm tra xem bài đăng có tồn tại không
        const post = await CommunityPostsModel.findById(postId);
        if (!post) {
            throw new Error("Bài đăng không tồn tại");
        }
        // Tạo ảnh mới từ các file đã upload
        const postImages = imgUrls.map(url => ({
            post_id: postId,
            image_url: url
        }));
        // Lưu các ảnh vào PostImagesModel
        const savedImages = await PostImagesModel.insertMany(postImages);
        return savedImages;
    } catch (error) {
        console.error("Lỗi khi thêm ảnh vào bài viết:", error.message);
        throw new Error("Lỗi khi thêm ảnh vào bài viết: " + error.message);
    }
};

exports.getAllPostsWithDetails = async () => {
    try {
        // Lấy tất cả bài viết
        const posts = await CommunityPostsModel.find({ status: 'active' })
            .populate({
                path: "user",
                select: '_id name avatar_url',
            })
            .populate({
                path: "category",
                select: '_id name description',
            })
            .populate({
                path: 'images',
                select: '_id image_url',
            })
            .populate("likeCount")
            .select('_id user_id category_id content status created_at updated_at')
            
        // Lấy comment cho từng bài viết
        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            const comments = await commentService.getCommentsByPostId(post._id);
            return { 
                ...post.toObject(),
                comments
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
        // Lấy bài đăng theo ID
        const post = await CommunityPostsModel.findOne({_id: id, status: 'active'})
            .populate({
                path: "user",
                select: '_id name avatar_url',
            })
            .populate({
                path: "category",
                select: '_id name description',
            })
            .populate({
                path: 'images',
                select: '_id image_url',
            })
            .populate("likeCount")
            .select('_id user_id category_id content status created_at updated_at')
        if (!post) {
            throw new Error("Bài đăng không tồn tại");
        }

        // Bình luận của bài viết
        const comments = await commentService.getCommentsByPostId(post._id)
        
        postWithDetails = {
            ...post.toObject(),
            comments
        };
        return postWithDetails;
    } catch (error) {
        console.error("Lỗi khi lấy bài đăng:", error.message);
        throw new Error("Lỗi khi lấy bài đăng: " + error.message);
    }
}

exports.getPostsByCategory = async (categoryId) => {
    try {
        const category = await PostCategoriesModel.findOne({ categoryId: categoryId, status: 'active' }).select('_id name description');
        if (!category) {
            throw new Error("Danh mục không tồn tại");
        }
        const posts = await CommunityPostsModel.find({ category_id: categoryId })
            .populate({
                path: "user",
                select: '_id name avatar_url',
            })
            .populate({
                path: "category",
                select: '_id name description',
            })
            .populate({
                path: 'images',
                select: '_id image_url',
            })
            .populate("likeCount")
            .select('_id user_id category_id content status created_at updated_at')
        if (!posts) {
            return []; // Trả về mảng rỗng nếu không có bài viết nào
        }

        // Lấy Bình luận của từng bài viết
        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            const comments = await commentService.getCommentsByPostId(post._id)
            return {
                ...post.toObject(),
                comments,
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
        const deletedPost = await CommunityPostsModel.findByIdAndDelete(id);
        if (!deletedPost) {
            throw new Error("Bài đăng không tồn tại");
        }
        return deletedPost;
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
        // Xóa tất cả ảnh
        await PostImagesModel.deleteMany({});
        // Xóa tất cả bình luận
        await CommunityCommentsModel.deleteMany({});
        // Xóa tất cả lượt thích
        await PostLikesModel.deleteMany({});
        // Cuối cùng, xóa tất cả bài đăng
        return await CommunityPostsModel.deleteMany({});
    } catch (error) {
        console.error("Lỗi khi xóa tất cả yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi xóa tất cả yêu cầu liên hệ: " + error.message);
    }
}

exports.updatePost = async (id, updateData, imgUrls, removedImagesId) => {
    try {
        // Xóa ảnh khỏi cloundinary nếu có ảnh bị xóa
        if (removedImagesId && removedImagesId.length > 0) {
            const deletePromises = removedImagesId.map(async (imageId) => {
                const image = await PostImagesModel.findById(imageId);
                if (image) {
                    // Xóa ảnh khỏi Cloudinary
                    const publicId = image.image_url.split('/').pop().split('.')[0].trim();
                    deleteImageFromCloudinary(publicId);
                }
            });
            await Promise.all(deletePromises);
            // Xóa ảnh khỏi PostImagesModel
            await PostImagesModel.deleteMany({ _id: { $in: removedImagesId } });
        }
        // Nếu thêm ảnh mới vào PostImagesModel

        const updatedPost = await CommunityPostsModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            throw new Error("Bài đăng không tồn tại");
        }

        // Nếu có ảnh mới, lưu vào PostImagesModel refer đến post id hiện tại
        if (imgUrls.length > 0) {
            const postImages = imgUrls.map(url => ({
                post_id: id,
                image_url: url
            }));
            await PostImagesModel.insertMany(postImages);
        }

        return { ...updatedPost.toObject(), images: imgUrls };
    } catch (error) {
        console.error("Lỗi khi cập nhật bài viết:", error.message);
        throw new Error("Lỗi khi cập nhật bài viết: " + error.message);
    }
}

// Like bài đăng
exports.likePost = async (postId, userId) => {
    try {
        // Kiểm tra xem bài đăng có tồn tại không
        const post = await CommunityPostsModel.findById(postId);
        if (!post) {
            throw new Error("Bài đăng không tồn tại");
        }

        // Kiểm tra xem người dùng đã like bài đăng chưa
        const existingLike = await PostLikesModel.findOne({ post_id: postId, user_id: userId });
        if (existingLike) {
            // Nếu đã like, xóa lượt thích
            await PostLikesModel.deleteOne({ _id: existingLike._id });
            return { message: "Đã bỏ thích bài đăng" };
        }

        // Tạo mới lượt thích
        const newLike = new PostLikesModel({
            post_id: postId,
            user_id: userId
        });
        await newLike.save();

        return { message: "Đã thích bài đăng thành công" };
    } catch (error) {
        console.error("Lỗi khi like bài đăng:", error.message);
        throw new Error("Lỗi khi like bài đăng: " + error.message);
    }
};

exports.getTopLikedPosts = async (limit = 10) => {
    try {
        const topPosts = await CommunityPostsModel.aggregate([
            { $match: { status: 'active' } }, // Lọc bài đăng đang hoạt động
            {
                $lookup: {
                    from: "postlikes", // Tên của collection PostLikesModel
                    localField: "_id", // Trường trong CommunityPostsModel
                    foreignField: "post_id", // Trường trong PostLikesModel
                    as: "likes" // Tên trường mới chứa danh sách lượt thích
                }
            },
            {
                $addFields: {
                    likesCount: { $size: "$likes" } // Thêm trường đếm số lượt thích
                }
            },
            { $sort: { likesCount: -1 } }, // Sắp xếp theo số lượt thích giảm dần
            { $limit: limit }, // Giới hạn số lượng bài đăng trả về
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    category_id: 1,
                    content: 1,
                    status: 1,
                    created_at: 1,
                    updated_at: 1,
                    likesCount: 1 // Chỉ trả về các trường cần thiết
                }
            }
        ]);
      return topPosts;
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy bài đăng top:", error);
      throw new Error("Có lỗi xảy ra khi lấy bài đăng top: " + error.message);
    }
};