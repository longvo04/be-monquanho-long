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

// 1. Thích hoặc bỏ thích bài viết
export const toggleLikePost = (postId, token) =>
    apiRequest("post", `/posts/like/${postId}/like`, {}, token);

// 2. Lấy bài viết nhiều like
export const getTopLikedPosts = (limit = 10, token) =>
    apiRequest("get", `/posts/like/top-liked?limit=${limit}`, {}, token);