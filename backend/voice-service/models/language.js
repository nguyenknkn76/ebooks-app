const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  id: { type: String, required: true },
  language_code: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Language', languageSchema);
