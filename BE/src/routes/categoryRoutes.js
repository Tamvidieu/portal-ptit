// E:\SeftStudy\LTWEB\portal-ptit\BE\src\routes\categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware'); // Đảm bảo đường dẫn đúng

// Public routes for categories (client-side)
router.get('/', categoryController.getAllCategories); // Lấy tất cả danh mục
router.get('/:id', categoryController.getCategoryById); // Lấy danh mục theo ID
// Protected routes for category management (admin-side, requires token)
router.post('/admin/', authMiddleware.verifyToken, categoryController.createCategory); // Tạo danh mục mới
router.put('/admin/:id', authMiddleware.verifyToken, categoryController.updateCategory); // Cập nhật danh mục
router.delete('/admin/:id', authMiddleware.verifyToken, categoryController.deleteCategory); // Xóa danh mục

module.exports = router;
