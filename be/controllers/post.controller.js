const express = require("express");
const router = express.Router();
const postService = require("../services/post.service");
const verifyToken = require("../middleware/VerifyToken.middleware");
const { uploadImageMemory } = require("../middleware/cloudinary.middleware");
const { validateId } = require("../utils/validate.util");
// Tạo bài đăng mới
router.post("/create", verifyToken, uploadImageMemory , async (req, res) => {
    try {
        const postData = req.body;
        const { content, category_id } = postData;
        if (!content || !category_id) {
            return res.status(400).json({
                error: 400,
                error_text: "Thiếu thông tin cần thiết để tạo bài đăng: " + [!content ? " content" : "", !category_id ? " category_id" : ""].filter(Boolean).join(", "),
                data_name: "Bài đăng",
                data: [],
            });
        }
        if (content.length >= 1000) {
            return res.status(400).json({
                error: 400,
                error_text: "Nội dung bài đăng quá dài, tối đa 1000 ký tự.",
                data_name: "Bài đăng",
                data: [],
            });
        }
        postData.user_id = req.userData.user._id; // Lấy ID người dùng từ token
        const imageFiles = req.files || [];
        const newPost = await postService.createPost(postData, imageFiles);
        return res.status(201).json({
            error: 0,
            error_text: "Bài đăng đã được tạo thành công!",
            data_name: "Bài đăng",
            data: [newPost],
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
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
            error_text: "Lấy danh sách bài đăng thành công!",
            data_name: "Danh sách bài đăng",
            data: posts,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng:", error.message);
        res.status(500).json({ message: "Lỗi khi lấy danh sách bài đăng: " + error.message });
    }
});

// Lấy danh sách bài đăng nhiều like
router.get("/top-liked/:limit", async (req, res) => {
    try {
        const limit = parseInt(req.params.limit, 10) || 10; // Mặc định lấy 10 bài đăng
        const topLikedPosts = await postService.getTopLikedPosts(limit);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách bài đăng nhiều like thành công!",
            data_name: "Danh sách bài đăng nhiều like",
            data: topLikedPosts,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng nhiều like:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Bài đăng",
            data: [],
        });
    }
});

// Lấy chi tiết bài đăng theo ID
router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        if (!validateId(postId)) {
            return res.status(400).json({
                error: 400,
                error_text: "ID bài đăng không hợp lệ!",
                data_name: "Bài đăng",
                data: [],
            });
        }
        const post = await postService.getPostById(postId);
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
        if (!validateId(categoryId)) {
            return res.status(400).json({
                error: 400,
                error_text: "ID danh mục không hợp lệ!",
                data_name: "Lọc bài đăng theo danh mục",
                data: [],
            });
        }
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
        if (!validateId(postId)) {
            return res.status(400).json({
                error: 400,
                error_text: "ID bài đăng không hợp lệ!",
                data_name: "Bài đăng",
                data: [],
            });
        }
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
            error_text: error.message,
            data_name: "Bài đăng",
            data: [],
        });
    }
});

// Xóa bài đăng
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        if (!validateId(postId)) {
            return res.status(400).json({
                error: 400,
                error_text: "ID bài đăng không hợp lệ!",
                data_name: "Bài đăng",
                data: [],
            });
        }
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
            error_text: error.message,
            data_name: "Bài đăng",
            data: [],
        });
    }
});

router.post("/like/:id", verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userData.user._id; // Lấy ID người dùng từ token
        const likedPost = await postService.likePost(postId, userId);
        return res.status(200).json({
            error: 0,
            error_text: "Đã thích bài đăng thành công!",
            data_name: "Bài đăng",
            data: [likedPost],
        });
    } catch (error) {
        console.error("Lỗi khi thích bài đăng:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
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
            error_text: error.message,
            data_name: "Bài đăng",
            data: [],
        });
    }
});

module.exports = router;
