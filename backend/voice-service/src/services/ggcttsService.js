const client = require('../../config/ggc');
const fs = require('fs');
const util = require('util');
// const tempPath = '../temp/';
const path = require('path');
require('dotenv').config();
const absoluteDir = process.env.ABSOLUTE_DIR;
const convertTextToSpeech = async (props) => {
	const { text, voiceConfig, audioConfig, outputFile } = props;
  try {
    const request = {
      input: { text },
      voice: voiceConfig,
      audioConfig: audioConfig,
    };

    //send req to ggc text to speech
    const [response] = await client.synthesizeSpeech(request);
		const dirname = path.join(absoluteDir, 'temp');
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
		const unlinkFile = util.promisify(fs.unlink);
		await unlinkFile (deletedFilePath);
		console.log('file be deleted', deletedFilePath)
    return { success: true, filePath: outputFilePath };
  } catch (error) {
    console.error('Error in convertTextToSpeech:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { convertTextToSpeech };
