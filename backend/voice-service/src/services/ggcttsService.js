const client = require('../../config/ggc');
const fs = require('fs');
const util = require('util');
// const tempPath = '../temp/';
const path = require('path');
const bgmusic = require('./bgmusic/index');
require('dotenv').config();
const absoluteDir = process.env.ABSOLUTE_DIR;
const convertTextToSpeech = async (props) => {
	const { text, voiceConfig, audioConfig, outputFile } = props;
  try {
    // const request = {
    //   input: { text },
    //   voice: voiceConfig,
    //   audioConfig: audioConfig,
    // };
    
    // const request = {
    //   input: {
    //       ssml: `
    //           <speak>
    //               <voice gender="MALE" age="senior">Hello, this is a basic example of text-to-speech conversion using Google Cloud's Text-to-Speech API.</voice>
    //               <break time="2s"/>
    //               <prosody rate="1.25" pitch="0.5" volume="1.5">
    //                   Simple example voice synthesis.
    //               </prosody>
    //           </speak>`
    //   },
    //   voice: {
    //       languageCode: "en-US",
    //       ssmlGender: "MALE"
    //   },
    //   audioConfig: {
    //       audioEncoding: 'MP3',
    //       speakingRate: 1.25,
    //       pitch: 0.5,
    //       volumeGainDb: 1.5,
    //       effectsProfileId: ["wearable-class-device"]
    //   }
    // };  

    const request = {
      input: {
          ssml: `
              <speak>
                  <voice gender="FEMALE" age="senior">Xin chào, đây là ví dụ cơ bản về việc sử dụng api của ggc text to speech</voice>
                  <break time="2s"/>
                  <prosody rate="0.75" pitch="0.5" volume="1.5">
                    Xin chào các bạn thân mến, tôi yêu các bạn, love you bro. Mãi là anh em, đưa tay đây nào mãi bên nhau bạn nhé é é.
                  </prosody>
              </speak>`
      },
      voice: {
          languageCode: "vi-VN",
          ssmlGender: "FEMALE"
      },
      audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 3, // 0 > 4
          pitch: 20, // -20 > 20
          volumeGainDb: 16, // -96 > 16
          effectsProfileId: ["wearable-class-device"]
      }
    };  
    console.log('combine bgmusic success')
    //send req to ggc text to speech
    const [response] = await client.synthesizeSpeech(request);
		const dirname = path.join(absoluteDir, 'src/temp');
		const outputFilePath = path.join(dirname, outputFile);
		const deletedFilePath = path.join(dirname, "draf");
		console.log(dirname);
		console.log(outputFilePath);
		// console.log(__dirname);
		// console.log(__filename);
    //save audio file 
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFilePath, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFilePath}`);
		// const unlinkFile = util.promisify(fs.unlink);
		// await unlinkFile (deletedFilePath);
		// console.log('file be deleted', deletedFilePath)
    return { success: true, filePath: outputFilePath };
  } catch (error) {
    console.error('Error in convertTextToSpeech:', error);
    return { success: false, error: error.message };
  }
};

const getAllVoices = async () => {
  const [result] = await client.listVoices({});
  const voices = result.voices;
  const vietnameseVoices = [];
  const englishUSVoices = [];

  voices.forEach(voice => {
    if(voice.languageCodes.includes('vi-VN')){
      vietnameseVoices.push(voice);
    }
    if(voice.languageCodes.includes('en-US')){
      englishUSVoices.push(voice);
    }
  })
  console.log('Voices:');
  vietnameseVoices.forEach(voice => console.log(
    {
      name: voice.name,
      gender: voice.ssmlGender,
      language: voice.languageCodes,
      rate: voice.naturalSampleRateHertz
    }
  ))
}

const combineAudio  = async () => {
  bgmusic.combineAudio();
}
module.exports = { convertTextToSpeech, getAllVoices, combineAudio };
