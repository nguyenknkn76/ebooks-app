const Author = require('../models/author');
const Book = require('../models/book');

const createAuthor = async (call, callback) => {
  try {
    const { user, pen_name, name, description } = call.request;
    console.log("this is call request:", call.request);
    const author = new Author({
      user,
      pen_name,
      name,
      description,
    });

    const savedAuthor = await author.save();
    const response = {
      id: savedAuthor.id,
      user: savedAuthor.user,
      pen_name: savedAuthor.pen_name,
      name: savedAuthor.name,
      description: savedAuthor.description,
    }
    callback(null,response);
  } catch (error) {
    console.error('Error creating author:', error);
    callback(error);
  }
}

const updateAuthor = async (call, callback) => {
  const { id, user, pen_name, name, description, books } = call.request;
  
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { 
        user, 
        pen_name, 
        name, 
        description, 
        books,
        updated_at: new Date() 
      },
      { new: true }
    );

    if (!updatedAuthor) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'Author not found' });
    }

    callback(null, { 
      id: updatedAuthor.id,
      user: updatedAuthor.user, 
      pen_name: updatedAuthor.pen_name,
      name: updatedAuthor.name,
      description: updatedAuthor.description,
      books: updatedAuthor.books,
      updated_at: updatedAuthor.updated_at
    });
  } catch (error) {
    console.error('Error updating author:', error);
    callback(error);
  }
}

// const authorSchema = new mongoose.Schema({
//   user: { type: String }, //user id uuidv4
//   pen_name: {type: String}, 
//   name: {type: String},
//   description: {type: String},
//   books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
// });

const getAllAuthors = async (call, callback) => {
  try {
    const authors = await Author.find()
      .populate({
        path: 'books',
        select: '_id title',
      });
    
    const response = authors.map(author => ({
      id: author._id.toString(),
      user: author.user,
      pen_name: author.pen_name,
      name: author.name,
      description: author.description,
      books: author.books.map(book => ({
          id: book._id.toString(),
          title: book.title,
        })),
    }));
    // console.log(authors[0].books);
    callback(null, { authors: response });
    // console.log(response);
  } catch (error) {
    console.error('Error fetching all authors:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
}

const getAuthorById = async (call, callback) => {
  try {
    const { id } = call.request;

    const author = await Author.findById(id).populate({
      path: 'books',
      select: '_id title', 
    });

    if (!author) {
      return callback({
        code: 404,
        message: 'Author not found',
      });
    }

    const authorResponse = {
      id: author._id.toString(),
      user: author.user,
      pen_name: author.pen_name,
      name: author.name,
      description: author.description,
      books: author.books.map(book => ({
        id: book._id.toString(),
        title: book.title,
      })),
    };

    callback(null, { author: authorResponse });
  } catch (error) {
    console.error('Error fetching author by ID:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createAuthor, 
  updateAuthor,
  getAllAuthors,
  getAuthorById
}