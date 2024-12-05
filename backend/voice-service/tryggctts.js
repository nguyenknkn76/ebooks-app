const  ttsService = require('./services/ggcttsService');
const express = require('express');
const router = express.Router();
const app = express();

const convertTextToSpeech1 = async (req, res) => {
  try {
    const { text, languageCode, voiceName, gender, outputFile } = req.body;

    const voiceConfig = {
      languageCode: languageCode || 'en-US',
      name: voiceName || 'en-US-Wavenet-D',
      ssmlGender: gender || 'NEUTRAL',
    };

    const audioConfig = {
      audioEncoding: 'MP3', 
    };

    const result = await ttsService.convertTextToSpeech({
      text,
      voiceConfig,
      audioConfig,
      outputFile: outputFile || 'output.mp3',
    });

    if (result.success) {
      res.status(200).json({ message: 'Text converted to speech successfully', file: result.filePath });
    } else {
      res.status(500).json({ message: 'Failed to convert text to speech', error: result.error });
    }
  } catch (error) {
    console.error('Error in convertTextToSpeech:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

router.post('/convert', convertTextToSpeech1);
app.use(express.json({limit: '200mb'}));
app.use('/api',router);

app.listen(5001, () => {
  console.log('try tts listening onport 5001');
})