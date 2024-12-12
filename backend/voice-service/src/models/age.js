const mongoose = require('mongoose');

const ageSchema = mongoose.Schema({
  age: {type: String}, // young, middle, old
  description: {type: String},
})

module.exports = mongoose.model('age', ageSchema);
