const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  language_code: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Language', languageSchema);
