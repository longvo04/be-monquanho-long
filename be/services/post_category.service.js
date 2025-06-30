const PostCategoriesModel = require('../models/post/post_categories.model');

// Tạo danh mục mới
exports.createNewCategory = async (categoryData) => {
    try {
        const category = new PostCategoriesModel(categoryData);
        return await category.save();
    } catch (error) {
        console.error("Lỗi khi tạo danh mục:", error.message);
        throw new Error("Lỗi khi tạo danh mục: " + error.message);
    }
};

exports.getAllCategory = async () => {
    try {
        return await PostCategoriesModel.find()
    } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error.message);
        throw new Error("Lỗi khi lấy danh sách danh mục: " + error.message);
    }
}

exports.getCategory = async (id) => {
    try {
        const category = await PostCategoriesModel.findById(id);
        if (!category) {
            throw new Error("Danh mục không tồn tại");
        }
        return category;
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error.message);
        throw new Error("Lỗi khi lấy danh mục: " + error.message);
    }
}

exports.updateCategory = async (id, updateData) => {
    try {
        const updatedCategory =  await PostCategoriesModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            throw new Error("Danh mục không tồn tại");
        }
        return updatedCategory;
    } catch (error) {
        console.error("Lỗi khi cập nhật danh mục:", error.message);
        throw new Error("Lỗi khi cập nhật danh mục: " + error.message);
    }
}

exports.deleteCategory = async (id) => {
    try {
        const deletedCategory = await PostCategoriesModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error("Danh mục không tồn tại");
        }
        return deletedCategory;
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error.message);
        throw new Error("Lỗi khi xóa danh mục: " + error.message);
    }
};
