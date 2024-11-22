// const Author = require('../models/author');

// exports.createAuthor = async (call, callback) => {
//   try {
//     const { user, pen_name, name, description } = call.request;

//     const author = new Author({
//       user,
//       pen_name,
//       name,
//       description,
//       books: [],
//     });

//     const savedAuthor = await author.save();

//     callback(null, {
//       id: savedAuthor._id.toString(),
//       name: savedAuthor.name,
//       pen_name: savedAuthor.pen_name,
//     });
//   } catch (error) {
//     console.error('Error creating author:', error);
//     callback(error);
//   }
// };
