
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
        resource_type: 'auto', // Để Cloudinary tự nhận diện file
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

// Hàm tải ảnh lên Cloudinary từ bộ nhớ tạm thời lên cloudinary
const uploadImageToCloudinary = async (imageFiles, path = 'images') => {
    try {
        const uploadPromises = imageFiles.map((file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: path,
                        format: file.mimetype.split('/')[1], // Định dạng file
                        public_id: Date.now() + '-' + file.originalname.replace(/\.[^/.]+$/, ""), // public_id sẽ là thời gian hiện tại + tên file gốc
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(result);
                    }
                );

                // Tải file lên Cloudinary từ buffer
                stream.end(file.buffer); // dữ liệu file ảnh được lưu trong bộ nhớ tạm thời
            });
        });

        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map((result) => result.secure_url);

        return imageUrls;
    } catch (error) {
        console.error('Có lỗi xảy ra khi tải ảnh lên cloudinary:', error);
        throw new Error('Tải ảnh lên thất bại');
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
module.exports = { uploadImageMemory, upload, uploadImage, uploadFile, uploadImageToCloudinary, deleteImageFromCloudinary, updateImageOnCloudinary };