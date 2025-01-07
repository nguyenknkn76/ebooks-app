const client = require('../../config/ggc');
const fs = require('fs');
const util = require('util');
const path = require('path');
require('dotenv').config();
const absoluteDir = process.env.ABSOLUTE_DIR;
const Language = require('../models/language');
const DeviceProfile = require('../models/deviceProfile');
const Type = require('../models/type');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../../config/aws');

const getTextFromS3 = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error reading file from S3:', error);
    throw error;
  }
};

const convertTextToSpeech = async ({ text, deviceProfile, pitch, rate, volumn, gender, language, name }) => {
  let outputFile = null;
  try {
    // Get sample rate based on device profile
    // const sampleRate = deviceProfile.name.includes('handset') ? 16000 : 24000;

    // Configure request
    const request = {
      input: { text },
      voice: {
        languageCode: language,
        name: name,
        ssmlGender: gender.toUpperCase()
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: parseFloat(pitch),
        speakingRate: parseFloat(rate),
        volumeGainDb: parseFloat(volumn),
        sampleRateHertz: 16000,
        effectsProfileId: deviceProfile ? [deviceProfile] : undefined,
      }
    };

    // Make request to Google TTS
    const [response] = await client.synthesizeSpeech(request);

    // Create temp directory if it doesn't exist
    const tempDir = path.join(absoluteDir, 'src/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Generate unique filename
    const fileName = `speech_${Date.now()}.mp3`;
    const outputFile = path.join(tempDir, fileName);

    // Write audio content to file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');

    return {
      filePath: outputFile,
      fileName: fileName,
      duration: response.audioContent.length / (16000 * 2) // Approximate duration in seconds
    };
  } catch (error) {
    console.error('Error in convertTextToSpeech:', error);
    throw new Error(`Failed to convert text to speech: ${error.message}`);
  } finally {
    // Cleanup: Delete temp file after use
    if (outputFile && fs.existsSync(outputFile)) {
      try {
        await util.promisify(fs.unlink)(outputFile);
        console.log(`Cleaned up temp file: ${outputFile}`);
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }
    }
  }
};

const getGgcVoiceName = async (typeId, languageId, gender) => {
  try {
    // Get type and language details
    const type = await Type.findById(typeId);
    const language = await Language.findById(languageId);

    if (!type || !language) {
      throw new Error('Type or Language not found');
    }

    // Get all available voices from Google
    const [result] = await client.listVoices({});
    const voices = result.voices;

    // Filter voices based on criteria
    const filteredVoices = voices.filter(voice => {
      const isMatchingLanguage = voice.languageCodes[0] === language.language_code;
      const isMatchingGender = voice.ssmlGender === gender.toUpperCase();
      const isMatchingType = voice.name.includes(type.type);
      
      return isMatchingLanguage && isMatchingGender && isMatchingType;
    });

    // Return just the voice names
    return filteredVoices.map(voice => voice.name);

  } catch (error) {
    console.error('Error in getGgcVoiceName:', error);
    throw error;
  }
};

const getGgcVoices = async () => {
  try {
    // List all available voices
    const [result] = await client.listVoices({});
    const voices = result.voices;

    // Filter voices for Vietnamese and US English
    const filteredVoices = voices.filter(voice => {
      const languageCode = voice.languageCodes[0];
      return languageCode === 'vi-VN' || languageCode === 'en-US';
    });

    // Map to our schema format
    const mappedVoices = filteredVoices.map(voice => ({
      name: voice.name,
      language_code: voice.languageCodes[0],
      gender: voice.ssmlGender.toLowerCase(),
      natural_sample_rate_hertz: voice.naturalSampleRateHertz,
      supported_rates: voice.naturalSampleRateHertz > 16000 ? [8000, 16000, 24000] : [8000, 16000]
    }));

    return mappedVoices;

  } catch (error) {
    console.error('Error fetching GGC voices:', error);
    throw new Error('Failed to fetch Google Cloud voices');
  }
};

module.exports = { 
  getGgcVoices,
  convertTextToSpeech,
  getTextFromS3,
  getGgcVoiceName
};