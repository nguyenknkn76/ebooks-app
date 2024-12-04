const voiceClient = require('../services/voiceClient');

exports.getVoices = async (req, res) => {
  try {
    const voices = await voiceClient.getVoices();
    res.json(voices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVoices = async (req, res) => {
  try {
    // console.log('this is voice controller');
    const voices = await voiceClient.getAllVoices();
    res.status(200).json(voices);
  } catch (error) {
    console.error('Error fetching voices:', error);
    res.status(error.code || 500).json({
      message: error.details || 'Failed to fetch voices',
    });
  }
};

exports.getVoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const voice = await voiceClient.getVoiceById(id);

    res.status(200).json(voice);
  } catch (error) {
    console.error('Error fetching voice by ID:', error);
    res.status(error.code || 500).json({
      message: error.details || 'Failed to fetch voice',
    });
  }
};

exports.createVoice = async (req, res) => {
  try {
    const { name, typeId, languageId, deviceProfileId, gender, age, fileName, fileContent, fileType } = req.body;

    const voiceData = {
      name,
      typeId,
      languageId,
      deviceProfileId,
      gender,
      age,
      sampleVoiceFile: {
        file_name: fileName,
        file_content: fileContent,
        file_type: fileType,
      },
    };

    const response = await voiceClient.createVoice(voiceData);

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating voice:', error);
    res.status(error.code || 500).json({
      message: error.details || 'Failed to create voice',
    });
  }
};