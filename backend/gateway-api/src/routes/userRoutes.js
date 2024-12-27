const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware')
// const upload = require('../middlewares/upload');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
// router.get('/api/users/:id', getUser);
// router.get('/users', userController.getAllUsers);
router.get('/users', authMiddleware.verifyToken, userController.getAllUsers);

router.get('/users/:id', authMiddleware.verifyToken, userController.getUserById);

router.post('/register', userController.registerUser);

router.post('/profile', 
  authMiddleware.verifyToken,  // Add auth middleware
  upload.single('avatar'),
  profileController.createProfile
);

router.get('/users/count/total', userController.countUsers);
router.get('/users/count/monthly',userController.countUsersThisMonth);

module.exports = router;
