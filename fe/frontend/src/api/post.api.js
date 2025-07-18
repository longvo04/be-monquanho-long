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

// 1. Tạo bài viết mới
export const addPost = (formData, token) =>
    apiRequest("post", "/posts/create", formData, token);

// 2. Lấy danh sách bài viết
export const getPosts = (token) =>
    apiRequest("get", "/posts/list", {}, token);

// 3. Lấy chi tiết bài viết
export const getPostById = (id, token) =>
    apiRequest("get", `/posts/${id}`, {}, token);

// 4. Cập nhật/Chỉnh sửa bài viết
export const updatePost = (id, formData, token) =>
    apiRequest("put", `/posts/${id}`, formData, token);

// 5. Xóa bài viết
export const deletePost = (id, token) =>
    apiRequest("delete", `/posts/${id}`, {}, token);

// 6. Lọc bài viết theo danh mục
export const getPostsByCategory = (categoryId, token) =>
    apiRequest("get", `/posts/category/${categoryId}`, {}, token);