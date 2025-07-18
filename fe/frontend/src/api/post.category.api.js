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

// 1. Tạo danh mục mới
export const addPostCategory = (data, token) =>
    apiRequest("post", "/posts/categories/create", data, token);

// 2. Lấy danh sách danh mục
export const getPostCategories = (token) =>
    apiRequest("get", "/posts/categories/list", {}, token);

// 3. Lấy chi tiết danh mục
export const getPostCategoryById = (id, token) =>
    apiRequest("get", `/posts/categories/${id}`, {}, token);

// 4. Cập nhật danh mục
export const updatePostCategory = (id, data, token) =>
    apiRequest("put", `/posts/categories/${id}`, data, token);

// 5. Xóa danh mục
export const deletePostCategory = (id, token) =>
    apiRequest("delete", `/posts/categories/${id}`, {}, token);