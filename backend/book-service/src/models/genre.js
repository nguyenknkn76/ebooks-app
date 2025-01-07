const mongoose = require('mongoose');

const genreScheme = new mongoose.Schema({
  name: {type: String},
  description: {type: String}
});

module.exports = mongoose.model('Genre', genreScheme);
