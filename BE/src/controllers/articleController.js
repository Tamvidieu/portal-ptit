// E:\SeftStudy\LTWEB\portal-ptit\BE\src\controllers\articleController.js
const articleService = require('../services/articleService'); // Import service

// --- Đọc bài viết (Read) - Public access ---
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.status(200).json({ success: true, articles });
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
            return res.status(404).json({ success: false, message: 'Article not found' });
        }
        res.status(200).json({ success: true, article });
    } catch (error) {
        console.error('Error in getArticleById controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// --- Thêm bài viết (Create) - Yêu cầu Token hợp lệ ---
exports.createArticle = async (req, res) => {
    try {
        const { title, slug, thumbnail_url, content, status, category_ids } = req.body;
        const authorId = req.userId; // Lấy author_id từ token đã xác thực

        // Kiểm tra đầu vào cơ bản (có thể dùng validator library như Joi/Express-validator)
        if (!title || !slug || !content || !authorId) {
            return res.status(400).json({ success: false, message: 'Missing required fields: title, slug, content, or authorId.' });
        }

        const newArticleId = await articleService.createArticle({
            title, slug, thumbnail_url, content, author_id: authorId, status
        }, category_ids);

        res.status(201).json({ success: true, message: 'Article created successfully', articleId: newArticleId });
    } catch (error) {
        console.error('Error in createArticle controller:', error);
        if (error.code === 'DUPLICATE_SLUG') { // Xử lý lỗi nghiệp vụ từ service
            return res.status(409).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// --- Sửa bài viết (Update) - Yêu cầu Token hợp lệ ---
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, thumbnail_url, content, status, category_ids } = req.body;

        const updated = await articleService.updateArticle(id, {
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

// --- Xóa bài viết (Delete) - Yêu cầu Token hợp lệ ---
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await articleService.deleteArticle(id);

        res.status(200).json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error in deleteArticle controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// --- Lấy tất cả bài viết cho Admin (bao gồm nháp) ---
exports.getAllArticlesForAdmin = async (req, res) => {
    try {
        const articles = await articleService.getAllArticlesForAdmin();
        res.status(200).json({ success: true, articles });
    } catch (error) {
        console.error('Error in getAllArticlesForAdmin controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};