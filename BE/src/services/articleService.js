const articleModel = require('../models/articleModel');
const connection = require('../config/mysql');

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

    // READ Articles
    getAllArticles: async () => {
        return await articleModel.findAllPublished();
    },

    getArticleById: async (id) => {
        const article = await articleModel.findById(id);
        // Optional: Increment views here if you want to track them
        // if (article) {
        //     await articleModel.incrementViews(id);
        // }
        return article;
    },

    getAllArticlesForAdmin: async () => {
        return await articleModel.findAll();
    },

    // UPDATE Article
    updateArticle: async (id, articleData, categoryIds) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

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
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = articleService;