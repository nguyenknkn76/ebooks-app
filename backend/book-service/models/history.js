const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: String },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  voice: { type: String, required: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
});

module.exports = mongoose.model('History', historySchema);
