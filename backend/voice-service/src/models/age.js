const mongoose = require('mongoose');

const ageSchema = new mongoose.Schema({
  name: {type: String}, // Senior, Adult, Child
  rate: {type: Number},
  pitch: {type: Number},
  volumn: {type: Number},
});

module.exports = mongoose.model('Age', ageSchema);
