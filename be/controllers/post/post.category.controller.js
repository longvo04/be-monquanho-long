const express = require("express");
const router = express.Router();
const categoryService = require("../../services/post/postCategory.service");

// Tạo danh mục mới
router.post("/create", async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryService.createCategory(categoryData);
        return res.status(201).json({
            error: 0,
            error_text: "Tạo danh mục thành công!",
            data_name: "Thông tin danh mục",
            data: [newCategory]
        });
    } catch (err) {
        console.error("Lỗi tạo danh mục:", err.message);
        let statusCode = err.message.includes("Thiếu tên danh mục") ? 400 : 500;
        return res.status(statusCode).json({
            error: statusCode,
            error_text: "Lỗi tạo danh mục.",
            data_name: "Thông tin danh mục",
            data: []
        });
    }
});

// Lấy tất cả danh mục
router.get("/list", async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.json({
            error: 0,
            error_text: "Lấy danh sách danh mục thành công!",
            data_name: "Danh sách danh mục",
            data: categories
        });
    } catch (err) {
        console.error("Lỗi lấy danh sách danh mục:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi lấy danh sách danh mục.",
            data_name: "Danh sách danh mục",
            data: []
        });
    }
});

// Lấy chi tiết danh mục theo ID
router.get("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({
                error: 400,
                error_text: "ID danh mục không hợp lệ!",
                data_name: "Chi tiết danh mục",
                data: []
            });
        }
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({
                error: 404,
                error_text: "Không tìm thấy danh mục!",
                data_name: "Chi tiết danh mục",
                data: []
            });
        }
        return res.json({
            error: 0,
            error_text: "Lấy chi tiết danh mục thành công!",
            data_name: "Chi tiết danh mục",
            data: [category]
        });
    } catch (err) {
        console.error("Lỗi lấy chi tiết danh mục:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi lấy chi tiết danh mục.",
            data_name: "Chi tiết danh mục",
            data: []
        });
    }
});

// Cập nhật danh mục
router.put("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updateData = req.body;
        const updatedCategory = await categoryService.updateCategory(categoryId, updateData);
        if (!updatedCategory) {
            return res.status(404).json({
                error: 404,
                error_text: "Không tìm thấy danh mục!",
                data_name: "Cập nhật danh mục",
                data: []
            });
        }
        return res.json({
            error: 0,
            error_text: "Cập nhật danh mục thành công!",
            data_name: "Cập nhật danh mục",
            data: [updatedCategory]
        });
    } catch (err) {
        console.error("Lỗi cập nhật danh mục:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi cập nhật danh mục.",
            data_name: "Cập nhật danh mục",
            data: []
        });
    }
});

// Xóa danh mục
router.delete("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({
                error: 404,
                error_text: "Không tìm thấy danh mục!",
                data_name: "Xóa danh mục",
                data: []
            });
        }
        return res.json({
            error: 0,
            error_text: "Xóa danh mục thành công!",
            data_name: "Xóa danh mục",
            data: [deletedCategory]
        });
    } catch (err) {
        console.error("Lỗi xóa danh mục:", err.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi xóa danh mục.",
            data_name: "Xóa danh mục",
            data: []
        });
    }
});

module.exports = router;
