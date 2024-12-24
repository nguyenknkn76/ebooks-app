const Author = require('../models/author');

const createAuthor = async (data) => {
  const { user, pen_name, name, description } = data;
  const author = new Author({ user, pen_name, name, description });
  return await author.save();
};

const deleteAuthor = async (id) => {
  return await Author.findByIdAndDelete(id);
};

const getAllAuthors = async () => {
  return await Author.find();
};

const getAuthorById = async (id) => {
  return await Author.findById(id);
};

const updateAuthor = async (id, data) => {
  return await Author.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor
};