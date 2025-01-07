const {getTextFromS3} = require('../../services/ggcttsService');
const {uploadMediaFile2} = require('../../utils/upload');
const voiceService = require('../../services/voiceService');
const ggcttsService = require('../../services/ggcttsService');
const grpc = require('@grpc/grpc-js');
const util = require('util');
const fs = require('fs');

const createAudioFiles = async (call, callback) => {
  try {
    const { text_file_url } = call.request;
    
    // Get text content from S3
    const text = await getTextFromS3(text_file_url);
    
    // Get all voices from database
    const voices = await voiceService.getAllVoices();
    
    // Create audio files for each voice
    const audioFiles = [];
    for (const voice of voices) {
      try {
        // Convert text to speech
        const audioResult = await ggcttsService.convertTextToSpeech({
          text,
          deviceProfile: voice.device_profile.name,
          pitch: voice.age.pitch,
          rate: voice.age.rate,
          volumn: voice.age.volumn,
          gender: voice.gender,
          language: voice.language.language_code,
          name: voice.name
        });

        // Read generated audio file
        const readFile = util.promisify(fs.readFile);
        const audioContent = await readFile(audioResult.filePath);

        // Upload to S3
        const audioUrl = await uploadMediaFile2({
          bucket_name: process.env.AWS_BUCKET_NAME,
          file_name: `audio_${voice._id}_${Date.now()}.mp3`,
          file_content: audioContent.toString('base64'),
          file_type: 'audio/mp3'
        });

        // Clean up temp file
        fs.unlink(audioResult.filePath, (err) => {
          if (err) console.error('Error deleting temp file:', err);
        });

        audioFiles.push({
          voice_id: voice._id.toString(),
          audio_url: audioUrl
        });
      } catch (error) {
        console.error(`Error processing voice ${voice._id}:`, error);
      }
    }

    callback(null, { audio_files: audioFiles });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createAudioFiles
};