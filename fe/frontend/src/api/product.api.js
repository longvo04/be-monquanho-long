import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Hàm chung cho các yêu cầu API
const apiRequest = async (method, url, data = {}, token) => {
  try {
    const config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
      },
    };
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi ${method} đến ${url}:`, error.message);
    throw error;
  }
};

// 1. Tạo sản phẩm mới
export const addProduct = (formData, token) =>
  apiRequest("post", "/Product/create", formData, token);

// 2. Lấy danh sách sản phẩm
export const getProducts = (token) =>
  apiRequest("get", "/Product/list", {}, token);

// 2b. Lấy danh sách sản phẩm theo user
export const getProductsByUser = (userId, token) =>
  apiRequest("get", `/Product/user/${userId}`, {}, token);

// 3. Lấy chi tiết sản phẩm
export const getProductById = (id, token) =>
  apiRequest("get", `/Product/${id}`, {}, token);

// 4. Cập nhật/Chỉnh sửa sản phẩm
export const updateProduct = (id, formData, token) =>
  apiRequest("put", `/Product/${id}`, formData, token);

// 5. Xóa sản phẩm
export const deleteProduct = (id, token) =>
  apiRequest("delete", `/Product/${id}`, {}, token);

// 6. Lọc sản phẩm theo danh mục
export const getProductsByCategory = (categoryId, token) =>
  apiRequest("get", `/Product/category/${categoryId}`, {}, token);

