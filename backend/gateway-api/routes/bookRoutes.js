const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const mediaFileController = require('../controllers/mediaFileController');
const chapterController = require('../controllers/chapterController');

router.post('/books', bookController.createBook);

router.post('/books/authors', authorController.createAuthor);

router.post('/books/mediafiles',  mediaFileController.createMediaFile);
router.post('/books/mediafiles/upload',  mediaFileController.uploadMediaFile);

router.post('/books/chapters', chapterController.createChapter);
router.get('/books/chapters', chapterController.getAllChapters);
router.get('/books/chapters/:book_id', chapterController.getChaptersByBookId);
module.exports = router;
