const Voice = require('../models/voice');
const Type = require('../models/type');
const Language = require('../models/language');
const DeviceProfile = require('../models/deviceProfile');
const MediaFile = require('../models/mediaFile');
const mediaFileService = require('./mediaFileService');

require('dotenv').config();

const getVoices = async (call, callback) => {
  try {
    const voices = await Voice.find()
      // .populate('type_id language_id device_profile_id sample_voice_id');
    callback(null, { voices });
  } catch (error) {
    callback(error);
  }
};

const getAllVoices = async (call, callback) => {
  // console.log('this is get all voices, VOICE SERVICE:')
  try {
    const voices = await Voice.find()
      .populate('type', '_id type description')
      .populate('language', '_id language language_code description')
      .populate('device_profile', '_id name description')
      .populate('sample_voice', '_id file_url file_type file_size');
    
    console.log(voices)
    // response normalization 
    const response = voices.map((voice) => ({
      id: voice._id.toString(),
      name: voice.name,
      type: voice.type ?
      {
        id: voice.type._id.toString(),
        type: voice.type.type,
        description: voice.type.description,
      } : null,
      language: voice.language ? 
      {
        id: voice.language._id.toString(),
        language: voice.language.language,
        language_code: voice.language.language_code,
        description: voice.language.description,
      } : null,
      device_profile: voice.device_profile ?
      {
        id: voice.device_profile._id.toString(),
        name: voice.device_profile.name,
        description: voice.device_profile.description,
      } : null,
      sample_voice: voice.sample_voice ?
      {
        id: voice.sample_voice._id.toString(),
        url: voice.sample_voice.file_url,
        type: voice.sample_voice.file_type,
        size: voice.sample_voice.file_size,
      } : null,
      gender: voice.gender,
      age: voice.age,
    }));

    callback(null, { voices: response });
  } catch (error) {
    console.error('Error fetching voices:', error);
    callback({
      code: 500,
      message: error.message || 'Internal server error',
    });
  }
};

const getVoiceById = async (call, callback) => {
  try {
    const { id } = call.request;

    // Tìm Voice theo ID và populate các tham chiếu
    const voice = await Voice.findById(id)
      .populate('type', 'type description')
      .populate('language', 'language language_code description')
      .populate('device_profile', 'name description')
      .populate('sample_voice', 'file_url file_type file_size');

    if (!voice) {
      return callback({
        code: 404,
        message: 'Voice not found',
      });
    }

    // Chuyển đổi dữ liệu trả về
    const response = {
      id: voice._id.toString(),
      name: voice.name,
      type: {
        id: voice.type._id.toString(),
        type: voice.type.type,
        description: voice.type.description,
      },
      language: {
        id: voice.language._id.toString(),
        language: voice.language.language,
        language_code: voice.language.language_code,
        description: voice.language.description,
      },
      device_profile: {
        id: voice.device_profile._id.toString(),
        name: voice.device_profile.name,
        description: voice.device_profile.description,
      },
      sample_voice: {
        id: voice.sample_voice._id.toString(),
        url: voice.sample_voice.file_url,
        type: voice.sample_voice.file_type,
        size: voice.sample_voice.file_size,
      },
      gender: voice.gender,
      age: voice.age,
    };

    callback(null, response);
  } catch (error) {
    console.error('Error fetching voice by ID:', error);
    callback({
      code: 500,
      message: error.message || 'Internal server error',
    });
  }
};


//! input: name should have name convention
/* 
  - input: name, type, language, deviceprofile, gender, age, samplevoice file
  - do smt:
    + heck exist ref
    + upload file to s3 -> get mediafile url -> create mediafile -> create voice
  - output: new voice (attributes: name, type, language, ... etc)
  demo api here: E:\graduation thesis - proj\backend\gateway-api\s-voicesapi.js
*/
const createVoice = async (call, callback) => {
  // console.log("try create voice, this is voice service")
  try {
    const { name, typeId, languageId, deviceProfileId, gender, age, sampleVoiceFile } = call.request;
    console.log(call.request);
    // check ref is existed
    const type = await Type.findById(typeId);
    if (!type) throw new Error('Invalid type ID');

    const language = await Language.findById(languageId);
    if (!language) throw new Error('Invalid language ID');

    const deviceProfile = await DeviceProfile.findById(deviceProfileId);
    if (!deviceProfile) throw new Error('Invalid device profile ID');

    //upload file and geturl
    const { file_name, file_content, file_type } = sampleVoiceFile; // Thông tin file từ request
    const fileUrl = mediaFileService.uploadMediaFile2({
      bucket_name: process.env.AWS_BUCKET_NAME_SAMPLE_VOICE,
      file_name,
      file_content,
      file_type,
    });

    // create media file 
    const mediaFile = new MediaFile({
      file_collection: 'voices',
      file_url: fileUrl,
      file_type,
      file_size: Buffer.from(file_content, 'base64').length,
    });
    await mediaFile.save();

    // create voice
    const newVoice = new Voice({
      name,
      type: type._id,
      language: language._id,
      device_profile: deviceProfile._id,
      sample_voice: mediaFile._id,
      gender,
      age,
    });

    await newVoice.save();

    // return response here hehehe
    const response =  {
      id: newVoice._id.toString(),
      name: newVoice.name,
      type: type.type,
      language: language.language,
      device_profile: deviceProfile.name,
      gender: newVoice.gender,
      age: newVoice.age,
      sample_voice: {
        id: mediaFile._id.toString(),
        url: mediaFile.file_url,
      },
    };
    callback(null, response);
  } catch (error) {
    console.error('Error creating voice:', error);
    callback({
      code: 500,
      message: error.message || 'Internal server error',
    });
  }
};

module.exports = { 
  getVoices,
  createVoice,
  getAllVoices,
  getVoiceById,
};

