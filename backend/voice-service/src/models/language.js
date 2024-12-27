const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  language_code: { type: String, required: true }, // en-US
  language: { type: String, required: true }, // English (US)
  description: { type: String }
});

module.exports = mongoose.model('Language', languageSchema);
