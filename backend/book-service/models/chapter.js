const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  text_file: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' },
  audio_file: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' }
});

module.exports = mongoose.model('Chapter', chapterSchema);
