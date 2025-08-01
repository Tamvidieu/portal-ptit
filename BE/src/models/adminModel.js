// E:\SeftStudy\LTWEB\portal-ptit\BE\src\models\adminModel.js
const connection = require('../config/mysql');

const Admin = {
    // Tìm admin theo ID
    findById: async (id) => {
        // Đảm bảo cột 'password' được SELECT ở đây
        const [rows] = await connection.execute('SELECT id, username, email, password FROM admin WHERE id = ?', [id]);
        return rows[0] || null;
    },

    // Tìm admin theo username
    findByUsername: async (username) => {
        const [rows] = await connection.execute('SELECT id, username, password, email FROM admin WHERE username = ?', [username]);
        return rows[0] || null;
    },

    // Cập nhật mật khẩu admin (nhận plain text password)
    updatePassword: async (id, plainTextPassword) => { // Đã đổi tên tham số
        const [result] = await connection.execute(
            'UPDATE admin SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [plainTextPassword, id] // Lưu plain text password
        );
        return result.affectedRows > 0;
    },

    // Cập nhật token cho admin
    updateToken: async (id, token) => {
        const [result] = await connection.execute(
            'UPDATE admin SET token = ? WHERE id = ?',
            [token, id]
        );
        return result.affectedRows > 0;
    }
};

module.exports = Admin;
