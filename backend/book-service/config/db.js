const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [String],
  description: String,
  publish_year: Number,
  created_at: Date,
  updated_at: Date,
  cover_img: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' }
});
module.exports = mongoose.model('Book', bookSchema);
