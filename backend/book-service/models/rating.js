const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  rating: { type: Number, required: true },
  review: String
});

module.exports = mongoose.model('Rating', ratingSchema);
