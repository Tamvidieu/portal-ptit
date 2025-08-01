// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// The route path here should be '/login' because app.js will add '/api/auth' as a prefix.
router.post('/login', authController.login);
router.put('/change-password', authMiddleware.verifyToken,authController.changePassword);
module.exports = router;