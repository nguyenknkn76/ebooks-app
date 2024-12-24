const mongoose = require('mongoose');

const deviceProfileSchema = new mongoose.Schema({
  causual_name: {type: String},
  effect_profile: {type: String},
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('DeviceProfile', deviceProfileSchema);
