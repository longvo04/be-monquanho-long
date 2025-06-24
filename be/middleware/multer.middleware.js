
const cloudinary = require('../configs/cloudinary.config');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Multer để lưu file tạm thời trong bộ nhớ
const storageMemory = multer.memoryStorage();

// Cấu hình Multer cho ảnh -> Lưu trên Cloudinary
const storageCloudinary = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: 'images',
        format: file.mimetype.split('/')[1], // Định dạng file
        public_id: Date.now() + '-' + file.originalname, // Tên file
        resource_type: 'image',
    }),
});

// Cấu hình Multer cho tài liệu -> Lưu trên Cloudinary
const storageCloudinaryFile = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: 'documents',
        format: file.originalname.split('.').pop(),
        public_id: Date.now() + '-' + file.originalname,
        resource_type: 'auto', // ⚡ Để Cloudinary tự nhận diện file
    }),
});

// Hàm cập nhật ảnh trên Cloudinary (xóa ảnh cũ và tải ảnh mới)
const updateImageOnCloudinary = async (oldPublicId, newFilePath, folder = 'images') => {
    try {
        // Xóa ảnh cũ
        if (oldPublicId) {
            console.log("Public ID của ảnh cũ:", oldPublicId);
            const result = await cloudinary.uploader.destroy(oldPublicId, { invalidate: true });
            console.log("Kết quả xóa ảnh:", result);
        }

        // Tải ảnh mới lên
        const uploadResult = await cloudinary.uploader.upload(newFilePath, {
            folder: folder,
        });

        return uploadResult;
    } catch (error) {
        console.error("Lỗi khi cập nhật ảnh trên Cloudinary:", error.message);
        throw new Error("Lỗi khi cập nhật ảnh trên Cloudinary: " + error.message);
    }
};

// Hàm xóa ảnh trên Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
        return result;
    } catch (error) {
        console.error("Lỗi khi xóa ảnh trên Cloudinary:", error.message);
        throw new Error("Lỗi khi xóa ảnh trên Cloudinary: " + error.message);
    }
};

// Cấu hình Multer lưu ảnh tạm vào bộ nhớ
const uploadImageMemory = multer({
    storage: storageMemory,  // Dùng bộ nhớ tạm
    limits: { fileSize: 3 * 1024 * 1024 },  // 3Mb Maximum
  }).array('images', 5);  // Cho phép xử lý tối đa 5 ảnh

// Khởi tạo Multer với cấu hình Cloudinary
const uploadImage = multer({ storage: storageCloudinary });

const uploadFile = multer({ storage: storageCloudinaryFile });
// Cấu hình Multer lưu file tạm vào thư mục "uploads/"
const upload = multer({ dest: 'uploads/' });

// Xuất các module
module.exports = { uploadImageMemory, upload, uploadImage, uploadFile, deleteImageFromCloudinary, updateImageOnCloudinary };