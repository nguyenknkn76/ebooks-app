const saga = require('./sagas/index');

const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  saga.startSagas();

  app.listen(3004, ()=> {
    console.log('Recommendation Service runing on port 3004');
  })
}

module.exports = {runApp};