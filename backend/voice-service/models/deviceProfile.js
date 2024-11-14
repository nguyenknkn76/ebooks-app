const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceProfileSchema = new Schema({
  // id: { type: String, required: true }, //! fix -> uuidv4 
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('DeviceProfile', deviceProfileSchema);
