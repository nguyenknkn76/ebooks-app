const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Library', librarySchema);
