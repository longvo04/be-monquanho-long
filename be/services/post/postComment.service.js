
const CommunityCommentsModel = require("../../models/post/community_comments.model");
const Comment_likesModel = require("../../models/post/comment_likes.model");
const CommunityPostsModel = require("../../models/post/community_posts.model");

module.exports = {
    async likeComment(commentId, userId) {
        try {
            if (!await CommunityCommentsModel.exists({ _id: commentId })) {
                throw new Error("Bình luận không tồn tại");
            }
            const existingLike = await Comment_likesModel.findOne({ comment_id: commentId, user_id: userId });
            if (existingLike) {
                await Comment_likesModel.deleteOne({ _id: existingLike._id });
                return { message: "Đã bỏ thích bình luận" };
            }
            const newLike = new Comment_likesModel({
                comment_id: commentId,
                user_id: userId,
            });
            return await newLike.save();
        } catch (error) {
            console.error("Lỗi khi thích bình luận:", error.message);
            throw new Error("Lỗi khi thích bình luận.");
        }
    },

    async addComment(commentData) {
        try {
            const parentComment = commentData.parent_id ? await CommunityCommentsModel.findById(commentData.parent_id) : null;
            if (!await CommunityPostsModel.exists({ _id: commentData.post_id })) {
                throw new Error("Bài viết không tồn tại");
            }
            const newComment = new CommunityCommentsModel(commentData);
            return await newComment.save();
        } catch (error) {
            console.error("Lỗi khi bình luận:", error.message);
            throw new Error("Lỗi khi bình luận.");
        }
    },

    async getCommentsByPostId(postId) {
        try {
            const comments = await CommunityCommentsModel.find({ post_id: postId, parent_id: null, status: 'active' })
                .populate('childCount')
                .populate("likeCount")
                .populate({
                    path: "user",
                    select: '_id name avatar_url'
                })
                .select('_id post_id content user_id created_at updated_at')
                .lean();
            return comments || [];
        } catch (error) {
            console.error("Lỗi khi lấy bình luận:", error.message);
            throw new Error("Lỗi khi lấy bình luận.");
        }
    },

    async getCommentById(id) {
        try {
            const comment = await CommunityCommentsModel.find({ _id: id, status: 'active' })
                .select('_id post_id content user_id created_at updated_at')
                .populate({
                    path: "user",
                    select: '_id name avatar_url'
                })
                .populate("likeCount")
                .populate('childCount')
                .populate({
                    path: "childComment",
                    select: '_id content user_id created_at updated_at',
                    populate: {
                        path: "user childCount",
                        select: '_id name avatar_url'
                    }
                })
                .lean();
            if (!comment) {
                throw new Error("Bình luận không tồn tại");
            }
            return comment;
        } catch (error) {
            console.error("Lỗi khi lấy bình luận:", error.message);
            throw new Error("Lỗi khi lấy bình luận.");
        }
    },

    async updateComment(id, updateData) {
        try {
            const updatedComment = await CommunityCommentsModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedComment) {
                throw new Error("Bình luận không tồn tại");
            }
            return updatedComment;
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa bình luận:", error.message);
            throw new Error("Lỗi khi chỉnh sửa bình luận.");
        }
    },

    async deleteComment(id) {
        try {
            const comment = await CommunityCommentsModel.findById(id);
            if (!comment) {
                throw new Error("Bình luận không tồn tại");
            }
            await deleteChildComments(id);
            await Comment_likesModel.deleteMany({ comment_id: id });
            return await CommunityCommentsModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Lỗi khi xóa bình luận:", error.message);
            throw new Error("Lỗi khi xóa bình luận.");
        }
    },

    async dbCleanup() {
        try {
            await Comment_likesModel.deleteMany({});
            await CommunityCommentsModel.deleteMany({});
        } catch (error) {
            console.error("Lỗi khi dọn dẹp cơ sở dữ liệu:", error.message);
        }
    },
};
