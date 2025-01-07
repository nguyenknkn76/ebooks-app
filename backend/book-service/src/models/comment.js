const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: String },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  content: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

module.exports = mongoose.model('Comment', commentSchema);
