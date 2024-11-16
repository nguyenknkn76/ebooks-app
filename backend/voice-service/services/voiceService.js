const Voice = require('../models/voice');
const getVoices = async (call, callback) => {
    try {
      const voices = await Voice.find()
        // .populate('type_id language_id device_profile_id sample_voice_id');
      callback(null, { voices });
    } catch (error) {
      callback(error);
    }
  };


module.exports = { getVoices };
