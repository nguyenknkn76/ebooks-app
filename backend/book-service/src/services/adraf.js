const Book = require('../models/book');

const createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const getAllBooks = async (query = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    sort = '-created_at',
    status,
    genre,
    search,
    author 
  } = query;

  const filter = {};
  if (status) filter.status = status;
  if (genre) filter.genres = genre;
  if (author) filter.author = author;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const books = await Book.find(filter)
    .populate('author')
    .populate('cover_img')
    .populate('chapters')
    .populate('genres')
    .populate('ratings')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Book.countDocuments(filter);

  return {
    books,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit)
  };
};

const getBookById = async (id) => {
  return await Book.findById(id)
    .populate('author')
    .populate('cover_img')
    .populate('chapters')
    .populate('genres')
    .populate('ratings')
    .populate('ratings_count');
};

const updateBook = async (id, bookData) => {
  return await Book.findByIdAndUpdate(id, bookData, { 
    new: true,
    runValidators: true 
  });
};

const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

const incrementBookViews = async (id) => {
  const book = await Book.findById(id);
  return await book.incrementViews();
};

const updateBookRating = async (id) => {
  const book = await Book.findById(id);
  return await book.updateRating();
};

const updateBookFollowers = async (id, increment = true) => {
  const book = await Book.findById(id);
  return await book.updateFollowers(increment);
};

const getBooksByGenre = async (genreId, query = {}) => {
  query.genre = genreId;
  return await getAllBooks(query);
};

const getBooksByAuthor = async (authorId, query = {}) => {
  query.author = authorId;
  return await getAllBooks(query);
};

const searchBooks = async (searchTerm, query = {}) => {
  query.search = searchTerm;
  return await getAllBooks(query);
};

const getTrendingBooks = async (limit = 10) => {
  return await Book.find({ status: 'published' })
    .sort('-monthly_views')
    .limit(limit)
    .populate('author')
    .populate('cover_img');
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  incrementBookViews,
  updateBookRating,
  updateBookFollowers,
  getBooksByGenre,
  getBooksByAuthor,
  searchBooks,
  getTrendingBooks
};