const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')

// Route to get user information by user ID
// router.get('/api/users/:id', getUser);
router.get('/users', authMiddleware.verifyToken, userController.getAllUsers);
router.get('/users/:id', authMiddleware.verifyToken, userController.getUserById);

router.post('/register', userController.registerUser);

module.exports = router;
