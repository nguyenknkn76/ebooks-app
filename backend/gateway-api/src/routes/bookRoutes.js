const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/books', upload.single('cover_image'), bookController.createBookWithCover);
router.put('/books/:id', upload.single('cover_image'), bookController.updateBook);

router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/book/:id', bookController.getBookById);
router.get('/books/sort/monthly', bookController.getBooksByMonthly);
router.get('/books/sort/views', bookController.getBooksByViews);
router.get('/books/sort/created', bookController.getBooksByCreatedTime);
router.get('/books/sort/updated', bookController.getBooksByUpdatedTime);

router.post('/books/authors', bookController.createAuthor);
router.get('/books/authors', bookController.getAllAuthors);
router.get('/books/authors/:id', bookController.getAuthorById);

router.post('/books/genres', bookController.createGenre);
router.get('/books/genres', bookController.getAllGenres);
router.get('/books/genres/:id', bookController.getGenreById);

router.post('/books/chapters', bookController.createChapter);
router.get('/books/:bookId/chapters', bookController.getChaptersByBookId);
router.get('/books/chapters/:id', bookController.getChapterById);

router.put('/books/chapters/:id', upload.single('text_file'), bookController.updateChapter);
router.post('/books/chapters/comments', bookController.createComment);
router.get('/books/chapters/:chapterId/comments', bookController.getCommentsByChapterId);
router.post('/books/ratings', bookController.createRating);
router.get('/books/:bookId/ratings', bookController.getRatingsByBookId);
router.get('/books/ratings/:bookId', bookController.getRatingsByBookId);

router.post('/books/libraries', bookController.createLibrary);
router.get('/books/libraries/user/:userId', bookController.getLibrariesByUserId);
router.put('/books/libraries/:id', bookController.updateLibrary);
router.get('/books/libraries/:id', bookController.getLibraryById);
router.delete('/books/libraries/:id', bookController.deleteLibrary);

router.get('/books/histories/history', bookController.getAllHistories);
router.get('/books/histories/user/:userId', bookController.getHistoriesByUserId);
router.get('/books/histories/book/:bookId', bookController.getHistoriesByBookId);
router.post('/books/histories', bookController.createHistory);
router.get('/books/histories/book/:bookId/most-used-voice', bookController.getMostUsedVoiceFromHistories);
router.get('/books/histories/user/:userId/last-voice', bookController.getLastUsedVoiceFromHistories);
router.get('/books/histories/user/:userId/books', bookController.getHistoriesBooksByUserId);
// stat books
router.get('/books/count/total', bookController.countBooks);
router.get('/books/count/monthly', bookController.countBooksThisMonth);
router.get('/books/stats/monthly-totals', bookController.getTotalBooksInTwelveMonths);

module.exports = router;