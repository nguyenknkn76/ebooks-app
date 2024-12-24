const Rating = require('../models/rating');

const createRating = async (data) => {
  const { user, book_id, rating, review } = data;
  
  const newRating = new Rating({
    user,
    book: book_id,
    rating,
    review,
  });

  return await newRating.save();
};

const getRatingsByBookId = async (bookId) => {
  return await Rating.find({ book: bookId });
};

module.exports = {
  createRating,
  getRatingsByBookId
};