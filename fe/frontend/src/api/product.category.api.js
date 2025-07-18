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

// 1. Tạo danh mục sản phẩm mới
export const addCategory = (data, token) =>
  apiRequest("post", "/Product/categories/create", data, token);

// 2. Lấy danh sách danh mục sản phẩm
export const getCategories = (token) =>
  apiRequest("get", "/Product/categories/list", {}, token);

// 3. Lấy chi tiết danh mục sản phẩm
export const getCategoryById = (id, token) =>
  apiRequest("get", `/Product/categories/${id}`, {}, token);

// 4. Cập nhật danh mục sản phẩm
export const updateCategory = (id, data, token) =>
  apiRequest("put", `/Product/categories/${id}`, data, token);

// 5. Xóa danh mục sản phẩm
export const deleteCategory = (id, token) =>
  apiRequest("delete", `/Product/categories/${id}`, {}, token);