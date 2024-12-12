const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  user: { type: String }, //user id uuidv4
  pen_name: {type: String}, 
  name: {type: String},
  description: {type: String},
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Author', authorSchema);
