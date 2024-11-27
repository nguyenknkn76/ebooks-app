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
};

module.exports = { createAuthor };
