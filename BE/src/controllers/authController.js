// E:\SeftStudy\LTWEB\portal-ptit\BE\src\controllers\authController.js
const authService = require('../services/authService');

// Hàm đăng nhập (giữ nguyên)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.login(username, password);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Hàm đổi mật khẩu (MỚI)
exports.changePassword = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ token đã giải mã bởi middleware
        const { oldPassword, newPassword } = req.body;
        console.log(oldPassword, newPassword);
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.' });
        }
        if (oldPassword === newPassword) {
            return res.status(400).json({ success: false, message: 'Mật khẩu mới không được giống mật khẩu cũ.' });
        }

        const result = await authService.changePassword(userId, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in changePassword controller:', error);
        if (error.code === 'USER_NOT_FOUND' || error.code === 'OLD_PASSWORD_MISMATCH' || error.code === 'PASSWORD_UPDATE_FAILED') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
