const grpc = require('@grpc/grpc-js');
const authorService = require('../../services/authorService');

const createAuthor = async (call, callback) => {
  try {
    const { pen_name, name, description } = call.request;
    
    const author = await authorService.createAuthor({
      pen_name,
      name,
      description
    });

    callback(null, {
      id: author._id.toString(),
      pen_name: author.pen_name,
      name: author.name,
      description: author.description,
      books: author.books?.map(book => book.toString()) || []
    });
  } catch (error) {
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
      authors: authors.map(author => ({
        id: author._id.toString(),
        pen_name: author.pen_name,
        name: author.name,
        description: author.description,
        books: author.books?.map(book => book.toString()) || []
      }))
    });
  } catch (error) {
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

    callback(null, {
      id: author._id.toString(),
      pen_name: author.pen_name,
      name: author.name,
      description: author.description,
      books: author.books?.map(book => book.toString()) || []
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};


module.exports = { 
  createAuthor, 
  getAllAuthors, 
  getAuthorById 
};