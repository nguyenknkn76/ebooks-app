const Author = require('../models/author');

const getAuthors = async (call, callback) => {
  try {
    const authors = await Author.find();
    callback(null, {
      authors: authors.map(author => ({
        id: author._id.toString(),
        user_id: author.user_id.toString(),
        pen_name: author.pen_name,
        name: author.name,
        description: author.description,
      })),
    });
  } catch (error) {
    console.error('Error in getAuthors:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const getAuthorById = async (call, callback) => {
  try {
    const authorId = call.request.id;
    const author = await Author.findById(authorId);

    if (!author) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Author not found',
      });
    }

    callback(null, {
      author: {
        id: author._id.toString(),
        user_id: author.user_id.toString(),
        pen_name: author.pen_name,
        name: author.name,
        description: author.description,
      },
    });
  } catch (error) {
    console.error('Error in getAuthorById:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

module.exports = { getAuthors, getAuthorById };
