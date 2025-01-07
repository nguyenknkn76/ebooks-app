const Author = require('../models/author');

const createAuthor = async (authorData) => {
  const author = new Author(authorData);
  return await author.save();
};

const getAllAuthors = async () => {
  return await Author.find().populate('books');
};

const getAuthorById = async (id) => {
  return await Author.findById(id).populate('books');
};

const updateAuthor = async (id, authorData) => {
  return await Author.findByIdAndUpdate(id, authorData, { new: true });
};

const deleteAuthor = async (id) => {
  return await Author.findByIdAndDelete(id);
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};