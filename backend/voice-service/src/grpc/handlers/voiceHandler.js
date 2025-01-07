const grpc = require('@grpc/grpc-js');
const util = require('util');
const fs = require('fs');
const voiceService = require('../../services/voiceService');
const ggcttsService = require('../../services/ggcttsService');
const ageService = require('../../services/ageService');
const deviceProfileService = require('../../services/deviceProfileService');
const languageService = require('../../services/languageService');
const mediaFileService = require('../../services/mediaFileService');

const getAllVoices = async (call, callback) => {
  try {
    const voices = await voiceService.getAllVoices();
    callback(null, {
      voices: voices.map(voice => ({
        id: voice._id.toString(),
        casual_name: voice.casual_name,
        name: voice.name,
        type: voice.type,
        language: voice.language,
        device_profile: voice.device_profile,
        gender: voice.gender,
        age: voice.age,
        sample_voice: voice.sample_voice
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllVoices2 = async (call, callback) => {
  try {
    const voices = await voiceService.getAllVoices2(call.request);
    callback(null, {
      voices: voices.map(voice => ({
        id: voice._id.toString(),
        casual_name: voice.casual_name,
        name: voice.name,
        type: voice.type,
        language: voice.language,
        device_profile: voice.device_profile,
        gender: voice.gender,
        age: voice.age,
        sample_voice: voice.sample_voice
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
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

    callback(null, {
      id: voice._id.toString(),
      casual_name: voice.casual_name,
      name: voice.name,
      type: voice.type,
      language: voice.language,
      device_profile: voice.device_profile,
      gender: voice.gender,
      age: voice.age,
      sample_voice: voice.sample_voice
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const createVoice = async (call, callback) => {
  try {
    const { age_id, device_profile_id, language_id, type_id, name, gender, casual_name } = call.request;

    // Fetch models
    const age = await ageService.getAgeById(age_id);
    const deviceProfile = await deviceProfileService.getDeviceProfileById(device_profile_id);
    const language = await languageService.getLanguageById(language_id);

    if (!age || !deviceProfile || !language) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Required related models not found'
      });
    }

    // Generate sample audio
    const sampleAudio = await ggcttsService.convertTextToSpeech({
      text: "Welcome to Love Book",
      deviceProfile: deviceProfile.name,
      pitch: age.pitch,
      rate: age.rate,
      volumn: age.volumn,
      gender: gender,
      language: language.language_code,
      name: name
    });

    const readFile = util.promisify(fs.readFile);
    const audioContent = await readFile(sampleAudio.filePath);

    // Create MediaFile record
    const mediaFile = await mediaFileService.createMediaFile({
      file_collection: 'sample_voices',
      file_type: 'audio/mp3',
      file_size: audioContent.length
    }, {
      originalname: sampleAudio.fileName,
      buffer: audioContent,
      mimetype: 'audio/mp3'
    });

    // Create voice with MediaFile reference
    const voice = await voiceService.createVoice({
      age: age_id,
      device_profile: device_profile_id,
      language: language_id,
      type: type_id,
      name,
      gender,
      casual_name,
      sample_voice: mediaFile._id
    });

    const populatedVoice = await voiceService.getVoiceById(voice._id);
    console.log(populatedVoice);
    // Clean up temp file
    fs.unlink(sampleAudio.filePath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    callback(null, {
      id: populatedVoice._id.toString(),
      casual_name: populatedVoice.casual_name,
      name: populatedVoice.name,
      type: populatedVoice.type,
      language: populatedVoice.language,
      device_profile: populatedVoice.device_profile,
      gender: populatedVoice.gender,
      age: populatedVoice.age,
      sample_voice: populatedVoice.sample_voice
    });

  } catch (error) {
    console.error('Create voice error:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const countVoices = async (call, callback) => {
  try {
    const count = await voiceService.countVoices();
    callback(null, { count });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getGgcVoiceName = async (call, callback) => {
  try {
    const { type_id, language_id, gender } = call.request;
    const voiceNames = await ggcttsService.getGgcVoiceName(type_id, language_id, gender);
    
    callback(null, { voice_names: voiceNames });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const deleteVoice = async (call, callback) => {
  try {
    const voice = await voiceService.deleteVoice(call.request.id);
    
    if (!voice) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Voice not found'
      });
    }

    callback(null, {
      message: 'Voice deleted successfully'
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};
module.exports = { 
  deleteVoice,
  getGgcVoiceName,
  countVoices,
  createVoice,
  getAllVoices,
  getVoiceById, 
  getAllVoices2
};