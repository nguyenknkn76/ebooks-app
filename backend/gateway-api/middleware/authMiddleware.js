const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');  // Secret key

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ headers

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, authConfig.jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        console.log('verify success')
        req.user = user; // Lưu thông tin user từ token vào request
        next();
    });
};

module.exports = authenticateToken;
