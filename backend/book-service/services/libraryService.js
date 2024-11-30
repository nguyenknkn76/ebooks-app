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
  console.log('im here this is library service');
  try {
    const libraries = await Library.find()
    
      // .populate({
      //   path: 'books',
      //   select: '_id title',
      // });

    console.log("this is library controller:", libraries);

    const response = libraries.map((library) => ({
      id: library._id.toString(),
      user: library.user,
      name: library.name,
      books: null,
      // books: library.books.map((book) => ({
      //   id: book._id.toString(),
      //   title: book.title,
      // })) || null,
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

module.exports = {
  createLibrary,
  getAllLibraries,
};
