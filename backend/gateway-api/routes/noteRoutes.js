const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
router.get('/notes', noteController.getNotes);
router.get('/notes/users', noteController.getUsers);
module.exports = router;