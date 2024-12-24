const Voice = require('../models/voice');
const Type = require('../models/type');
const Language = require('../models/language');
const DeviceProfile = require('../models/deviceProfile');

const createVoice = async (data) => {
  const { name, typeId, languageId, deviceProfileId, gender, age, mediaFileId } = data;
  
  const voice = new Voice({
    name,
    type: typeId,
    language: languageId,
    device_profile: deviceProfileId,
    sample_voice: mediaFileId,
    gender,
    age,
  });

  return await voice.save();
};

const getAllVoices = async () => {
  return await Voice.find()
    .populate('type', '_id type description')
    .populate('language', '_id language language_code description')
    .populate('device_profile', '_id name description')
    .populate('sample_voice', '_id file_url file_type file_size');
};

const getVoiceById = async (id) => {
  return await Voice.findById(id)
    .populate('type', 'type description')
    .populate('language', 'language language_code description')
    .populate('device_profile', 'name description')
    .populate('sample_voice', 'file_url file_type file_size');
};

const checkReferences = async (typeId, languageId, deviceProfileId) => {
  const type = await Type.findById(typeId);
  if (!type) throw new Error('Invalid type ID');

  const language = await Language.findById(languageId);
  if (!language) throw new Error('Invalid language ID');

  const deviceProfile = await DeviceProfile.findById(deviceProfileId);
  if (!deviceProfile) throw new Error('Invalid device profile ID');

  return { type, language, deviceProfile };
};

module.exports = {
  createVoice,
  getAllVoices,
  getVoiceById,
  checkReferences
};