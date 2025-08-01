// E:\SeftStudy\LTWEB\portal-ptit\BE\src\models\bannerModel.js
const connection = require('../config/mysql');

const Banner = {
    // Lấy tất cả banner có trạng thái 'published'
    findAllPublished: async () => {
        const [rows] = await connection.execute(
            `SELECT id, image_url, title, link_url, status, created_at, updated_at 
             FROM banners 
             WHERE status = 'published' 
             ORDER BY created_at DESC`
        );
        return rows;
    },

    // Lấy tất cả banner (bao gồm cả draft, archived)
    findAll: async () => {
        const [rows] = await connection.execute('SELECT id, image_url, title, link_url, status, created_at, updated_at FROM banners ORDER BY created_at DESC');
        return rows;
    },

    // Tạo banner mới
    createBanner: async (bannerData) => {
        const { image_url, title, link_url, status } = bannerData;
        const [result] = await connection.execute(
            'INSERT INTO banners (image_url, title, link_url, status) VALUES (?, ?, ?, ?)',
            [image_url, title, link_url, status]
        );
        return result.insertId;
    },

    // Cập nhật banner (Đã thêm lại)
    updateBanner: async (id, bannerData) => {
        const { image_url, title, link_url, status } = bannerData;
        const [result] = await connection.execute(
            'UPDATE banners SET image_url = ?, title = ?, link_url = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [image_url, title, link_url, status, id]
        );
        return result.affectedRows > 0;
    },

    // Xóa banner
    deleteBanner: async (id) => {
        const [result] = await connection.execute('DELETE FROM banners WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Banner;
