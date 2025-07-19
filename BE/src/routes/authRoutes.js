// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// The route path here should be '/login' because app.js will add '/api/auth' as a prefix.
router.post('/login', authController.login);

module.exports = router;