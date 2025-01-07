const Book = require('../models/book');

const createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const getAllBooks = async (query = {}) => {
  console.log('Received query:', query);
  const { 
    page = 1, 
    limit = 10, 
    sort = '-created_at',
    status,
    genres,
    publish_year,
    search,
    author,
    rating_filter  
  } = query;

  const filter = {};
  if (status) filter.status = status;
  // Handle genres array
  if (genres && Array.isArray(genres) && genres.length > 0) {
    filter.genres = { $in: genres };
  }
  if (publish_year) filter.publish_year = publish_year;
  if (author) filter.author = author;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  if (rating_filter) {
    switch (rating_filter) {
      case 'perfect':
        filter.avg_rating = { $gte: 4.5 }; 
        break;
      case 'good':
        filter.avg_rating = { $gte: 4.0 }; 
        break;
      case 'ok':
        filter.avg_rating = { $gte: 3.0 }; 
        break;
    }
  }

  if (rating_filter) {
    filter.avg_rating = { 
      ...filter.avg_rating,
      $exists: true,
      $ne: null 
    };
  }
  console.log("filter:", filter);

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
    .populate('ratings');
};

const getBooksByMonthly = async () => {
  return await Book.find()
    .populate('author')
    .populate('cover_img')
    .populate('chapters')
    .populate('genres')
    .populate('ratings')
    .sort({ monthly_views: -1 });
};

const getBooksByViews = async () => {
  return await Book.find()
    .populate('author')
    .populate('cover_img') 
    .populate('chapters')
    .populate('genres')
    .populate('ratings')
    .sort({ views: -1 });
};

const getBooksByCreatedTime = async () => {
  return await Book.find()
    .populate('author')
    .populate('cover_img')
    .populate('chapters')
    .populate('genres')
    .populate('ratings')
    .sort({ created_at: -1 }); 
};

const getBooksByUpdatedTime = async () => {
  return await Book.find()
    .populate('author')
    .populate('cover_img')
    .populate('chapters')
    .populate('genres')
    .populate('ratings')
    .sort({ updated_at: -1 });
};

const updateBook = async (id, bookData) => {
  return await Book.findByIdAndUpdate(
    id, 
    { ...bookData, updated_at: Date.now() }, 
    { new: true }
  );
};

const resetMonthlyStats = async () => {
  return await Book.updateMany(
    {},
    { monthly_views: 0 }
  );
};

const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

const updateBookStats = async (id, stats) => {
  const updates = {};
  if (stats.views) updates.views = stats.views;
  if (stats.monthly_views) updates.monthly_views = stats.monthly_views;
  if (stats.followers) updates.followers = stats.followers;
  if (stats.avg_rating) updates.avg_rating = stats.avg_rating;

  return await Book.findByIdAndUpdate(
    id,
    { $inc: updates, updated_at: Date.now() },
    { new: true }
  );
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

const countBooks = async () => {
  return await Book.countDocuments();
};

const countBooksThisMonth = async () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  return await Book.countDocuments({
    created_at: { $gte: startOfMonth }
  });
};

const getTotalBooksInTwelveMonths = async () => {
  const months = [];
  const today = new Date();
  // start from current month and look back
  for (let i = 0; i < 12; i++) {
    const startDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59, 999);
    // console.log(`Checking range: ${startDate} to ${endDate}`);
    const count = await Book.countDocuments({
      created_at: {
        $gte: startDate,
        $lte: endDate
      }
    });
    // console.log(`Found ${count} books for ${startDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`);
    months.unshift({
      month: startDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
      total: count
    });
  }

  return months;
};

module.exports = {
  getBooksByCreatedTime,
  getBooksByUpdatedTime,
  getBooksByMonthly,
  getBooksByViews,
  getTotalBooksInTwelveMonths,
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookStats,
  getBooksByGenre,
  getBooksByAuthor,
  searchBooks,
  countBooks,
  countBooksThisMonth,
  resetMonthlyStats,
};