const express = require("express");
const router = express.Router();
const commentService = require("../../services/post/postComment.service");
const verifyToken = require("../../middleware/VerifyToken.middleware");
const checkRole = require("../../middleware/checkRole.middleware");


// Lấy tất cả bình luận của bài viết
router.get("/list/:postId", async (req, res) => {
    try {
        // Bỏ kiểm tra validateId
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
            error_text: "Lỗi khi lấy bình luận.",
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Lấy bình luận và các bình luận con theo ID
router.get("/:id", async (req, res) => {
    try {
        const commentId = req.params.id;
        // Bỏ kiểm tra validateId
        const comment = await commentService.getCommentById(commentId);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy bình luận thành công!",
            data_name: "Bình luận",
            data: comment,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bình luận",
            data: [],
        });
    }
});

// Thích hoặc bỏ thích bình luận
router.post("/like/:id", verifyToken, async (req, res) => {
    try {
        const commentId = req.params.id;
        // Bỏ kiểm tra validateId
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
        // Bỏ kiểm tra validateId
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
        // Bỏ kiểm tra validateId
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

// Chỉnh sửa bình luận (chỉ cho phép admin hoặc chủ comment, ví dụ dùng checkRole.checkAdmin hoặc checkRole.checkMultiRole)
router.put("/update/:id", verifyToken, checkRole.checkMultiRole(['admin', 'mod']), async (req, res) => {
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

// Xóa bình luận (chỉ cho phép admin hoặc mod)
router.delete("/delete/:id", verifyToken, checkRole.checkMultiRole(['admin', 'mod']), async (req, res) => {
    try {
        // Bỏ kiểm tra validateId
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

module.exports = router;
