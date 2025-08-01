// E:\SeftStudy\LTWEB\portal-ptit\BE\src\seeds\createAdmin.js
const connection = require('../config/mysql'); // Đảm bảo đường dẫn đến file kết nối MySQL của bạn là đúng
// const bcrypt = require('bcryptjs'); // Không còn cần bcryptjs

async function seedAdminAccount() {
    let conn;
    try {
        conn = await connection.getConnection(); // Lấy một kết nối từ pool
        console.log('Connected to database for seeding.');

        const username = 'admin2';
        const email = 'admin2@example.com';
        const rawPassword = '123456'; // Mật khẩu mặc định bạn muốn đặt (plain text)

        // Không băm mật khẩu nữa
        const plainTextPassword = rawPassword; 

        // Kiểm tra xem tài khoản admin đã tồn tại chưa
        const [existingAdmin] = await conn.execute(
            'SELECT id FROM admin WHERE username = ?',
            [username]
        );

        if (existingAdmin.length > 0) {
            console.log(`Admin account '${username}' already exists. Skipping insertion.`);
            // Bạn có thể cân nhắc cập nhật mật khẩu ở đây nếu muốn đảm bảo nó luôn là 123456 (plain text)
            // await conn.execute('UPDATE admin SET password = ? WHERE username = ?', [plainTextPassword, username]);
            // console.log(`Admin account '${username}' password updated to plain text.`);
        } else {
            // Thêm tài khoản admin vào bảng 'admin'
            const [result] = await conn.execute(
                'INSERT INTO admin (username, email, password) VALUES (?, ?, ?)',
                [username, email, plainTextPassword] // Lưu plain text password
            );
            console.log(`Admin account '${username}' created with ID: ${result.insertId}`);
        }
    } catch (error) {
        console.error('Error seeding admin account:', error);
    } finally {
        if (conn) {
            conn.release(); // Giải phóng kết nối về pool
            console.log('Database connection released.');
        }
    }
}

// Chạy hàm seed khi file này được thực thi
seedAdminAccount();
