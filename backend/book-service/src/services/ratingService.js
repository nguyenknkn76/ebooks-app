const Rating = require('../models/rating');
const Book = require('../models/book');

const createRating = async (call, callback) => {
  try {
    const { user, book_id, rating, review } = call.request;

    if (!user || !book_id || !rating) {
      return callback({
        code: 400,
        message: 'User, book_id, and rating are required',
      });
    }

    const newRating = new Rating({
      user,
      book: book_id,
      rating,
      review,
    });

    const savedRating = await newRating.save();

    // update book after create rating
    const updatedBook = await Book.findByIdAndUpdate(
      book_id,
      { $push: { ratings: savedRating._id } },
      { new: true }
    );

    // update avg rating of book
    const ratings = await Rating.find({ book: book_id });
    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    updatedBook.avg_rating = avgRating.toFixed(2);
    await updatedBook.save();

    const response = {
      id: savedRating._id.toString(),
      user: savedRating.user,
      book_id: savedRating.book.toString(),
      rating: savedRating.rating,
      review: savedRating.review || '',
    };

    callback(null, response);
  } catch (error) {
    console.error('Error creating rating:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createRating,
};
