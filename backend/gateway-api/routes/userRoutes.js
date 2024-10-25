const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware')
const userController = require('../controllers/userController');

// Route to get user info
router.get('/user/:userId', userController.getUser);
// router.get('/user/:userId', authenticateToken, userController.getUser);
// router.post('/user', userController.createUser);
module.exports = router;
