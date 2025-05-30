const mongoose = require('mongoose');

const mediaFileSchema = new mongoose.Schema({
  voice: {type: String, default: null},
  file_collection: { type: String, required: true },
  file_url: { type: String, required: true },
  file_type: { type: String, required: true },
  file_size: { type: Number, required: true }
});

module.exports = mongoose.model('MediaFile', mediaFileSchema);
