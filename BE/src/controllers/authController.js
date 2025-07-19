// src/controllers/authController.js
const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await authService.login(username, password);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (error) {
        console.error('Controller login error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};