import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Hàm chung cho các yêu cầu API
const apiRequest = async (method, url, data = {}, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const config = { headers };
    const response = await axios({ method, url: `${API_URL}${url}`, data, ...config });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi ${method} đến ${url}:`, error.message);
    throw error;
  }
};

export const getProductsByUser = async (userId) => {
  return await apiRequest("get", `/products/user/${userId}`);
};
// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (id) => {
  return await apiRequest("get", `/products/${id}`);
};
// productApi.js
export const getPopularProducts = async () => {
  return await apiRequest("get", "/products/popular");
};
// Lấy sản phẩm theo ID danh mục
export const getProductsByCategory = async (categoryId, quality) => {
  return await apiRequest("get", `/products?category=${categoryId}&quality=${quality}`);
};
// Lấy tất cả danh mục
export const getAllProducts = async () => {
  return await apiRequest("get", "/products");
};


