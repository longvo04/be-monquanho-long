const mongoose = require("mongoose");

const PostCategoriesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên chủ đề (Tin tức, Hỏi đáp, ...)
    description: { type: String, default: "" }, // Mô tả ngắn về chủ đề
});

module.exports = mongoose.model("PostCategories", PostCategoriesSchema);
