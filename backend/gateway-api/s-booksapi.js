const axios = require('axios');
const fs = require('fs');

//! test upload file to s3 
// const file_path = './samples/61f5c0ce09af804244202d795a09884d.jpg';
// const file_path_2 = './samples/6aa44207d65b3c18071bbbe755c36149.jpg';
// const file_content = fs.readFileSync(file_path_2, 'base64');
// const sendreq = async() => {
//     const object = {
//         file_name: "nan-nan.jpg",
//         file_content: file_content,
//         file_type: "image/jpeg"
//     }
//     await axios.post('http://localhost:5000/api/books/mediafiles/upload',object)
//         .then(res => console.log(res.data));
// }

// const file_path_2 = './samples/longcontent.txt';
// const file_content = fs.readFileSync(file_path_2, 'base64');
// const sendreq = async() => {
//     const object = {
//         file_name: "longcontent.txt",
//         file_content: file_content,
//         file_type: "text/plain"
//     }
//     await axios.post('http://localhost:5000/api/books/mediafiles/upload',object)
//         .then(res => console.log(res.data))
//         .catch(err => console.error(err));
// }
// sendreq();

// const file_path_1 = './samples/rfiu.mp3'
// const file_path_2 = './samples/longcontent.txt';
// const file_content_1 = fs.readFileSync(file_path_1, 'base64');
// const file_content_2 = fs.readFileSync(file_path_2, 'base64');

// const sendreq = async() => {
//     const object = {
//         name: "Chapter n3",
//         book_id: "67405659dfe3478b3de8f36c",
//         audio_file_name: "river flows in you.mp3",
//         audio_file_content: file_content_1,
//         // audio_file_type: "audio/mpeg",
//         text_file_name: "river flows in you.mp3",
//         text_file_content: file_content_2,
//         // text_file_type: "text/plain"
//     }
//     await axios.post('http://localhost:5000/api/books/chapters',object)
//         .then(res => console.log(res.data))
//         .catch(err => console.error(err));
// }
// sendreq();


const file_path_1 = './samples/rfiu.mp3'
const file_content_1 = fs.readFileSync(file_path_1, 'base64');

const sendreq = async() => {
    const object = {
        // name: "Chapter n3",
        // book_id: "67405659dfe3478b3de8f36c",
        audio_file_name: "river flows in you.mp3",
        audio_file_content: file_content_1,
        // audio_file_type: "audio/mpeg",
    }
    await axios.post('http://localhost:5000/api/books/chapters/674354680dc06ae1b52310a3/audio_files',object)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
}
sendreq();