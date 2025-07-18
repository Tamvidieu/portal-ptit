const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Login route
router.post('/api/auth/login', loginController.login);

module.exports = router;
