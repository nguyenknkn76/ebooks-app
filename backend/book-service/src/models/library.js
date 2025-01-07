const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  user: { type: String},
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

module.exports = mongoose.model('Library', librarySchema);
