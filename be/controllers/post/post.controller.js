
const express = require("express");
const router = express.Router();
const postService = require("../../services/post/post.service");
const { uploadImage } = require("../../middleware/cloudinary.middleware");
const verifyToken = require("../../middleware/VerifyToken.middleware");
const { checkMultiRole } = require("../../middleware/checkRole.middleware");

// 1. Tạo bài viết mới
router.post("/create", verifyToken, checkMultiRole(["user", "admin"]), uploadImage.array('image_url', 5), async (req, res) => {
    try {
        const postData = req.body;
        const files = req.files; // files là mảng các file
        const userId = req.userData?.user?._id;
        if (!postData || !postData.content || !postData.category_id) {
            return res.status(400).json({ error: 400, error_text: "Thiếu dữ liệu bài viết", data: [] });
        }
        if (postData.content.length > 1000) {
            return res.status(400).json({ error: 400, error_text: "Nội dung bài viết quá dài, tối đa 1000 ký tự", data: [] });
        }
        const newPost = await postService.createPost(postData, files, userId);
        return res.status(201).json({ error: 0, error_text: "Tạo bài viết thành công", data: [newPost] });
    } catch (error) {
        console.error("Lỗi tạo bài viết:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi tạo bài viết.", data: [] });
    }
});

// 2. Lấy danh sách bài viết
router.get("/list", async (req, res) => {
    try {
        const filters = req.query || {};
        const posts = await postService.getAllPosts(filters);
        return res.status(200).json({ error: 0, error_text: "Lấy danh sách bài viết thành công", data: posts });
    } catch (error) {
        console.error("Lỗi lấy danh sách bài viết:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy danh sách bài viết.", data: [] });
    }
});

// 3. Lấy chi tiết bài viết
router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({ error: 400, error_text: "ID bài viết không hợp lệ", data: [] });
        }
        const post = await postService.getPostById(postId);
        if (!post) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy bài viết", data: [] });
        }
        return res.status(200).json({ error: 0, error_text: "Lấy chi tiết bài viết thành công", data: [post] });
    } catch (error) {
        console.error("Lỗi lấy chi tiết bài viết:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy chi tiết bài viết.", data: [] });
    }
});

// 7. Lọc bài viết theo danh mục
router.get("/category/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return res.status(400).json({ error: 400, error_text: "ID danh mục không hợp lệ", data: [] });
        }
        const posts = await postService.getPostsByCategory(categoryId);
        return res.status(200).json({ error: 0, error_text: "Lấy bài viết theo danh mục thành công", data: posts });
    } catch (error) {
        console.error("Lỗi lấy bài viết theo danh mục:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi lấy bài viết theo danh mục.", data: [] });
    }
});

// 4. Cập nhật/Chỉnh sửa bài viết
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const files = req.files;
        if (!id || !updateData) {
            return res.status(400).json({ error: 400, error_text: "Dữ liệu cập nhật không hợp lệ", data: [] });
        }
        // Nếu image_url là rỗng/null, xóa ảnh trên Cloudinary
        if (updateData.image_url === '' || updateData.image_url === null) {
            const post = await postService.getPostById(id);
            if (post && post.image_url) {
                const publicId = post.image_url.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
                const { deleteImageFromCloudinary } = require('../../middleware/cloudinary.middleware');
                await deleteImageFromCloudinary(publicId);
                updateData.image_url = null;
            }
        }
        const updatedPost = await postService.updatePost(id, updateData, files);
        if (!updatedPost) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy bài viết", data: [] });
        }
        return res.status(200).json({ error: 0, error_text: "Cập nhật bài viết thành công", data: [updatedPost] });
    } catch (error) {
        console.error("Lỗi cập nhật bài viết:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi cập nhật bài viết.", data: [] });
    }
});

// 5. Xóa bài viết
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 400, error_text: "ID bài viết không hợp lệ", data: [] });
        }
        const deletedPost = await postService.deletePost(id);
        if (!deletedPost) {
            return res.status(404).json({ error: 404, error_text: "Không tìm thấy bài viết", data: [] });
        }
        return res.status(200).json({ error: 0, error_text: "Xóa bài viết thành công", data: [deletedPost] });
    } catch (error) {
        console.error("Lỗi xóa bài viết:", error.message);
        return res.status(500).json({ error: 500, error_text: "Lỗi xóa bài viết.", data: [] });
    }
});

module.exports = router;
