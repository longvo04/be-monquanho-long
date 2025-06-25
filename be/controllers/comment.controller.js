const express = require("express");
const router = express.Router();
const commentService = require("../services/comment.service");
const CommunityCommentsModel = require("../models/comment/community_comments.model");
const verifyToken = require("../middleware/VerifyToken.middleware");
const checkOwnership = require("../middleware/checkOwnership.middleware");

// Lấy tất cả bình luận của bài viết
router.get("/list/:postId", async (req, res) => {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.postId);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy bình luận thành công!",
            data_name: "Bình luận",
            data: comments,
        });
    } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Thích hoặc bỏ thích bình luận
router.post("/like/:id", verifyToken, async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.userData.user._id; // Lấy ID người dùng từ token
        const result = await commentService.likeComment(commentId, userId);
        return res.status(200).json({
            error: 0,
            error_text: result.message,
            data_name: "Thích bình luận",
            data: [],
        });
    } catch (error) {
        console.error("Lỗi khi thích bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Thích bình luận",
            data: [],
        });
    }
});

// Bình luận vào bài viết
router.post("/add/:postId", verifyToken, async (req, res) => {
    try {
        const commentData = {
            post_id: req.params.postId,
            user_id: req.userData.user._id, // Lấy ID người dùng từ token
            content: req.body.content,
        };
        const newComment = await commentService.addComment(commentData);
        return res.status(201).json({
            error: 0,
            error_text: "Bình luận đã được thêm thành công!",
            data_name: "Bình luận",
            data: [newComment],
        });
    } catch (error) {
        console.error("Lỗi khi bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Trả lời bình luận
router.post("/add/:postId/:id", verifyToken, async (req, res) => {
    try {
        const commentData = {
            post_id: req.params.postId,
            user_id: req.userData.user._id, // Lấy ID người dùng từ token
            content: req.body.content,
            parent_id: req.params.id,
        };
        const newComment = await commentService.addComment(commentData);
        return res.status(201).json({
            error: 0,
            error_text: "Bình luận đã được thêm thành công!",
            data_name: "Bình luận",
            data: [newComment],
        });
    } catch (error) {
        console.error("Lỗi khi bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Chỉnh sửa bình luận
router.put("/update/:id", verifyToken, checkOwnership({
    model: CommunityCommentsModel
}), async (req, res) => {
    try {
        const updateData = {
            content: req.body.content,
        };
        const updatedComment = await commentService.updateComment(req.params.id, updateData);
        return res.status(200).json({
            error: 0,
            error_text: "Bình luận đã được cập nhật thành công!",
            data_name: "Bình luận",
            data: [updatedComment],
        });
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Xóa bình luận
router.delete("/delete/:id", verifyToken, checkOwnership({ model: CommunityCommentsModel }), async (req, res) => {
    try {
        await commentService.deleteComment(req.params.id);
        return res.status(200).json({
            error: 0,
            error_text: "Bình luận đã được xóa thành công!",
            data_name: "Bình luận",
            data: [],
        });
    } catch (error) {
        console.error("Lỗi khi xóa bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bình luận",
            data: [],
        });
    }
});

router.post("/clean", async (req, res) => {
    try {
        await commentService.dbCleanup();
        return res.status(200).json({
            error: 0,
            error_text: "Dọn dẹp cơ sở dữ liệu bình luận thành công!",
            data_name: "Bình luận",
            data: [],
        });
    } catch (error) {
        console.error("Lỗi khi dọn dẹp cơ sở dữ liệu bình luận:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bình luận",
            data: [],
        });
    }
});


module.exports = router;
