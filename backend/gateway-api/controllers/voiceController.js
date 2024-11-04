const voiceClient = require('../services/voiceClient');

exports.getVoices = async (req, res) => {
  try {
    const voices = await voiceClient.getVoices();
    res.json(voices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
