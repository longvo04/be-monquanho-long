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

// 1. Đăng ký người dùng mới
export const registerUser = (userData) => apiRequest("post", "/auth/register", userData);

// 2. Đăng nhập người dùng
export const loginUser = (credentials) => apiRequest("post", "/auth/login", credentials);

// Đăng nhập bằng Google
export const googleLogin = (tokenId) => apiRequest("post", "/auth/google-login", { id_token: tokenId }); // Đảm bảo gửi đúng id_token

// 3. Lấy danh sách người dùng
export const getUsers = (token) => apiRequest("get", "/auth/users-list", {}, token);

// 4. Lấy chi tiết người dùng theo ID
export const getUserById = (id, token) => apiRequest("get", `/auth/user-detail/${id}`, {}, token);

// 5. Cập nhật thông tin người dùng
export const updateUser = (id, userData, token) => apiRequest("put", `/auth/update-user/${id}`, userData, token);

// 6. Xóa người dùng
export const deleteUser = (id, token) => apiRequest("delete", `/auth/delete-user/${id}`, {}, token);