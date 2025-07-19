// E:\SeftStudy\LTWEB\portal-ptit\BE\src\models\articleModel.js
const connection = require('../config/mysql');

const Article = {
    // --- CREATE ---
    // Chỉ chèn bài viết và trả về ID. Việc liên kết category được xử lý riêng.
    createArticle: async (articleData) => {
        const { title, slug, thumbnail_url, content, author_id, status } = articleData;
        const [result] = await connection.execute(
            'INSERT INTO articles (title, slug, thumbnail_url, content, author_id, status) VALUES (?, ?, ?, ?, ?, ?)',
            [title, slug, thumbnail_url, content, author_id, status]
        );
        return result.insertId;
    },

    // Thêm liên kết danh mục cho một bài viết
    addArticleCategories: async (articleId, categoryIds) => {
        if (!categoryIds || categoryIds.length === 0) {
            return; // Không làm gì nếu không có danh mục
        }
        const categoryInserts = categoryIds.map(catId => [articleId, catId]);
        await connection.query(
            'INSERT INTO article_categories (article_id, category_id) VALUES ?',
            [categoryInserts]
        );
    },

    // --- READ ---
    // Lấy tất cả bài viết đã xuất bản (public)
    findAllPublished: async () => {
        const [rows] = await connection.execute(
            `SELECT a.*, u.username AS author_name,
                    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
             FROM articles a
             LEFT JOIN users u ON a.author_id = u.id
             LEFT JOIN article_categories ac ON a.id = ac.article_id
             LEFT JOIN categories c ON ac.category_id = c.id
             WHERE a.status = 'published'
             GROUP BY a.id
             ORDER BY a.published_date DESC`
        );
        return rows.map(row => ({
            ...row,
            category_details: row.category_details ? JSON.parse(row.category_details) : []
        }));
    },

    // Lấy một bài viết theo ID (public hoặc admin)
    findById: async (id) => {
        const [rows] = await connection.execute(
            `SELECT a.*, u.username AS author_name,
                    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
             FROM articles a
             LEFT JOIN users u ON a.author_id = u.id
             LEFT JOIN article_categories ac ON a.id = ac.article_id
             LEFT JOIN categories c ON ac.category_id = c.id
             WHERE a.id = ?
             GROUP BY a.id`,
            [id]
        );
        if (rows.length > 0) {
            return {
                ...rows[0],
                category_details: rows[0].category_details ? JSON.parse(rows[0].category_details) : []
            };
        }
        return null;
    },

    // Lấy tất cả bài viết (bao gồm cả nháp, cho admin)
    findAll: async () => {
        const [rows] = await connection.execute(
            `SELECT a.*, u.username AS author_name,
                    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
             FROM articles a
             LEFT JOIN users u ON a.author_id = u.id
             LEFT JOIN article_categories ac ON a.id = ac.article_id
             LEFT JOIN categories c ON ac.category_id = c.id
             GROUP BY a.id
             ORDER BY a.published_date DESC`
        );
        return rows.map(row => ({
            ...row,
            category_details: row.category_details ? JSON.parse(row.category_details) : []
        }));
    },

    // --- UPDATE ---
    updateArticle: async (id, articleData) => {
        const { title, slug, thumbnail_url, content, status } = articleData;
        const [result] = await connection.execute(
            'UPDATE articles SET title = ?, slug = ?, thumbnail_url = ?, content = ?, status = ? WHERE id = ?',
            [title, slug, thumbnail_url, content, status, id]
        );
        return result.affectedRows > 0;
    },

    // Xóa tất cả liên kết danh mục cho một bài viết
    clearArticleCategories: async (articleId) => {
        await connection.execute('DELETE FROM article_categories WHERE article_id = ?', [articleId]);
    },

    // --- DELETE ---
    deleteArticle: async (id) => {
        const [result] = await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    // Kiểm tra slug có tồn tại không
    findBySlug: async (slug) => {
        const [rows] = await connection.execute('SELECT id FROM articles WHERE slug = ?', [slug]);
        return rows.length > 0;
    },

    // Tăng lượt xem (tùy chọn)
    // incrementViews: async (id) => {
    //     await connection.execute('UPDATE articles SET views = views + 1 WHERE id = ?', [id]);
    // }
};

module.exports = Article;