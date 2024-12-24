const authorService = require('../../services/authorService');
const grpc = require('@grpc/grpc-js');

const formatAuthorResponse = (author) => ({
  id: author.id,
  user: author.user,
  pen_name: author.pen_name,
  name: author.name,
  description: author.description
});

const createAuthor = async (call, callback) => {
  try {
    const author = await authorService.createAuthor(call.request);
    if (!author) {
      return callback({
        code: grpc.status.INTERNAL,
        message: 'Failed to create author'
      });
    }
    callback(null, formatAuthorResponse(author));
  } catch (error) {
    console.error('Error creating author:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const deleteAuthor = async (call, callback) => {
  try {
    const author = await authorService.deleteAuthor(call.request.id);
    if (!author) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Author not found'
      });
    }
    callback(null, { id: author.id });
  } catch (error) {
    console.error('Error deleting author:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllAuthors = async (call, callback) => {
  try {
    const authors = await authorService.getAllAuthors();
    callback(null, {
      authors: authors.map(author => formatAuthorResponse(author))
    });
  } catch (error) {
    console.error('Error getting all authors:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAuthorById = async (call, callback) => {
  try {
    const author = await authorService.getAuthorById(call.request.id);
    if (!author) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Author not found'
      });
    }
    // console.log(formatAuthorResponse(author));
    callback(null, {author: formatAuthorResponse(author)});
  } catch (error) {
    console.error('Error getting author by id:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const updateAuthor = async (call, callback) => {
  try {
    const author = await authorService.updateAuthor(call.request.id, call.request);
    if (!author) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Author not found'
      });
    }
    callback(null, formatAuthorResponse(author));
  } catch (error) {
    console.error('Error updating author:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor
};