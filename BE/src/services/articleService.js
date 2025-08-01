// E:\SeftStudy\LTWEB\portal-ptit\BE\src\services\articleService.js
const articleModel = require('../models/articleModel');
const connection = require('../config/mysql');
const categoryService = require('./categoryService'); // Cần import để tìm ID danh mục từ tên/slug

const articleService = {
    // CREATE Article
    createArticle: async (articleData, categoryIds) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const slugExists = await articleModel.findBySlug(articleData.slug);
            if (slugExists) {
                const error = new Error('Slug already exists. Please choose a different one.');
                error.code = 'DUPLICATE_SLUG';
                throw error;
            }

            const articleId = await articleModel.createArticle(articleData);

            if (categoryIds && categoryIds.length > 0) {
                await articleModel.addArticleCategories(articleId, categoryIds);
            }

            await conn.commit();
            return articleId;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    // READ Articles (Public - có phân trang và lọc theo tên/slug danh mục)
    getAllArticles: async (page = 1, limit = 10, category = null) => {
        const offset = (page - 1) * limit;
        let categoryId = null;

        // Nếu có category (chuỗi), tìm ID tương ứng
        if (category) {
            const foundCategory = await categoryService.getCategoryByNameOrSlug(category);
            if (foundCategory) {
                categoryId = foundCategory.id;
            } else {
                // Nếu không tìm thấy danh mục, trả về rỗng ngay lập tức
                return {
                    articles: [],
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: page,
                    limit
                };
            }
        }

        let conditions = ["a.status = 'published'"]; // Bắt đầu với điều kiện public
        let params = []; // Mảng tham số chỉ chứa các giá trị cho placeholder '?'

        // Nếu categoryId được tìm thấy và không phải là 0 hoặc null, thì thêm điều kiện lọc
        // categoryId = 0 sẽ được coi là "lấy tất cả danh mục" (không áp dụng lọc)
        if (categoryId !== null && categoryId !== 0) {
            conditions.push("ac.category_id = ?");
            params.push(categoryId);
        }

        // Xây dựng chuỗi WHERE clause
        const whereString = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // --- COUNT QUERY ---
        let countQuery = `SELECT COUNT(DISTINCT a.id) AS totalItems FROM articles a
                          LEFT JOIN article_categories ac ON a.id = ac.article_id
                          ${whereString}`; // Sử dụng whereString đã xây dựng

        const [countRows] = await connection.execute(countQuery, params); // Truyền 'params' cho count
        const totalItems = countRows[0].totalItems;
        const totalPages = Math.ceil(totalItems / limit);

        // --- SELECT QUERY ---
        let selectQuery = `
            SELECT a.*, u.username AS author_name,
                   GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                   JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
            FROM articles a
            LEFT JOIN admin u ON a.author_id = u.id
            LEFT JOIN article_categories ac ON a.id = ac.article_id
            LEFT JOIN categories c ON ac.category_id = c.id
            ${whereString}
            GROUP BY a.id ORDER BY a.published_date DESC LIMIT ? OFFSET ?
        `;

        // Kết hợp tất cả các tham số cho truy vấn SELECT: params (cho điều kiện WHERE), limit, offset
        const selectParams = [...params, limit.toString(), offset.toString()];

        const [rows] = await connection.execute(selectQuery, selectParams);

        const articles = rows.map(row => ({
            ...row,
            // Đã loại bỏ JSON.parse() ở đây
            category_details: row.category_details || [] 
        }));

        return {
            articles,
            totalItems,
            totalPages,
            currentPage: page,
            limit
        };
    },

    getArticleById: async (id) => {
        const article = await articleModel.findById(id);
        return article;
    },

    // READ Articles (Admin - có phân trang và lọc theo tên/slug danh mục)
    getAllArticlesForAdmin: async (page = 1, limit = 10, category = null) => {
        const offset = (page - 1) * limit;
        let categoryId = null;

        // Nếu có category (chuỗi), tìm ID tương ứng
        if (category) {
            const foundCategory = await categoryService.getCategoryByNameOrSlug(category);
            if (foundCategory) {
                categoryId = foundCategory.id;
            } else {
                // Nếu không tìm thấy danh mục, trả về rỗng ngay lập tức
                return {
                    articles: [],
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: page,
                    limit
                };
            }
        }

        let conditions = []; // Không có điều kiện trạng thái ban đầu cho admin
        let params = [];

        // Nếu categoryId được tìm thấy và không phải là 0 hoặc null, thì thêm điều kiện lọc
        if (categoryId !== null && categoryId !== 0) {
            conditions.push("ac.category_id = ?");
            params.push(categoryId);
        }

        // Xây dựng chuỗi WHERE clause
        const whereString = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // --- COUNT QUERY FOR ADMIN ---
        let countQuery = `SELECT COUNT(DISTINCT a.id) AS totalItems FROM articles a
                          LEFT JOIN article_categories ac ON a.id = ac.article_id
                          ${whereString}`;

        const [countRows] = await connection.execute(countQuery, params);
        const totalItems = countRows[0].totalItems;
        const totalPages = Math.ceil(totalItems / limit);

        // --- SELECT QUERY FOR ADMIN ---
        let selectQuery = `
            SELECT a.*, u.username AS author_name,
                   GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories_name,
                   JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'slug', c.slug)) AS category_details
            FROM articles a
            LEFT JOIN admin u ON a.author_id = u.id
            LEFT JOIN article_categories ac ON a.id = ac.article_id
            LEFT JOIN categories c ON ac.category_id = c.id
            ${whereString}
            GROUP BY a.id ORDER BY a.published_date DESC LIMIT ? OFFSET ?
        `;

        // Kết hợp tất cả các tham số cho truy vấn SELECT: params (cho điều kiện WHERE), limit, offset
        const selectParams = [...params, limit.toString(), offset.toString()];

        const [rows] = await connection.execute(selectQuery, selectParams);

        const articles = rows.map(row => ({
            ...row,
            // Đã loại bỏ JSON.parse() ở đây
            category_details: row.category_details || [] 
        }));
        return {
            articles,
            totalItems,
            totalPages,
            currentPage: page,
            limit
        };
    },

    // UPDATE Article
    updateArticle: async (id, articleData, categoryIds) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const slugExists = await articleModel.findBySlug(articleData.slug);
            if (slugExists) {
                const error = new Error('Slug already exists. Please choose a different one.');
                error.code = 'DUPLICATE_SLUG';
                throw error;
            }

            const updated = await articleModel.updateArticle(id, articleData);

            if (!updated) {
                const error = new Error('Article not found or no changes made.');
                error.code = 'NOT_FOUND';
                throw error;
            }

            // Update category links: Clear old and add new ones
            await articleModel.clearArticleCategories(id);
            if (categoryIds && categoryIds.length > 0) {
                await articleModel.addArticleCategories(id, categoryIds);
            }

            await conn.commit();
            return updated;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    // DELETE Article
    deleteArticle: async (id) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            await articleModel.clearArticleCategories(id);

            const deleted = await articleModel.deleteArticle(id);

            if (!deleted) {
                const error = new Error('Article not found.');
                error.code = 'NOT_FOUND';
                throw error;
            }
            await conn.commit();
            return deleted;
        } catch (error) {
            await conn.rollback();
            console.error(`Error during article deletion for ID ${id}:`, error); // Log lỗi chi tiết
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = articleService;
