const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: String},
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  voice: { type: String },
  created_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('History', historySchema);
