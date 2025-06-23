// Tái sử dụng: Hàm toSlug có thể được sử dụng ở bất kỳ đâu trong dự án.
// Dễ bảo trì: Nếu cần thay đổi logic của hàm, bạn chỉ cần sửa ở một nơi.

/**
 * Chuyển đổi chuỗi thành slug
 * @param {string} title - Chuỗi cần chuyển đổi
 * @returns {string} - Chuỗi slug
 */
const toSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD") // Loại bỏ dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d") // Thay thế ký tự đ
      .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu "-"
      .trim();
  }; 
  
  module.exports = toSlug;