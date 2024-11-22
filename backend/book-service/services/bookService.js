// const Book = require('../models/book');

// async function getBooks(call, callback) {
//   try {
//     const books = await Book.find().populate('author_id cover_img');
//     const bookList = books.map(book => ({
//       id: book._id.toString(),
//       title: book.title,
//       description: book.description,
//       author_id: book.author_id.toString(),
//       genres: book.genres,
//       publish_year: book.publish_year.toString(),
//       cover_img: book.cover_img.toString()
//     }));
//     callback(null, { books: bookList });
//   } catch (error) {
//     callback(error, null);
//   }
// }

// const getBookById = async (call, callback) => {
//   try {
//     const bookId = call.request.id;
//     const book = await Book.findById(bookId);

//     if (!book) {
//       return callback({
//         code: grpc.status.NOT_FOUND,
//         message: 'Book not found',
//       });
//     }

//     callback(null, {
//       book: {
//         id: book._id.toString(),
//         title: book.title,
//         author_id: book.author_id.toString(),
//         genres: book.genres,
//         description: book.description,
//         publish_year: book.publish_year,
//         created_at: book.created_at.toISOString(),
//         updated_at: book.updated_at.toISOString(),
//         cover_img: book.cover_img.toString(),
//       },
//     });
//   } catch (error) {
//     console.error('Error in getBookById:', error);
//     callback({
//       code: grpc.status.INTERNAL,
//       message: 'Internal server error',
//     });
//   }
// };

// module.exports = { getBookById, getBooks };
