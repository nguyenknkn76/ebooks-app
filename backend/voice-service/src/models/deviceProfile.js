const mongoose = require('mongoose');

const deviceProfileSchema = new mongoose.Schema({
  casual_name: {type: String},   // Small home speaker
  name: { type: String }, // small-bluetooth-speaker-class-device
  description: { type: String }
});

module.exports = mongoose.model('DeviceProfile', deviceProfileSchema);
