const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  chapter_number: {type: Number},
  name: { type: String },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
  text_file: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' },
  audio_file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' }],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Chapter', chapterSchema);
