// E:\SeftStudy\LTWEB\portal-ptit\BE\src\models\articleModel.js
const connection = require('../config/mysql');

const Article = {
    createArticle: async (articleData) => {
        const { title, slug, thumbnail_url, content, author_id, status } = articleData;
        const [result] = await connection.execute(
            'INSERT INTO articles (title, slug, thumbnail_url, content, author_id, status) VALUES (?, ?, ?, ?, ?, ?)',
            [title, slug, thumbnail_url, content, author_id, status]
        );
        return result.insertId;
    },

    addArticleCategories: async (articleId, categoryIds) => {
        if (!categoryIds || categoryIds.length === 0) {
            return;
        }
        const categoryInserts = categoryIds.map(catId => [articleId, catId]);
        await connection.query(
            'INSERT INTO article_categories (article_id, category_id) VALUES ?',
            [categoryInserts]
        );
    },

    findAllPublished: async () => {
        const [rows] = await connection.execute(
            `SELECT a.*, u.username AS author_name,
                    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
             FROM articles a
             LEFT JOIN admin u ON a.author_id = u.id
             LEFT JOIN article_categories ac ON a.id = ac.article_id
             LEFT JOIN categories c ON ac.category_id = c.id
             WHERE a.status = 'published'
             GROUP BY a.id
             ORDER BY a.published_date DESC`
        );
        return rows.map(row => ({
            ...row,
            // Đã sửa: loại bỏ JSON.parse()
            category_details: row.category_details || []
        }));
    },

    findById: async (id) => {
        const [rows] = await connection.execute(
            `SELECT a.*, u.username AS author_name,
                    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
             FROM articles a
             LEFT JOIN admin u ON a.author_id = u.id
             LEFT JOIN article_categories ac ON a.id = ac.article_id
             LEFT JOIN categories c ON ac.category_id = c.id
             WHERE a.id = ?
             GROUP BY a.id`,
            [id]
        );
        if (rows.length > 0) {
            return {
                ...rows[0],
                // Đã sửa: loại bỏ JSON.parse()
                category_details: rows[0].category_details || []
            };
        }
        return null;
    },

    findAll: async () => {
        const [rows] = await connection.execute(
            `SELECT a.*, u.username AS author_name,
                    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                    JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
             FROM articles a
             LEFT JOIN admin u ON a.author_id = u.id
             LEFT JOIN article_categories ac ON a.id = ac.article_id
             LEFT JOIN categories c ON ac.category_id = c.id
             GROUP BY a.id
             ORDER BY a.published_date DESC`
        );
        return rows.map(row => ({
            ...row,
            // Đã sửa: loại bỏ JSON.parse()
            category_details: row.category_details || []
        }));
    },

    updateArticle: async (id, articleData) => {
        const { title, slug, thumbnail_url, content, status } = articleData;
        const [result] = await connection.execute(
            'UPDATE articles SET title = ?, slug = ?, thumbnail_url = ?, content = ?, status = ? WHERE id = ?',
            [title, slug, thumbnail_url, content, status, id]
        );
        return result.affectedRows > 0;
    },

    clearArticleCategories: async (articleId) => {
        await connection.execute('DELETE FROM article_categories WHERE article_id = ?', [articleId]);
    },

    deleteArticle: async (id) => {
        const [result] = await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    findBySlug: async (slug) => {
        const [rows] = await connection.execute('SELECT id FROM articles WHERE slug = ?', [slug]);
        return rows.length > 0;
    }
};

module.exports = Article;