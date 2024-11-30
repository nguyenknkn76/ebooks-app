const express = require('express');
const multer = require('multer');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const mediaFileController = require('../controllers/mediaFileController');
const chapterController = require('../controllers/chapterController');
const commentController = require('../controllers/commentController');
const ratingController = require('../controllers/ratingController');
const libraryController = require('../controllers/libraryController');

router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

router.post('/books/authors', authorController.createAuthor);
router.get('/books/authors', authorController.getAllAuthors);
router.get('/books/authors/:id', authorController.getAuthorById);

router.post('/books/mediafiles',  mediaFileController.createMediaFile);
router.post('/books/mediafiles/upload',  mediaFileController.uploadMediaFile);

router.post('/books/chapters', chapterController.createChapter);
router.get('/books/chapters', chapterController.getAllChapters);
router.get('/books/chapters/:book_id', chapterController.getChaptersByBookId);
router.get('/books/chapters/chapter/:chapter_id',chapterController.getChapterById);

router.post('/books/libraries', libraryController.createLibrary);
router.get('/books/libraries', libraryController.getAllLibraries);

router.post('/books/rating', ratingController.createRating);
//! ====> still bug here <===
router.put('/books/chapters/:chapter_id',chapterController.editChapter);
router.post('/books/chapters/:chapter_id/audio_files', chapterController.addAudioFile);

router.post('/books/chapters/:chapter_id/comments', commentController.createComment);
module.exports = router;
