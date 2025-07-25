// E:\SeftStudy\LTWEB\portal-ptit\FE\src\services\articleService.js
import * as authService from './authService'; // Để lấy token

const API_BASE_URL = '/api'; // Sử dụng proxy của Vite

// Hàm trợ giúp để tạo headers với token
const getAuthHeaders = () => {
    const token = authService.isAuthenticated() ? localStorage.getItem('token') : '';
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

const articleService = {
    // Lấy tất cả bài viết (cho admin, bao gồm nháp)
    getAllArticlesForAdmin: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/admin`, {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (!response.ok) {
                // Xử lý lỗi HTTP status (ví dụ: 401, 403)
                if (response.status === 401 || response.status === 403) {
                    authService.logout(); // Đăng xuất nếu token không hợp lệ/hết hạn
                    throw new Error(data.message || 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.');
                }
                throw new Error(data.message || 'Failed to fetch admin articles.');
            }
            return data; // Trả về { success: true, articles: [...] }
        } catch (error) {
            console.error("Error in getAllArticlesForAdmin service:", error);
            throw error; // Ném lỗi để component xử lý
        }
    },

    // Lấy tất cả bài viết đã xuất bản (public)
    getAllPublicArticles: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch public articles.');
            }
            return data; // Trả về { success: true, articles: [...] }
        } catch (error) {
            console.error("Error in getAllPublicArticles service:", error);
            throw error;
        }
    },

    // Lấy một bài viết theo ID (public)
    getArticleById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch article by ID.');
            }
            return data; // Trả về { success: true, article: {} }
        } catch (error) {
            console.error("Error in getArticleById service:", error);
            throw error;
        }
    },

    // Thêm bài viết mới
    createArticle: async (articleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/admin`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(articleData),
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    authService.logout();
                    throw new Error(data.message || 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.');
                }
                throw new Error(data.message || 'Failed to create article.');
            }
            return data; // Trả về { success: true, message: '...', articleId: ... }
        } catch (error) {
            console.error("Error in createArticle service:", error);
            throw error;
        }
    },

    // Cập nhật bài viết
    updateArticle: async (id, articleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/admin/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(articleData),
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    authService.logout();
                    throw new Error(data.message || 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.');
                }
                throw new Error(data.message || 'Failed to update article.');
            }
            return data; // Trả về { success: true, message: '...' }
        } catch (error) {
            console.error("Error in updateArticle service:", error);
            throw error;
        }
    },

    // Xóa bài viết
    deleteArticle: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/admin/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    authService.logout();
                    throw new Error(data.message || 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.');
                }
                throw new Error(data.message || 'Failed to delete article.');
            }
            return data; // Trả về { success: true, message: '...' }
        } catch (error) {
            console.error("Error in deleteArticle service:", error);
            throw error;
        }
    },
};

export default articleService;
