// E:\SeftStudy\LTWEB\portal-ptit\BE\src\routes\bannerRoutes.js
const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const authMiddleware = require('../middlewares/authMiddleware'); // Đảm bảo đường dẫn đúng

// Public route để lấy tất cả banner đã xuất bản
router.get('/', bannerController.getAllPublishedBanners);

// Protected routes cho quản lý banner (admin-side, yêu cầu token hợp lệ)
router.get('/admin', authMiddleware.verifyToken, bannerController.getAllBanners); // Lấy tất cả banner cho admin
router.post('/admin', authMiddleware.verifyToken, bannerController.createBanner);
router.put('/admin/:id', authMiddleware.verifyToken, bannerController.updateBanner); // Đã thêm lại tuyến PUT
router.delete('/admin/:id', authMiddleware.verifyToken, bannerController.deleteBanner);

module.exports = router;
