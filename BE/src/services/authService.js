// E:\SeftStudy\LTWEB\portal-ptit\BE\src\services\authService.js
// const bcrypt = require('bcryptjs'); // Không còn cần bcryptjs
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel'); // Import adminModel

const authService = {
    // Hàm đăng nhập (Đã sửa đổi để không băm mật khẩu)
    login: async (username, password) => {
        try {
            // Tìm admin theo username
            const admin = await adminModel.findByUsername(username);

            // Kiểm tra nếu không tìm thấy admin hoặc mật khẩu không khớp (so sánh plain text)
            if (!admin || admin.password !== password) { // So sánh trực tiếp mật khẩu
                return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' };
            }

            // Tạo JWT token
            const token = jwt.sign(
                { id: admin.id, username: admin.username },
                process.env.JWT_SECRET, // Sử dụng biến môi trường JWT_SECRET
                { expiresIn: '1h' } // Token hết hạn sau 1 giờ
            );

            // Cập nhật token vào database cho admin này
            await adminModel.updateToken(admin.id, token);

            return { success: true, message: 'Đăng nhập thành công', user: { id: admin.id, username: admin.username, email: admin.email }, token };
        } catch (error) {
            console.error('Login service error:', error);
            throw new Error('Internal server error during login.');
        }
    },

    // Hàm đổi mật khẩu (Đã sửa đổi để không băm mật khẩu)
    changePassword: async (userId, oldPassword, newPassword) => {
        // Lấy thông tin admin bao gồm mật khẩu để so sánh
        const admin = await adminModel.findById(userId);
        
        // --- DEBUG LOGS (giữ lại để kiểm tra) ---
        console.log('Admin object from findById:', admin);
        console.log('Admin password from findById:', admin ? admin.password : 'Admin object is null');
        // --- END DEBUG LOGS ---

        if (!admin) {
            const error = new Error('Người dùng không tồn tại.');
            error.code = 'USER_NOT_FOUND';
            throw error;
        }

        // Kiểm tra nếu admin.password là undefined hoặc null
        if (!admin.password) {
            const error = new Error('Mật khẩu của người dùng không được tìm thấy trong cơ sở dữ liệu. Vui lòng kiểm tra dữ liệu.');
            error.code = 'PASSWORD_MISSING_IN_DB';
            throw error;
        }

        // So sánh mật khẩu cũ (plain text)
        const isMatch = (oldPassword === admin.password); // So sánh trực tiếp
        if (!isMatch) {
            const error = new Error('Mật khẩu cũ không đúng.');
            error.code = 'OLD_PASSWORD_MISMATCH';
            throw error;
        }

        // Cập nhật mật khẩu mới (plain text) vào database
        const updated = await adminModel.updatePassword(userId, newPassword); // Truyền newPassword trực tiếp

        if (!updated) {
            const error = new Error('Không thể cập nhật mật khẩu. Vui lòng thử lại.');
            error.code = 'PASSWORD_UPDATE_FAILED';
            throw error;
        }

        return { success: true, message: 'Mật khẩu đã được thay đổi thành công.' };
    }
};

module.exports = authService;
