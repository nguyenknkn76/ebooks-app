const grpc = require('@grpc/grpc-js');
const bookService = require('../../services/bookService');
const mediaFileService = require('../../services/mediaFileService');
const {uploadMediaFile2} = require('../../utils/upload');

const updateBook = async (call, callback) => {
  try {
    const { id, new_cover_image, ...updateData } = call.request;

    // Get existing book to check old cover
    const existingBook = await bookService.getBookById(id);
    if (!existingBook) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Book not found'
      });
    }

    // Handle new cover image if provided
    if (new_cover_image) {
      // Upload new image to S3
      const fileUrl = await uploadMediaFile2({
        bucket_name: process.env.AWS_BUCKET_NAME,
        file_name: new_cover_image.file_name,
        file_content: new_cover_image.file_content,
        file_type: new_cover_image.file_type
      });

      // Create new media file record
      const mediaFile = await mediaFileService.createMediaFile({
        file_collection: 'covers',
        file_url: fileUrl,
        file_type: new_cover_image.file_type,
        file_size: Buffer.from(new_cover_image.file_content, 'base64').length
      });

      // Delete old cover if exists
      if (existingBook.cover_img) {
        await mediaFileService.deleteMediaFile(existingBook.cover_img._id);
      }

      updateData.cover_img = mediaFile._id;
    }

    // Update book
    const book = await bookService.updateBook(id, updateData);
    const populatedBook = await bookService.getBookById(book._id);

    callback(null, {
      id: populatedBook._id.toString(),
      title: populatedBook.title,
      author: populatedBook.author,
      genres: populatedBook.genres,
      description: populatedBook.description,
      publish_year: populatedBook.publish_year,
      cover_img: populatedBook.cover_img,
      status: populatedBook.status,
      created_at: populatedBook.created_at.toISOString(),
      updated_at: populatedBook.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const createBookWithCover = async (call, callback) => {
  try {
    const { title, author, genres, description, publish_year, status, cover_image } = call.request;
    
    // Save image to temp and upload to S3
    const fileUrl = await uploadMediaFile2({
      bucket_name: process.env.AWS_BUCKET_NAME,
      file_name: cover_image.file_name,
      file_content: cover_image.file_content,
      file_type: cover_image.file_type
    });

    // Create media file record
    const mediaFile = await mediaFileService.createMediaFile({
      file_collection: 'covers',
      file_url: fileUrl,
      file_type: cover_image.file_type,
      file_size: Buffer.from(cover_image.file_content, 'base64').length
    });

    // Create book with cover
    const book = await bookService.createBook({
      title,
      author,
      genres,
      description,
      publish_year,
      status,
      cover_img: mediaFile._id
    });

    const populatedBook = await bookService.getBookById(book._id);
    
    callback(null, {
      id: populatedBook._id.toString(),
      title: populatedBook.title,
      author: populatedBook.author,
      genres: populatedBook.genres,
      description: populatedBook.description,
      publish_year: populatedBook.publish_year,
      cover_img: populatedBook.cover_img,
      status: populatedBook.status,
      created_at: populatedBook.created_at.toISOString(),
      updated_at: populatedBook.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const createBook = async (call, callback) => {
  try {
    const bookData = call.request;

    const book = await bookService.createBook(bookData);
    const populatedBook = await bookService.getBookById(book._id);

    callback(null, {
      id: populatedBook._id.toString(),
      title: populatedBook.title,
      author: populatedBook.author,
      genres: populatedBook.genres,
      description: populatedBook.description,
      publish_year: populatedBook.publish_year,
      cover_img: populatedBook.cover_img,
      chapters: populatedBook.chapters,
      avg_rating: populatedBook.avg_rating,
      views: populatedBook.views,
      followers: populatedBook.followers,
      monthly_views: populatedBook.monthly_views,
      status: populatedBook.status,
      created_at: populatedBook.created_at.toISOString(),
      updated_at: populatedBook.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};


const getAllBooks = async (call, callback) => {
  try {
    const result = await bookService.getAllBooks(call.request);
    
    callback(null, {
      books: result.books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genres: book.genres,
        description: book.description,
        publish_year: book.publish_year,
        cover_img: book.cover_img,
        chapters: book.chapters,
        avg_rating: book.avg_rating,
        views: book.views,
        followers: book.followers,
        monthly_views: book.monthly_views,
        status: book.status,
        created_at: book.created_at.toISOString(),
        updated_at: book.updated_at?.toISOString()
      })),
      total: result.total,
      page: result.page,
      pages: result.pages
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
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

    callback(null, {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      genres: book.genres,
      description: book.description,
      publish_year: book.publish_year,
      cover_img: book.cover_img,
      chapters: book.chapters,
      avg_rating: book.avg_rating,
      views: book.views,
      followers: book.followers,
      monthly_views: book.monthly_views,
      status: book.status,
      created_at: book.created_at.toISOString(),
      updated_at: book.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getBooksByMonthly = async (call, callback) => {
  try {
    const books = await bookService.getBooksByMonthly();
    callback(null, {
      books: books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genres: book.genres,
        description: book.description,
        publish_year: book.publish_year,
        cover_img: book.cover_img,
        chapters: book.chapters,
        avg_rating: book.avg_rating,
        views: book.views,
        followers: book.followers,
        monthly_views: book.monthly_views,
        status: book.status,
        created_at: book.created_at.toISOString(),
        updated_at: book.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getBooksByViews = async (call, callback) => {
  try {
    const books = await bookService.getBooksByViews();
    callback(null, {
      books: books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genres: book.genres,
        description: book.description,
        publish_year: book.publish_year,
        cover_img: book.cover_img,
        chapters: book.chapters,
        avg_rating: book.avg_rating,
        views: book.views,
        followers: book.followers,
        monthly_views: book.monthly_views,
        status: book.status,
        created_at: book.created_at.toISOString(),
        updated_at: book.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getBooksByCreatedTime = async (call, callback) => {
  try {
    const books = await bookService.getBooksByCreatedTime();
    callback(null, {
      books: books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genres: book.genres,
        description: book.description,
        publish_year: book.publish_year,
        cover_img: book.cover_img,
        chapters: book.chapters,
        avg_rating: book.avg_rating,
        views: book.views,
        followers: book.followers,
        monthly_views: book.monthly_views,
        status: book.status,
        created_at: book.created_at.toISOString(),
        updated_at: book.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getBooksByUpdatedTime = async (call, callback) => {
  try {
    const books = await bookService.getBooksByUpdatedTime();
    callback(null, {
      books: books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genres: book.genres,
        description: book.description,
        publish_year: book.publish_year,
        cover_img: book.cover_img,
        chapters: book.chapters,
        avg_rating: book.avg_rating,
        views: book.views,
        followers: book.followers,
        monthly_views: book.monthly_views,
        status: book.status,
        created_at: book.created_at.toISOString(),
        updated_at: book.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL, 
      message: error.message
    });
  }
};

const countBooks = async (call, callback) => {
  try {
    const count = await bookService.countBooks();
    callback(null, { count });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const countBooksThisMonth = async (call, callback) => {
  try {
    const count = await bookService.countBooksThisMonth();
    callback(null, { count });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getTotalBooksInTwelveMonths = async (call, callback) => {
  try {
    const monthlyTotals = await bookService.getTotalBooksInTwelveMonths();
    callback(null, { monthly_totals: monthlyTotals });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};


module.exports = { 
  getTotalBooksInTwelveMonths,
  countBooks,
  countBooksThisMonth,
  updateBook,
  createBook,
  createBookWithCover,
  getAllBooks,
  getBookById,
  getBooksByMonthly,
  getBooksByViews,
  getBooksByCreatedTime,
  getBooksByUpdatedTime,
};