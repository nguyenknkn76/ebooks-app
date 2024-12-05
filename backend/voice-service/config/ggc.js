const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();
const client = new textToSpeech.TextToSpeechClient();

module.exports = client;
