const ratingService = require('../../services/ratingService');
const bookService = require('../../services/bookService');
const grpc = require('@grpc/grpc-js');

const createRating = async (call, callback) => {
  try {
    const { user, book_id, rating } = call.request;

    if (!user || !book_id || !rating) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'User, book_id, and rating are required',
      });
    }

    const savedRating = await ratingService.createRating(call.request);
    const ratings = await ratingService.getRatingsByBookId(book_id);
    await bookService.updateBookRating(book_id, savedRating._id, ratings);

    callback(null, {
      id: savedRating._id.toString(),
      user: savedRating.user,
      book_id: savedRating.book.toString(),
      rating: savedRating.rating,
      review: savedRating.review || ''
    });
  } catch (error) {
    console.error('Error creating rating:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createRating
};