const CommunityCommentsModel = require("../models/comment/community_comments.model");
const Comment_likesModel = require("../models/comment/comment_likes.model");
const CommunityPostsModel = require("../models/post/community_posts.model");

// Thích hoặc bỏ thích bình luận
exports.likeComment = async (commentId, userId) => {
  try {
    if (!await CommunityCommentsModel.exists({ _id: commentId })) {
      throw new Error("Bình luận không tồn tại");
    }
    // Kiểm tra xem người dùng đã thích bình luận này chưa
    const existingLike = await Comment_likesModel.findOne({ comment_id: commentId, user_id: userId });
    if (existingLike) {
      // Nếu đã thích, xóa lượt thích
      await Comment_likesModel.deleteOne({ _id: existingLike._id });
      return { message: "Đã bỏ thích bình luận" };
    }
    // Nếu chưa thích, thêm lượt thích mới
    const newLike = new Comment_likesModel({
      comment_id: commentId,
      user_id: userId,
    });
    return await newLike.save();

  } catch (error) {
    console.error("Lỗi khi thích bình luận:", error.message);
    throw new Error("Lỗi khi thích bình luận: " + error.message);
  }
}

// Bình luận vào bài viết
exports.addComment = async (commentData) => {
    try {
      const parentComment = commentData.parent_id ? await CommunityCommentsModel.findById(commentData.parent_id) : null;
      // Chuyển bình luận con về cùng cấp với cha nếu cha không phải bình luận gốc
      if (parentComment && parentComment.parent_id) {
        commentData.parent_id = parentComment.parent_id; 
      }
      // Kiểm tra xem bài viết có tồn tại không
      if (!await CommunityPostsModel.exists({ _id: commentData.post_id })) {
        throw new Error("Bài viết không tồn tại");
      }
        const newComment = new CommunityCommentsModel(commentData);
        return await newComment.save();
    } catch (error) {
        console.error("Lỗi khi bình luận:", error.message);
        throw new Error("Lỗi khi bình luận: " + error.message);
    }
};

// Lấy tất cả bình luận của bài viết
exports.getCommentsByPostId = async (postId) => {
    try {
        const comments = await CommunityCommentsModel.find({ post_id: postId, parent_id: null })
          .populate({
            path: "childComment",
            select: '_id content user_id created_at updated_at',
            populate: {
              path: "user",
              select: '_id name avatar_url',
            }
          })
          .populate("likeCount")
          .select('_id content user_id created_at updated_at')
          .lean()
        return comments || [];
    } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error.message);
        throw new Error("Lỗi khi lấy bình luận: " + error.message);
    }
};

// Chỉnh sửa bình luận
exports.updateComment = async (id, updateData) => {
    try {
        const updatedComment = await CommunityCommentsModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedComment) {
            throw new Error("Bình luận không tồn tại");
        }
        return updatedComment;
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa:", error.message);
        throw new Error("Lỗi khi chỉnh sửa: " + error.message);
    }
};

// Xóa bình luận
exports.deleteComment = async (id) => {
    try {
        // Query tất cả bình luận con refer đến bình luận gốc
        const childComment = await CommunityCommentsModel.find({ parent_id: id });
        // Xóa tất cả lượt thích của các bình luận con
        if (childComment) await Comment_likesModel.deleteMany({ comment_id: { $in: childComment.map(comment => comment._id) } });
        // Xóa tất cả bình luận con
        await CommunityCommentsModel.deleteMany({ parent_id: id });
        // Xóa tất cả lượt thích của bình luận gốc
        await Comment_likesModel.deleteMany({ comment_id: id });
        // Cuối cùng xóa bình luận gốc
        return await CommunityCommentsModel.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa bình luận:", error.message);
        throw new Error("Lỗi khi xóa bình luận: " + error.message);
    }
};

exports.dbCleanup = async () => {
    try {
        // Xóa tất cả các lượt thích của tất cả comment
        await Comment_likesModel.deleteMany({});
        // Xóa tất cả bình luận
        await CommunityCommentsModel.deleteMany({});
    } catch (error) {
        console.error("Lỗi khi dọn dẹp cơ sở dữ liệu:", error.message);
    }
};
