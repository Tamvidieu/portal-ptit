// server.js (hoặc index.js)
const app = require('./app'); // Import app từ file app.js
const dotenv = require('dotenv'); // Đảm bảo đã cài đặt: npm install dotenv

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000; // Lấy cổng từ biến môi trường hoặc mặc định là 3000

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});