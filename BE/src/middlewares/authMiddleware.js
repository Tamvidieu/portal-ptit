// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided!' });
    }

    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ success: false, message: 'Unauthorized! Invalid Token.' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};