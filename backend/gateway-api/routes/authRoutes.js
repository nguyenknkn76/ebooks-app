const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user login
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
