const express = require("express");
const router = express.Router();
const postService = require("../services/post.service");
const verifyToken = require("../middleware/VerifyToken.middleware");

// Tạo bài đăng mới
router.post("/create", verifyToken, async (req, res) => {
    try {
        const postData = req.body;
        const newPost = await postService.createPost(postData);
        return res.status(201).json({
            error: 0,
            error_text: "Bài đăng đã được tạo thành công!",
            data_name: "Bài đăng",
            data: [newPost],
        });
    } catch (error) {
        console.error("Lỗi tạo bài đăng:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bài đăng",
            data: [],
        });
    }
});

// Lấy tất cả bài đăng
router.get("/list", async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách yêu cầu liên hệ thành công!",
            data_name: "Danh sách yêu cầu liên hệ",
            data: posts,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng:", error.message);
        res.status(500).json({ message: "Lỗi khi lấy danh sách bài đăng: " + error.message });
    }
});

module.exports = router;
