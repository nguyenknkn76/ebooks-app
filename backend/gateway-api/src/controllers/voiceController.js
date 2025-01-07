const voiceClient = require('../grpc/clients/voiceClient');
const grpc = require('@grpc/grpc-js');

const createAge = async (req, res) => {
  try {
    const { name, rate, pitch, volumn } = req.body;
    const response = await voiceClient.createAge({ name, rate, pitch, volumn });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDeviceProfile = async (req, res) => {
  try {
    const { casual_name, name, description } = req.body;
    const response = await voiceClient.createDeviceProfile({ 
      casual_name, 
      name, 
      description 
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLanguage = async (req, res) => {
  try {
    const { language_code, language, description } = req.body;
    const response = await voiceClient.createLanguage({ 
      language_code, 
      language, 
      description 
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createType = async (req, res) => {
  try {
    const { type, description } = req.body;
    const response = await voiceClient.createType({ type, description });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const response = await voiceClient.getAllLanguages();
    res.json(response.languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLanguageById = async (req, res) => {
  try {
    const response = await voiceClient.getLanguageById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllAges = async (req, res) => {
  try {
    const response = await voiceClient.getAllAges();
    res.json(response.ages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgeById = async (req, res) => {
  try {
    const response = await voiceClient.getAgeById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllDeviceProfiles = async (req, res) => {
  try {
    const response = await voiceClient.getAllDeviceProfiles();
    res.json(response.device_profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeviceProfileById = async (req, res) => {
  try {
    const response = await voiceClient.getDeviceProfileById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllTypes = async (req, res) => {
  try {
    const response = await voiceClient.getAllTypes();
    res.json(response.types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTypeById = async (req, res) => {
  try {
    const response = await voiceClient.getTypeById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createVoice = async (req, res) => {
  try {
    const { age_id, device_profile_id, language_id, type_id, name, gender, casual_name } = req.body;
    const response = await voiceClient.createVoice({ 
      age_id, 
      device_profile_id, 
      language_id, 
      type_id, 
      name, 
      gender,
      casual_name 
    });
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllVoices = async (req, res) => {
  try {
    const response = await voiceClient.getAllVoices();
    res.json(response.voices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVoiceById = async (req, res) => {
  try {
    const response = await voiceClient.getVoiceById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createAudioFiles = async (req, res) => {
  try {
    const { text_file_url } = req.body;
    const response = await voiceClient.createAudioFiles({ text_file_url });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAudioFiles2 = async (text_file_url) => {
  try {
    const response = await voiceClient.createAudioFiles({ text_file_url });
    return response;
  } catch (error) {
    console.error('Error creating audio files:', error);
    throw error;
  }
}

const countVoices = async (req, res) => {
  try {
    const response = await voiceClient.countVoices();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGgcVoiceName = async (req, res) => {
  try {
    const { type_id, language_id, gender } = req.query;
    const response = await voiceClient.getGgcVoiceName({ 
      type_id,
      language_id, 
      gender 
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllVoices2 = async (req, res) => {
  try {
    const { type_id, language_id, device_profile_id, age_id, gender } = req.query;
    const response = await voiceClient.getAllVoices2({ 
      type_id,
      language_id,
      device_profile_id,
      age_id,
      gender
    });
    res.json(response.voices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVoice = async (req, res) => {
  try {
    const response = await voiceClient.deleteVoice(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  deleteVoice,
  getAllVoices2,
  getGgcVoiceName,
  countVoices,
  getAllVoices,
  getVoiceById, 
  createVoice,
  createType,
  getAllTypes,
  getTypeById,
  createAge, 
  createDeviceProfile, 
  createLanguage ,
  getAllLanguages,
  getLanguageById,
  getAllAges,
  getAgeById,
  getAllDeviceProfiles,
  getDeviceProfileById,
  createAudioFiles,
  createAudioFiles2
};