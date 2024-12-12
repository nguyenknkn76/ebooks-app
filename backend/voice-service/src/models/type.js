const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Type', typeSchema);
