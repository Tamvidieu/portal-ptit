const pool = require('../config/mysql');

const adminModel = {
    findByCredentials: async (username, password) => {
        const [rows] = await pool.query(
            'SELECT id, username, email FROM admin WHERE username = ? AND password = ?',
            [username, password]
        );
        return rows.length > 0 ? rows[0] : null;
    },

    updateToken: async (adminId, token) => {
        await pool.query('UPDATE admin SET token = ? WHERE id = ?', [token, adminId]);
    }
};

module.exports = adminModel;