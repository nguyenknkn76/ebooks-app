const Voice = require('../models/voice');

const createVoice = async (voiceData) => {
  const voice = new Voice(voiceData);
  return await voice.save();
};

const getAllVoices = async () => {
  return await Voice.find()
    .populate('type')
    .populate('language')
    .populate('device_profile')
    .populate('sample_voice')
    .populate('age');
};

const getVoiceById = async (id) => {
  return await Voice.findById(id)
    .populate('type')
    .populate('language')
    .populate('device_profile')
    .populate('sample_voice')
    .populate('age');
};

const updateVoice = async (id, voiceData) => {
  return await Voice.findByIdAndUpdate(id, voiceData, { new: true });
};

const deleteVoice = async (id) => {
  return await Voice.findByIdAndDelete(id);
};

module.exports = {
  createVoice,
  getAllVoices,
  getVoiceById,
  updateVoice,
  deleteVoice
};