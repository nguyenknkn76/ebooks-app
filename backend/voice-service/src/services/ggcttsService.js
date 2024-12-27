const client = require('../../config/ggc');
const fs = require('fs');
const util = require('util');
const path = require('path');
require('dotenv').config();
const absoluteDir = process.env.ABSOLUTE_DIR;

const Language = require('../models/language');
const DeviceProfile = require('../models/deviceProfile');
const Type = require('../models/type');

const getGgcVoicesCustom = async ({ languageId, typeId, gender }) => {
  try {
    const language = await Language.findById(languageId);
    const type = await Type.findById(typeId);

    if (!language || !type) {
      throw new Error('Invalid parameters: Language or Type not found');
    }

    const [result] = await client.listVoices({});
    const voices = result.voices;

    const typeMapping = {
      'Standard': '-Standard-',
      'Neural': '-Neural2-',
      'Wavenet': '-Wavenet-'
    };

    const filteredVoices = voices.filter(voice => {
      const matchLanguage = voice.languageCodes[0] === language.language_code;
      const matchGender = !gender || voice.ssmlGender.toLowerCase() === gender.toLowerCase();
      const matchType = voice.name.includes(typeMapping[type.type]);

      return matchLanguage && matchGender && matchType;
    });

    return filteredVoices.map(voice => ({
      name: voice.name,
      language_code: voice.languageCodes[0],
      gender: voice.ssmlGender.toLowerCase(),
      natural_sample_rate_hertz: voice.naturalSampleRateHertz,
      supported_rates: voice.naturalSampleRateHertz > 16000 ? [8000, 16000, 24000] : [8000, 16000]
    }));

  } catch (error) {
    console.error('Error in getGgcVoicesCustom:', error);
    throw new Error(`Failed to fetch custom Google Cloud voices: ${error.message}`);
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
  getGgcVoicesCustom
};