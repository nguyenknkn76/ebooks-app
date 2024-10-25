// gateway-api/controllers/voiceController.js
const voiceClient = require('../services/voiceGrpcClient');

exports.getVoiceById = (req, res) => {
  const { voiceId } = req.params;

  voiceClient.GetVoiceById({ id: voiceId }, (error, response) => {
    // console.log('=====>> err here', error)
    console.log('try to get voice')
    if (error) {
      console.error('GATEWAY API: Error fetching voice:', error);
      return res.status(500).json({ error: 'Error fetching voice' });
    }
    res.json(response);
  });
};

