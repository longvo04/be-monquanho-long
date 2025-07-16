const PostLikesModel = require('../../models/post/post_likes.model');
const CommunityPostsModel = require('../../models/post/community_posts.model');

module.exports = {
    async toggleLikePost(postId, userId) {
        try {
            const post = await CommunityPostsModel.findById(postId);
            if (!post) throw new Error("Không tìm thấy bài viết");
            let like = await PostLikesModel.findOne({ post_id: postId, user_id: userId });
            if (like) {
                await PostLikesModel.deleteOne({ _id: like._id });
                return { message: "Đã bỏ thích bài viết", liked: false };
            }
            like = new PostLikesModel({ post_id: postId, user_id: userId });
            await like.save();
            return { message: "Đã thích bài viết", liked: true };
        } catch (error) {
            console.error("Lỗi khi chuyển trạng thái thích bài viết:", error.message);
            throw new Error("Lỗi khi chuyển trạng thái thích bài viết.");
        }
    },
    async getTopLikedPosts(limit = 10) {
        try {
            // Đếm số lượng like cho mỗi bài viết
            const topLiked = await PostLikesModel.aggregate([
                { $group: { _id: "$post_id", likeCount: { $sum: 1 } } },
                { $sort: { likeCount: -1 } },
                { $limit: limit },
            ]);
            const postIds = topLiked.map(item => item._id);
            const posts = await CommunityPostsModel.find({ _id: { $in: postIds } });
            // Sắp xếp lại theo thứ tự like
            const sortedPosts = postIds.map(id => posts.find(p => String(p._id) === String(id))).filter(Boolean);
            return sortedPosts;
        } catch (error) {
            console.error("Lỗi khi lấy bài viết nhiều like:", error.message);
            throw new Error("Lỗi khi lấy bài viết nhiều like.");
        }
    }
};
