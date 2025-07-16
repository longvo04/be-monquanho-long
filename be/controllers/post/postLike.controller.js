const express = require("express");
const router = express.Router();
const postLikeService = require("../../services/post/postLike.service");
const verifyToken = require("../../middleware/VerifyToken.middleware");

// Thích bài viết
// Like hoặc bỏ like bài viết (toggle)
router.post("/:id/like", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userData.user._id;
        if (!id) {
            return res.status(400).json({ error: 400, error_text: "ID bài viết không hợp lệ", data: [] });
        }
        const result = await postLikeService.toggleLikePost(id, userId);
        return res.status(200).json({ error: 0, error_text: result.message, liked: result.liked, data: [] });
    } catch (error) {
        console.error("Lỗi chuyển trạng thái thích bài viết:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi chuyển trạng thái thích bài viết.", data: [] });
    }
});

// Lấy bài viết nhiều like
router.get("/top-liked", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const topLikedPosts = await postLikeService.getTopLikedPosts(limit);
        return res.status(200).json({ error: 0, error_text: "Lấy bài viết nhiều like thành công", data: topLikedPosts });
    } catch (error) {
        console.error("Lỗi lấy bài viết nhiều like:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy bài viết nhiều like.", data: [] });
    }
});

module.exports = router;
