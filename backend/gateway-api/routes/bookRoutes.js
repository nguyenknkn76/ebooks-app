const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const chapterController = require('../controllers/chapterController');
const commentController = require('../controllers/commentController');


router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);

router.get('/authors/', authorController.getAuthors);
router.get('/authors/:id', authorController.getAuthorById);

router.get('/chapters/book/:bookId', chapterController.getChaptersByBookId);
router.get('/chapters/:id', chapterController.getChapterById);

router.get('/comments/chapter/:chapterId', commentController.getCommentsByChapterId);
router.post('/comments/chapter/:chapterId', commentController.createComment);

module.exports = router;
