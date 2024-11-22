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
const file_path_2 = './samples/longcontent.txt';
const file_content = fs.readFileSync(file_path_2, 'base64');
const sendreq = async() => {
    const object = {
        file_name: "longcontent.txt",
        file_content: file_content,
        file_type: "text/plain"
    }
    await axios.post('http://localhost:5000/api/books/mediafiles/upload',object)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
}
sendreq();