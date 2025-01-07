const Rating = require('../models/rating');
const Book = require('../models/book');

const createRating = async (ratingData) => {
  const rating = new Rating(ratingData);
  await rating.save();

  // Update book average rating
  await updateBookAverageRating(ratingData.book);
  
  return rating;
};

const updateBookAverageRating = async (bookId) => {
  const ratings = await Rating.find({ book: bookId });
  const avgRating = ratings.reduce((acc, curr) => acc + curr.star, 0) / ratings.length;
  
  await Book.findByIdAndUpdate(bookId, { avg_rating: avgRating });
};

const getRatingsByBook = async (bookId) => {
  return await Rating.find({ book: bookId })
    .sort({ created_at: -1 });
};

const updateRating = async (id, ratingData) => {
  const rating = await Rating.findByIdAndUpdate(id, {
    ...ratingData,
    updated_at: Date.now()
  }, { new: true });

  await updateBookAverageRating(rating.book);
  
  return rating;
};

const deleteRating = async (id) => {
  const rating = await Rating.findById(id);
  await Rating.findByIdAndDelete(id);
  await updateBookAverageRating(rating.book);
};

module.exports = {
  createRating,
  getRatingsByBook,
  updateRating,
  deleteRating
};