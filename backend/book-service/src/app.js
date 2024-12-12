const grpcServer = require('./grpc/server');
const saga = require('./sagas/index');

const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  saga.startSagas();
  grpcServer.startGrpcServer();

  app.listen(3000, () => {
    console.log('Book Service running on port 3000');
  });
}

module.exports = {runApp}




