const pool = require('../config/mysql');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.login = async (username, password) => {
  try {
    // Kiểm tra tài khoản trong bảng admin
    const [rows] = await pool.query(
      'SELECT id, username, email FROM admin WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      // Sinh JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      // Lưu token vào bảng admin (cần có cột token trong bảng)
      await pool.query('UPDATE admin SET token = ? WHERE id = ?', [token, user.id]);
      return { success: true, message: 'Đăng nhập thành công', user, token };
    } else {
      return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
    }
  } catch (error) {
    console.error('MySQL login error:', error);
    return { success: false, message: 'Internal server error' };
  }
};
