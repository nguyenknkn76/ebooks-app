const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { getDB } = require('../config/db');

const voiceSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
    device_profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceProfile', required: true },
    sample_voice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile', required: true },
});
  
module.exports = mongoose.model('Voice', voiceSchema);
// const Voice = {
//   findAll: async () => {
//     const db = getDB();
//     return await db.collection('voice').find().toArray();
//   },
//   // Other methods as needed
// };

// module.exports = Voice;
