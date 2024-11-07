const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  pen_name: String,
  name: String,
  description: String
});

module.exports = mongoose.model('Author', authorSchema);
