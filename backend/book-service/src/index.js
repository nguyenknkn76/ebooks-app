require('./grpc/server');
const saga = require('./sagas/index');

// const aws = require('../config');
const express = require('express');
const app = express();
app.use(express.json());

(async () => {
  saga.startSagas();
})();

app.listen(3000, () => {
  console.log('Book Service running on port 3000');
});


