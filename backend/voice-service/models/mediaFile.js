const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaFileSchema = new mongoose.Schema({
  file_collection: { type: String },
  file_url: { type: String },
  file_type: { type: String },
  file_size: { type: Number }
});

module.exports = mongoose.model('MediaFile', mediaFileSchema);
