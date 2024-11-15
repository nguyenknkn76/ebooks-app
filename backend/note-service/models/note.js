const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    note: {type: String},
    important: {type: Boolean},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Note', noteSchema);