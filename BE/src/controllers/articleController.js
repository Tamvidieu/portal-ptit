// E:\SeftStudy\LTWEB\portal-ptit\BE\src\controllers\articleController.js
const articleService = require('../services/articleService');

exports.getAllArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await articleService.getAllArticles(page, limit);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        console.error('Error in getAllArticles controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await articleService.getArticleById(id);

        if (!article) {
            return res.status(404).json({ success: false, message: 'Article not found with the given ID' });
        }
        res.status(200).json({ success: true, article });
    } catch (error) {
        console.error('Error in getArticleById controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getAllArticlesAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category || null;
        const result = await articleService.getAllArticlesForAdmin(page, limit, category);
        res.status(200).json({ success: true, ...result }); // Trả về cả articles và thông tin phân trang
    } catch (error) {
        console.error('Error in getAllArticlesAdmin controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const { title, slug, thumbnail_url, content, status, category_ids } = req.body;
        const authorId = req.userId; // Lấy authorId từ token đã giải mã bởi middleware
        console.log(title);
        if (!title || !slug || !content || !authorId) {
            return res.status(400).json({ success: false, message: 'Missing required fields: title, slug, content, or authorId.' });
        }

        const newArticleId = await articleService.createArticle({
            title, slug, thumbnail_url, content, author_id: authorId, status
        }, category_ids);

        res.status(201).json({ success: true, message: 'Article created successfully', articleId: newArticleId });
    } catch (error) {
        console.error('Error in createArticle controller:', error);
        if (error.code === 'DUPLICATE_SLUG') {
            return res.status(409).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, thumbnail_url, content, status, category_ids } = req.body;

        await articleService.updateArticle(id, {
            title, slug, thumbnail_url, content, status
        }, category_ids);

        res.status(200).json({ success: true, message: 'Article updated successfully' });
    } catch (error) {
        console.error('Error in updateArticle controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        await articleService.deleteArticle(id);

        res.status(200).json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error in deleteArticle controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


