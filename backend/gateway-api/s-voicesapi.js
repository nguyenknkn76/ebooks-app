const axios = require('axios');
const fs = require('fs');

const file_path_1 = './samples/rfiu.mp3'
// const file_path_2 = './samples/longcontent.txt';
const file_content_1 = fs.readFileSync(file_path_1, 'base64');
// const file_content_2 = fs.readFileSync(file_path_2, 'base64');

const sendreq = async() => {
    const object = {
        name: "Sample Voice 1",
        typeId: "67504ab528d5a3e61d87dbe6",
        languageId: "67504ab528d5a3e61d87dbe0",
        deviceProfileId: "67504ab528d5a3e61d87dbe4",
        gender: "Male",
        age: 30,
        fileName: "sample_voice_1.mp3",
        fileContent: file_content_1,
        fileType: "audio/mpeg"
    }
    await axios.post('http://localhost:5000/api/voices',object)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
}
sendreq();