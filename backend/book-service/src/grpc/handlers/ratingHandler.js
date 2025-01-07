const grpc = require('@grpc/grpc-js');
const ratingService = require('../../services/ratingService');

const createRating = async (call, callback) => {
  try {
    const { user, book, star, review } = call.request;

    // Validate star rating
    if (star < 1 || star > 5) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Star rating must be between 1 and 5'
      });
    }

    const rating = await ratingService.createRating({
      user,
      book,
      star,
      review
    });

    callback(null, {
      id: rating._id.toString(),
      user: rating.user,
      book: rating.book.toString(),
      star: rating.star,
      review: rating.review,
      created_at: rating.created_at.toISOString(),
      updated_at: rating.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getRatingsByBookId = async (call, callback) => {
  try {
    const ratings = await ratingService.getRatingsByBook(call.request.book_id);
    
    callback(null, {
      ratings: ratings.map(rating => ({
        id: rating._id.toString(),
        user: rating.user,
        book: rating.book.toString(),
        star: rating.star,
        review: rating.review,
        created_at: rating.created_at.toISOString(),
        updated_at: rating.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createRating,
  getRatingsByBookId
};