const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: String }, //userid uuidv4
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  comment: String,
  created_at: { type: Date, default: Date.now },
  // replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] 
});

module.exports = mongoose.model('Comment', commentSchema);
