const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
router.get('/notes', noteController.getNotes);
router.get('/users', noteController.getUsers);
module.exports = router;