const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const mediaFileController = require('../controllers/mediaFileController');
router.post('/books', bookController.createBook);

router.post('/books/authors', authorController.createAuthor);

router.post('/books/mediafiles',  mediaFileController.createMediaFile);
router.post('/books/mediafiles/upload',  mediaFileController.uploadMediaFile);
module.exports = router;
