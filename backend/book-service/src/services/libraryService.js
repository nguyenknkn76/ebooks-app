const Library = require('../models/library');
const Book = require('../models/book');

const createLibrary = async (data) => {
  const { user, name, book_ids } = data;
  const books = await Book.find({ _id: { $in: book_ids } });
  
  if (books.length !== book_ids.length) {
    throw new Error('Some book IDs are invalid');
  }

  const library = new Library({
    user,
    name,
    books: book_ids,
  });

  return await library.save();
};

const getAllLibraries = async () => {
  return await Library.find()
    .populate({
      path: 'books',
      select: '_id title',
    });
};

const getLibraryById = async (id) => {
  return await Library.findById(id)
    .populate({
      path: 'books',
      select: '_id title',
    });
};

const getLibrariesByUserId = async (userId) => {
  return await Library.find({ user: userId })
    .populate({
      path: 'books',
      select: '_id title',
    });
};

module.exports = {
  createLibrary,
  getAllLibraries,
  getLibraryById,
  getLibrariesByUserId
};