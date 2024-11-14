const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  // id: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Type', typeSchema);
