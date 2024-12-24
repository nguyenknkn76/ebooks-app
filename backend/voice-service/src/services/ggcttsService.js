const client = require('../../config/ggc');
const fs = require('fs');
const util = require('util');
// const tempPath = '../temp/';
const path = require('path');
require('dotenv').config();
const absoluteDir = process.env.ABSOLUTE_DIR;

const convertTextToSpeech = async (props) => {
	const {language, type, name, device_profile, age, gender, text} = props;
  
  try {
    const request = {
      input: {
          ssml: `
              <speak>
                  <voice gender="${gender}" age="${age}">Hello guys, Have a nice good time with Love Book</voice>
                  <break time="2s"/>
                  <prosody rate="0.75" pitch="0.5" volume="1.5">
                    ${text}
                  </prosody>
              </speak>`
      },
      voice: {
          languageCode: `${language.language_code}`,
          ssmlGender: `${gender}`,
      },
      audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 3,  // [0, 4]
          pitch: 20, // [-20, 20]
          volumeGainDb: 16, // [-96, 16]
          effectsProfileId: [`${device_profile.name}`]
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


module.exports = { convertTextToSpeech, getAllVoices };
