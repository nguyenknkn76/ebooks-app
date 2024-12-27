const mongoose = require('mongoose');

const voiceSchema = new mongoose.Schema({
    causual_name: { type: String}, // Alex
    name: { type: String}, //en-US-Journey-F
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language'},
    device_profile: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceProfile'},
    sample_voice: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile'},
    gender: {type: String}, // male female
    age: { type: mongoose.Schema.Types.ObjectId, ref: 'Age'},
});

module.exports = mongoose.model('Voice', voiceSchema);
