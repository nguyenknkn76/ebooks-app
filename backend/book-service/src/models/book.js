const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [{type: String}],
  description: String,
  publish_year: Number,
  cover_img: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' },
  chapters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}],
  avg_rating: { type: Number, default: 0 },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model('Book', bookSchema);
