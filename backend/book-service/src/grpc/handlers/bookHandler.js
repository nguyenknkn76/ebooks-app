const bookService = require('../../services/bookService');
const grpc = require('@grpc/grpc-js');

const formatBookResponse = (book) => ({
  id: book._id.toString(),
  title: book.title,
  author: book.author ? {
    id: book.author._id.toString(),
    pen_name: book.author.pen_name,
    name: book.author.name,
  } : null,
  genres: book.genres,
  description: book.description || '',
  publish_year: book.publish_year || 0,
  cover_img: book.cover_img?.file_url || '',
  avg_rating: book.avg_rating,
  count_rating: book.ratings?.length || 0,
});

const formatDetailedBookResponse = (book) => ({
  id: book._id.toString(),
  title: book.title,
  author: {
    id: book.author?._id.toString() || '',
    pen_name: book.author?.pen_name || '',
    name: book.author?.name || '',
  },
  genres: book.genres,
  description: book.description || '',
  publish_year: book.publish_year || 0,
  cover_img: book.cover_img?.file_url || '',
  chapters: book.chapters?.map(chapter => ({
    id: chapter._id.toString(),
    name: chapter.name,
  })) || [],
  ratings: book.ratings?.map(r => ({
    id: r._id.toString(),
    user: r.user,
    rating: r.rating.toFixed(2),
    review: r.review
  })) || [],
  count_rating: book.ratings?.length || 0,
  avg_rating: book.avg_rating,
});

const createBook = async (call, callback) => {
  try {
    const book = await bookService.createBook(call.request);
    callback(null, {
      id: book.id,
      title: book.title,
      author: book.author
    });
  } catch (error) {
    console.error('Error creating book:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllBooks = async (call, callback) => {
  try {
    const books = await bookService.getAllBooks();
    callback(null, {
      books: books.map(formatBookResponse)
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

const getBookById = async (call, callback) => {
  try {
    const book = await bookService.getBookById(call.request.id);
    if (!book) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Book not found'
      });
    }
    callback(null, { book: formatDetailedBookResponse(book) });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

const updateBook = async (call, callback) => {
  try {
    const book = await bookService.updateBook(call.request.id, call.request);
    if (!book) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Book not found'
      });
    }
    callback(null, formatBookResponse(book));
  } catch (error) {
    console.error('Error updating book:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook
};