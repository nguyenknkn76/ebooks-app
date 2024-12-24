const voiceService = require('../../services/voiceService');
const mediaFileService = require('../../services/mediaFileService');
const MediaFile = require('../../models/mediaFile');
const grpc = require('@grpc/grpc-js');

const formatVoiceResponse = (voice) => ({
  id: voice._id.toString(),
  name: voice.name,
  type: voice.type ? {
    id: voice.type._id.toString(),
    type: voice.type.type,
    description: voice.type.description,
  } : null,
  language: voice.language ? {
    id: voice.language._id.toString(),
    language: voice.language.language,
    language_code: voice.language.language_code,
    description: voice.language.description,
  } : null,
  device_profile: voice.device_profile ? {
    id: voice.device_profile._id.toString(),
    name: voice.device_profile.name,
    description: voice.device_profile.description,
  } : null,
  sample_voice: voice.sample_voice ? {
    id: voice.sample_voice._id.toString(),
    url: voice.sample_voice.file_url,
    type: voice.sample_voice.file_type,
    size: voice.sample_voice.file_size,
  } : null,
  gender: voice.gender,
  age: voice.age,
});

const createVoice = async (call, callback) => {
  try {
    const { name, typeId, languageId, deviceProfileId, gender, age, sampleVoiceFile } = call.request;

    // Check references
    const refs = await voiceService.checkReferences(typeId, languageId, deviceProfileId);

    // Handle file upload
    const { file_name, file_content, file_type } = sampleVoiceFile;
    const fileUrl = await mediaFileService.uploadMediaFile2({
      bucket_name: process.env.AWS_BUCKET_NAME_SAMPLE_VOICE,
      file_name,
      file_content, 
      file_type,
    });

    // Create media file
    const mediaFile = new MediaFile({
      file_collection: 'voices',
      file_url: fileUrl,
      file_type,
      file_size: Buffer.from(file_content, 'base64').length,
    });
    await mediaFile.save();

    // Create voice
    const voice = await voiceService.createVoice({
      name,
      typeId,
      languageId, 
      deviceProfileId,
      gender,
      age,
      mediaFileId: mediaFile._id
    });

    callback(null, formatVoiceResponse(voice));
  } catch (error) {
    console.error('Error creating voice:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message || 'Internal server error'
    });
  }
};

const getAllVoices = async (call, callback) => {
  try {
    const voices = await voiceService.getAllVoices();
    callback(null, {
      voices: voices.map(formatVoiceResponse)
    });
  } catch (error) {
    console.error('Error fetching voices:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message || 'Internal server error'
    });
  }
};

const getVoiceById = async (call, callback) => {
  try {
    const voice = await voiceService.getVoiceById(call.request.id);
    if (!voice) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Voice not found'
      });
    }
    callback(null, formatVoiceResponse(voice));
  } catch (error) {
    console.error('Error fetching voice by ID:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message || 'Internal server error'
    });
  }
};

module.exports = {
  createVoice,
  getAllVoices,
  getVoiceById
};