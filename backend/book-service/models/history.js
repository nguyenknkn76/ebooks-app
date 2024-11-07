const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  voice_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
});

module.exports = mongoose.model('History', historySchema);
