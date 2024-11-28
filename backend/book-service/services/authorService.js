const Author = require('../models/author');

const createAuthor = async (call, callback) => {
  try {
    const { user, pen_name, name, description } = call.request;

    const author = new Author({
      user,
      pen_name,
      name,
      description,
    });

    const savedAuthor = await author.save();
    callback(null, {
      id: savedAuthor.id,
      user: savedAuthor.user,
      pen_name: savedAuthor.pen_name,
      name: savedAuthor.name,
      description: savedAuthor.description,
    });
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

module.exports = {
  createAuthor, 
  updateAuthor
}