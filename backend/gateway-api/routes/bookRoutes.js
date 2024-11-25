const express = require('express');
const multer = require('multer');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const mediaFileController = require('../controllers/mediaFileController');
const chapterController = require('../controllers/chapterController');
const commentController = require('../controllers/commentController');
router.post('/books', bookController.createBook);

router.post('/books/authors', authorController.createAuthor);

router.post('/books/mediafiles',  mediaFileController.createMediaFile);
router.post('/books/mediafiles/upload',  mediaFileController.uploadMediaFile);

router.post('/books/chapters', chapterController.createChapter);
router.get('/books/chapters', chapterController.getAllChapters);
router.get('/books/chapters/:book_id', chapterController.getChaptersByBookId);
router.get('/books/chapters/chapter/:chapter_id',chapterController.getChapterById);

//! ====> still bug here <===
router.put('/books/chapters/:chapter_id',chapterController.editChapter);
router.post('/books/chapters/:chapter_id/audio_files', chapterController.addAudioFile);

router.post('/books/chapters/:chapter_id/comments', commentController.createComment);
module.exports = router;
