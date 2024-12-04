const mongoose = require('mongoose');

const deviceProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('DeviceProfile', deviceProfileSchema);
