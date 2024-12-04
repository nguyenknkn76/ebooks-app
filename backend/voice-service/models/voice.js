const mongoose = require('mongoose');

const voiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
    device_profile: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceProfile', required: true },
    sample_voice: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile', required: true },
    gender: {type: String},
    age: {type: Number}
});

module.exports = mongoose.model('Voice', voiceSchema);
