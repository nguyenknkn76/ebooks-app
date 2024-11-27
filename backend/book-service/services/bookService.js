const Book = require('../models/book');

const createBook = async (call, callback) => {
  try {
    const { title, author, genres, description, publish_year } = call.request;
    const book = new Book({
      title,
      author,
      genres,
      description,
      publish_year,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const savedBook = await book.save();
    callback(null, { id: savedBook.id, title: savedBook.title, author: savedBook.author });
  } catch (error) {
    console.error('Error creating book:', error);
    callback(error);
  }
};

module.exports = { createBook };
