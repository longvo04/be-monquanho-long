const mongoose = require("mongoose");

const PostCategorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên chủ đề
    description: { type: String, default: null }, // Mô tả chủ đề
});

module.exports = mongoose.model("PostCategory", PostCategorySchema);
