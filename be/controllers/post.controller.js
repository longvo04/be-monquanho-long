const express = require("express");
const router = express.Router();
const postService = require("../services/post.service");
const verifyToken = require("../middleware/VerifyToken.middleware");
const { uploadImage } = require("../utils/cloudinary.util");

// Tạo bài đăng mới
router.post("/create", verifyToken, uploadImage.array('images', 5), async (req, res) => {
    try {
        const postData = req.body;

        
        let imageUrls = [];
        // Xử lý ảnh nếu có
        if (req.files && req.files.length > 0) {
          imageUrls = req.files.map(file => file.path); // Lấy URL ảnh từ file upload
        }
        const newPost = await postService.createPost(postData, imageUrls);
        return res.status(201).json({
            error: 0,
            error_text: "Bài đăng đã được tạo thành công!",
            data_name: "Bài đăng",
            data: [{
                _id: newPost._id,
                title: newPost.title,
                content: newPost.content,
                created_at: newPost.created_at,
                user_id: newPost.user_id,
                category_id: newPost.category_id,
                status: newPost.status,
                images: imageUrls, // Trả về danh sách ảnh đã upload
            }],
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
module.exports = router;
