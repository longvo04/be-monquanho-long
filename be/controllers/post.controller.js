const express = require("express");
const router = express.Router();
const postService = require("../services/post.service");
const verifyToken = require("../middleware/VerifyToken.middleware");
const { uploadImageMemory } = require("../middleware/multer.middleware");

// Tạo bài đăng mới
router.post("/create", verifyToken, uploadImageMemory , async (req, res) => {
    try {
        const postData = req.body;
        const imageFiles = req.files || [];
        const newPost = await postService.createPost(postData, imageFiles);
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

// Lấy danh sách chi tiết các bài đăng
router.get("/list", async (req, res) => {
    try {
        const posts = await postService.getAllPostsWithDetails();
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

// Lấy chi tiết bài đăng theo ID
router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        if (!post) {
            return res.status(404).json({
                error: 404,
                error_text: "Bài đăng không tồn tại!",
                data_name: "Bài đăng",
                data: [],
            });
        }
        return res.status(200).json({
            error: 0,
            error_text: "Lấy chi tiết bài đăng thành công!",
            data_name: "Bài đăng",
            data: [post],
        });
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài đăng:", error.message);
        res.status(500).json({ message: "Lỗi khi lấy chi tiết bài đăng: " + error.message });
    }
});

// Lọc bài đăng theo danh mục
router.get("/filter/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const posts = await postService.getPostsByCategory(categoryId);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách bài đăng theo danh mục thành công!",
            data_name: "Danh sách bài đăng",
            data: posts,
        });
    } catch (error) {
        console.error("Lỗi khi lọc bài đăng theo danh mục:", error.message);
        res.status(500).json({ message: "Lỗi khi lọc bài đăng theo danh mục: " + error.message });
    }
});

// Cập nhật bài đăng
router.put("/update/:id", verifyToken, uploadImageMemory, async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = req.body;
        const imageFiles = req.files || [];
        const imagesToDelete = Array.isArray(req.body.imagesToDelete) ? req.body.imagesToDelete : [req.body.imagesToDelete];
        console.log("Images to delete:", imagesToDelete);
        const updatedPost = await postService.updatePost(postId, postData, imageFiles, imagesToDelete);
        return res.status(200).json({
            error: 0,
            error_text: "Bài đăng đã được cập nhật thành công!",
            data_name: "Bài đăng",
            data: [updatedPost],
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật bài đăng:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bài đăng",
            data: [],
        });
    }
});

// Xóa bài đăng
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await postService.deletePost(postId);
        return res.status(200).json({
            error: 0,
            error_text: "Bài đăng đã được xóa thành công!",
            data_name: "Bài đăng",
            data: [deletedPost],
        });
    } catch (error) {
        console.error("Lỗi khi xóa bài đăng:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bài đăng",
            data: [],
        });
    }
});

// Xóa tất cả các bài đăng (db cleaning for development only)
router.post("/delete-all", async (req, res) => {
    try {
        const deletedPosts = await postService.deleteAllPosts();
        return res.status(200).json({
            error: 0,
            error_text: "Đã xóa tất cả bài đăng thành công!",
            data_name: "Bài đăng",
            data: deletedPosts,
        });
    } catch (error) {
        console.error("Lỗi khi xóa tất cả bài đăng:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Bài đăng",
            data: [],
        });
    }
});

module.exports = router;
