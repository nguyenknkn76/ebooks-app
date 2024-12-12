const Library = require('../models/library');
const Book = require('../models/book');
const Author = require('../models/author');

const createLibrary = async (call, callback) => {
  const { user, name, book_ids } = call.request;
  try {
    const books = await Book.find({ _id: { $in: book_ids } });
    if (books.length !== book_ids.length) {
      return callback({
        code: 400,
        message: 'Some book IDs are invalid',
      });
    }

    const library = new Library({
      user,
      name,
      books: book_ids,
    });

    const savedLibrary = await library.save();

    callback(null, {
      id: savedLibrary._id.toString(),
      message: 'Library created successfully',
    });
  } catch (error) {
    console.error('Error creating library:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getAllLibraries = async (call, callback) => {
  try {
    const libraries = await Library.find()
      .populate({
        path: 'books',
        select: '_id title',
      });
    console.log('this is libraries services',libraries);
    const response = libraries.map((library) => ({
      id: library._id.toString(),
      user: library.user,
      name: library.name,
      books: library.books.map((book) => ({
        id: book._id.toString(),
        title: book.title,
      })),
    }));

    callback(null, { libraries: response });
  } catch (error) {
    console.error('Error fetching libraries:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getLibraryById = async (call, callback) => {
  try {
    const { id } = call.request;

    // Tìm thư viện theo ID và populate thông tin sách
    const library = await Library.findById(id)
      .populate({
        path: 'books',
        select: '_id title',
      });

    if (!library) {
      return callback({
        code: 404,
        message: 'Library not found',
      });
    }

    const response = {
      id: library._id.toString(),
      user: library.user,
      name: library.name,
      books: library.books.map((book) => ({
        id: book._id.toString(),
        title: book.title,
      })),
    };

    callback(null, response);
  } catch (error) {
    console.error('Error fetching library by ID:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getLibrariesByUserId = async (call, callback) => {
  try {
    const { id } = call.request;

    // Tìm các thư viện theo userId và populate thông tin sách
    const libraries = await Library.find({ user: id })
      .populate({
        path: 'books',
        select: '_id title',
      });

    if (!libraries.length) {
      return callback({
        code: 404,
        message: 'No libraries found for this user',
      });
    }

    const response = {
      libraries: libraries.map((library) => ({
        id: library._id.toString(),
        name: library.name,
        books: library.books.map((book) => ({
          id: book._id.toString(),
          title: book.title,
        })),
      })),
    };

    callback(null, response);
  } catch (error) {
    console.error('Error fetching libraries by userId:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};


module.exports = {
  createLibrary,
  getAllLibraries,
  getLibraryById,
  getLibrariesByUserId
};
