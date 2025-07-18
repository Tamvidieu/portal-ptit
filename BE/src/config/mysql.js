const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', // chỉnh lại nếu khác
  user: 'root',      // chỉnh lại nếu khác
  password: '',      // sẽ cập nhật khi bạn cung cấp
  database: 'your_db_name', // chỉnh lại nếu khác
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
