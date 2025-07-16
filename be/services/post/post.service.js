
const CommunityPostsModel = require('../../models/post/community_posts.model');
const PostCategoriesModel = require('../../models/post/post_categories.model');
const UserModel = require('../../models/auth/user.model');
const { updateImageOnCloudinary, deleteImageFromCloudinary } = require('../../middleware/cloudinary.middleware');

module.exports = {
    // 1. Tạo bài viết mới
    async createPost(postData, files, userId) {
        try {
            const categoryExists = await PostCategoriesModel.findById(postData.category_id);
            if (!categoryExists) throw new Error("category_id không tồn tại");
            const userExists = await UserModel.findById(userId);
            if (!userExists) throw new Error("user_id không tồn tại");
            let imageUrls = [];
            if (Array.isArray(files)) {
                for (const file of files) {
                    if (file && file.path) {
                        const uploadResult = await updateImageOnCloudinary(null, file.path, 'posts');
                        imageUrls.push(uploadResult.secure_url);
                    }
                }
            }
            const post = new CommunityPostsModel({
                user_id: userId,
                category_id: postData.category_id,
                content: postData.content,
                status: postData.status || "active",
                image_urls: imageUrls,
                created_at: new Date(),
                updated_at: new Date(),
            });
            return await post.save();
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error.message);
            throw new Error("Lỗi khi tạo bài viết.");
        }
    },

    // 2. Lấy tất cả bài viết
    async getAllPosts(filters = {}) {
        try {
            return await CommunityPostsModel.find(filters);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài viết:", error.message);
            throw new Error("Lỗi khi lấy danh sách bài viết.");
        }
    },

    // 3. Lấy chi tiết bài viết
    async getPostById(id) {
        try {
            const post = await CommunityPostsModel.findById(id).lean();
            if (!post) return null;
            return post;
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết bài viết:", error.message);
            throw new Error("Lỗi khi lấy chi tiết bài viết.");
        }
    },

    // 7. Lọc bài viết theo danh mục
    async getPostsByCategory(categoryId) {
        try {
            return await CommunityPostsModel.find({ category_id: categoryId });
        } catch (error) {
            console.error("Lỗi khi lấy bài viết theo danh mục:", error.message);
            throw new Error("Lỗi khi lấy bài viết theo danh mục.");
        }
    },

    // 4. Cập nhật/Chỉnh sửa bài viết
    async updatePost(id, updateData, files) {
        try {
            const post = await CommunityPostsModel.findById(id);
            if (!post) {
                throw new Error("Không tìm thấy bài viết");
            }
            // Nếu yêu cầu xóa toàn bộ ảnh (image_urls là null, rỗng hoặc [])
            if ((updateData.image_urls === null || updateData.image_urls === '' || (Array.isArray(updateData.image_urls) && updateData.image_urls.length === 0)) && Array.isArray(post.image_urls) && post.image_urls.length > 0) {
                for (const url of post.image_urls) {
                    const matches = url.match(/\/upload\/[^/]+\/(posts\/[^.]+)\.[a-zA-Z0-9]+$/);
                    const publicId = matches ? matches[1] : null;
                    console.log('Xóa ảnh Cloudinary - publicId:', publicId);
                    if (publicId) {
                        await deleteImageFromCloudinary(publicId);
                    }
                }
                updateData.image_urls = [];
            } else if (Array.isArray(updateData.image_urls) && Array.isArray(post.image_urls)) {
                // Xóa các ảnh bị loại khỏi mảng image_urls mới
                const removedImages = post.image_urls.filter(oldUrl => !updateData.image_urls.includes(oldUrl));
                for (const url of removedImages) {
                    const matches = url.match(/\/upload\/[^/]+\/(posts\/[^.]+)\.[a-zA-Z0-9]+$/);
                    const publicId = matches ? matches[1] : null;
                    console.log('Xóa ảnh Cloudinary (ảnh bị loại) - publicId:', publicId);
                    if (publicId) {
                        await deleteImageFromCloudinary(publicId);
                    }
                }
            }
            // Nếu upload ảnh mới
            let newImageUrls = [];
            if (Array.isArray(files) && files.length > 0) {
                for (const file of files) {
                    if (file && file.path) {
                        const uploadResult = await updateImageOnCloudinary(null, file.path, 'posts');
                        newImageUrls.push(uploadResult.secure_url);
                    }
                }
                updateData.image_urls = newImageUrls;
            }
            updateData.updated_at = new Date();
            return await CommunityPostsModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error.message);
            throw new Error("Lỗi khi cập nhật bài viết.");
        }
    },

    // 5. Xóa bài viết
    async deletePost(id) {
        try {
            const post = await CommunityPostsModel.findById(id);
            if (!post) {
                throw new Error("Không tìm thấy bài viết");
            }
            // Xóa toàn bộ ảnh trong image_urls trên Cloudinary
            if (Array.isArray(post.image_urls) && post.image_urls.length > 0) {
                for (const url of post.image_urls) {
                    // Lấy publicId đúng chuẩn Cloudinary: 'posts/filename'
                    const matches = url.match(/\/upload\/[^/]+\/(posts\/[^.]+)\.[a-zA-Z0-9]+$/);
                    const publicId = matches ? matches[1] : null;
                    console.log('Xóa ảnh Cloudinary - publicId:', publicId);
                    if (publicId) {
                        const result = await deleteImageFromCloudinary(publicId);
                        console.log('Kết quả xóa Cloudinary:', result);
                    }
                }
            }
            return await CommunityPostsModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error.message);
            throw new Error("Lỗi khi xóa bài viết.");
        }
    },
};
