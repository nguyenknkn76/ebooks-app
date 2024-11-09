const fs = require('fs');
const util = require('util');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const client = new TextToSpeechClient();

async function convertTextToSpeech({ props }) {
    const {
        text,
        language,
        gender,
        type,
        deviceprofile,
        age,
        rate,
        pitch,
        volume,
        time,
        technology,
        label,
        outputFile
    } = props;

    const request = {
        input: {
            ssml: `
                <speak>
                <voice gender="${gender}" age="${age}">${text}</voice>
                <break time="${time}"/>
                <prosody rate="${rate}" pitch="${pitch}" volume="${volume}">
                    ${label}
                </prosody>
                <audio src="${type}">${text}</audio>
                </speak>`
        },
        voice: {
            languageCode: language,
            ssmlGender: gender,
            name: technology
        },
        audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: parseFloat(rate),
            pitch: parseFloat(pitch),
            volumeGainDb: parseFloat(volume),
            effectsProfileId: [deviceprofile]
        }
    };

    try {
        const [response] = await client.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(outputFile, response.audioContent, 'binary');
        console.log('Audio content written to file:', outputFile);
    } catch (error) {
        console.error('Error synthesizing speech:', error);
    }
}

// convertTextToSpeech('Hello world', 'output.mp3');

module.exports = {convertTextToSpeech};