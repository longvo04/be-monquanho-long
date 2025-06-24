const PostCategoriesModel = require('../models/post/post_categories.model');

// Tạo danh mục mới không có ảnh
exports.createNewCategory = async (categoryData) => {
    try {
        const category = new PostCategoriesModel(categoryData);
        return await category.save();
    } catch (error) {
        console.error("Lỗi khi tạo yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi tạo yêu cầu liên hệ: " + error.message);
    }
};

exports.getAllCategory = async () => {
    try {
        return await PostCategoriesModel.find()
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng:", error.message);
        throw new Error("Lỗi khi lấy danh sách bài đăng: " + error.message);
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
        return await PostCategoriesModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi cập nhật yêu cầu liên hệ: " + error.message);
    }
}

exports.deleteCategory = async (id) => {
    try {
        return await PostCategoriesModel.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi xóa yêu cầu liên hệ: " + error.message);
    }
};
