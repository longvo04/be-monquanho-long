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

// 1. Thêm bình luận vào bài viết
export const addComment = (postId, data, token) =>
    apiRequest("post", `/posts/comment/add/${postId}`, data, token);

// 2. Cập nhật/Chỉnh sửa bình luận
export const updateComment = (id, data, token) =>
    apiRequest("put", `/posts/comment/update/${id}`, data, token);

// 3. Lấy tất cả bình luận của bài viết
export const getCommentsByPostId = (postId, token) =>
    apiRequest("get", `/posts/comment/list/${postId}`, {}, token);

// 4. Lấy bình luận và các bình luận con theo ID
export const getCommentById = (id, token) =>
    apiRequest("get", `/posts/comment/${id}`, {}, token);

// 5. Thích hoặc bỏ thích bình luận
export const toggleLikeComment = (id, token) =>
    apiRequest("post", `/posts/comment/like/${id}`, {}, token);

// 6. Xóa bình luận
export const deleteComment = (id, token) =>
    apiRequest("delete", `/posts/comment/delete/${id}`, {}, token);