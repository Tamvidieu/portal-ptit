// E:\SeftStudy\LTWEB\portal-ptit\FE\src\services\authService.js
import axios from 'axios';

const API_URL = '/api/auth'; // Giữ nguyên proxy của Vite

// Hàm đăng nhập
export const login = async (username, password) => {
    try {
        const data = {
            "username": username,
            "password": password
        };
        const response = await axios.post(`${API_URL}/login`, data);

        // Nếu API trả về thành công và có token
        if (response.data.success && response.data.token) {
            // Lưu thông tin vào localStorage
            // Lưu ý: backend của bạn chỉ trả về user và token.
            // Nếu bạn không cần 'user' object ở frontend, có thể bỏ dòng này
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            // console.log(response.data.token); // Có thể bỏ console.log này trong production
        }

        return response.data;
    } catch (error) {
        // Ném lỗi chi tiết hơn từ response của backend nếu có
        throw error.response?.data || { success: false, message: 'An unexpected error occurred' };
    }
};

// Hàm đăng xuất
export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

// Hàm kiểm tra xem người dùng đã đăng nhập chưa
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Trả về true nếu có token, ngược lại là false
    return !!token;
};

// Hàm lấy thông tin người dùng hiện tại từ localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};