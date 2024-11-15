const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String},
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

module.exports = mongoose.model('User', userSchema);