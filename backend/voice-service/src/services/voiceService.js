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

const getAllVoices2 = async (filters = {}) => {
  const query = {};
  
  if (filters.type_id) query.type = filters.type_id;
  if (filters.language_id) query.language = filters.language_id;
  if (filters.device_profile_id) query.device_profile = filters.device_profile_id;
  if (filters.age_id) query.age = filters.age_id;
  if (filters.gender) query.gender = filters.gender;

  return await Voice.find(query)
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

const countVoices = async () => {
  return await Voice.countDocuments();
};
module.exports = {
  countVoices,
  createVoice,
  getAllVoices,
  getVoiceById,
  updateVoice,
  deleteVoice,
  getAllVoices2
};