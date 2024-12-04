const mongoose = require('mongoose');

const deviceProfileSchema = new mongoose.Schema({
  // id: { type: String, required: true }, //! fix -> uuidv4 
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('DeviceProfile', deviceProfileSchema);
