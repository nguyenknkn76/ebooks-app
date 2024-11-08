const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);

router.get('/authors/', authorController.getAuthors);
router.get('/authors/:id', authorController.getAuthorById);

module.exports = router;
