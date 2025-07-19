// src/routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

router.get('/admin', authMiddleware.verifyToken, articleController.getAllArticlesForAdmin);
router.post('/admin', authMiddleware.verifyToken, articleController.createArticle);
router.put('/admin/:id', authMiddleware.verifyToken, articleController.updateArticle);
router.delete('/admin/:id', authMiddleware.verifyToken, articleController.deleteArticle);

module.exports = router;