const express = require("express");
const router = express.Router();
const categoryService = require("../services/post_category.service");
const verifyToken = require("../middleware/VerifyToken.middleware");
const checkRole = require("../middleware/checkRole.middleware");

// Tạo danh mục mới
router.post("/create", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryService.createNewCategory(categoryData);
        return res.status(201).json({
            error: 0,
            error_text: "Danh mục đã được tạo thành công!",
            data_name: "Danh mục",
            data: [newCategory],
        });
    } catch (error) {
        console.error("Lỗi tạo danh mục:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh mục",
            data: [],
        });
    }
});

// Lấy tất cả danh mục
router.get("/list", async (req, res) => {
    try {
        const categories = await categoryService.getAllCategory();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách danh mục thành công!",
            data_name: "Danh sách danh mục",
            data: categories,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error.message);
        res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục: " + error.message });
    }
});

// Lấy chi tiết danh mục theo ID
router.get("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategory(categoryId);
        if (!category) {
            return res.status(404).json({
                error: 404,
                error_text: "Danh mục không tồn tại!",
                data_name: "Danh mục",
                data: [],
            });
        }
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh mục thành công!",
            data_name: "Danh mục",
            data: [category],
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh mục",
            data: [],
        });
    }
});

// Cập nhật danh mục
router.put("/update/:id", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updateData = req.body;
        const updatedCategory = await categoryService.updateCategory(categoryId, updateData);
        return res.status(200).json({
            error: 0,
            error_text: "Danh mục đã được cập nhật thành công!",
            data_name: "Danh mục",
            data: [updatedCategory],
        });
    } catch (error) {
        console.error("Lỗi cập nhật danh mục:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh mục",
            data: [],
        });
    }
});

// Xóa danh mục
router.delete("/delete/:id", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        return res.status(200).json({
            error: 0,
            error_text: "Danh mục đã được xóa thành công!",
            data_name: "Danh mục",
            data: [deletedCategory],
        });
    } catch (error) {
        console.error("Lỗi xóa danh mục:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: "Lỗi server!",
            data_name: "Danh mục",
            data: [],
        });
    }
});

module.exports = router;
