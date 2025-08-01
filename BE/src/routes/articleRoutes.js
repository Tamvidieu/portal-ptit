// E:\SeftStudy\LTWEB\portal-ptit\BE\src\routes\articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware'); // Đảm bảo đường dẫn đúng

// Public routes for articles (client-side, supports pagination and category filtering via query params)
router.get('/', articleController.getAllArticles);
router.get('/public/:id', articleController.getArticleById);

// Protected routes for article management (admin-side, requires token, supports pagination and category filtering via query params)
router.get('/admin', authMiddleware.verifyToken, articleController.getAllArticlesAdmin);
router.post('/admin', authMiddleware.verifyToken, articleController.createArticle);
router.put('/admin/:id', authMiddleware.verifyToken, articleController.updateArticle);
router.delete('/admin/:id', authMiddleware.verifyToken, articleController.deleteArticle);

module.exports = router;