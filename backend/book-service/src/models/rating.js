const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  star: { type: Number, required: true },
  review: {type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

module.exports = mongoose.model('Rating', ratingSchema);
