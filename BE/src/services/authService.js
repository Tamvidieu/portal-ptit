const adminModel = require('../models/adminModel'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_fallback';

const loginService = {
    login: async (username, password) => {
        try {
            const user = await adminModel.findByCredentials(username, password);

            if (user) {
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                await adminModel.updateToken(user.id, token);
                return { success: true, message: 'Đăng nhập thành công', user, token };
            } else {
                return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
            }
        } catch (error) {
            console.error('Login service error:', error);
            throw new Error('Internal server error during login.');
        }
    }
};

module.exports = loginService;