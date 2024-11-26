const axios = require('axios');

const sendreq = async () => {
    await axios.post('http://localhost:3000/start-saga/')
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
}

sendreq();