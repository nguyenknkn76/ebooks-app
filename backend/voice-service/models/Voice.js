const mongoose = require('mongoose');

const VoiceSchema = new mongoose.Schema({
  name: String,
  type_id: mongoose.Schema.Types.ObjectId,
  language_id: mongoose.Schema.Types.ObjectId,
  device_profile_id: mongoose.Schema.Types.ObjectId,
  sample_voice: String // S3 key
});

const Voice = mongoose.model('Voice', VoiceSchema);

module.exports = Voice;
