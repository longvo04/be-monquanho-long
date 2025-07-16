
const PostCategoriesModel = require('../../models/post/post_categories.model');

module.exports = {
    async createCategory(categoryData) {
        try {
            const { name, description } = categoryData;
            if (!name) throw new Error("Thiếu tên danh mục");
            const category = await PostCategoriesModel.create({ name, description });
            return category;
        } catch (error) {
            console.error("Lỗi khi tạo danh mục:", error.message);
            throw new Error("Lỗi khi tạo danh mục.");
        }
    },

    async getAllCategories() {
        try {
            return await PostCategoriesModel.find();
        } catch (error) {
            console.error("Lỗi khi lấy danh sách danh mục:", error.message);
            throw new Error("Lỗi khi lấy danh sách danh mục.");
        }
    },

    async getCategoryById(id) {
        try {
            return await PostCategoriesModel.findById(id);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error.message);
            throw new Error("Lỗi khi lấy danh mục.");
        }
    },

    async updateCategory(id, updateData) {
        try {
            const updated = await PostCategoriesModel.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            return updated;
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error.message);
            throw new Error("Lỗi khi cập nhật danh mục.");
        }
    },

    async deleteCategory(id) {
        try {
            return await PostCategoriesModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error.message);
            throw new Error("Lỗi khi xóa danh mục.");
        }
    },
};
