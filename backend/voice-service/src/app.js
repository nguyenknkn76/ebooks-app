const grpcServer = require('./grpc/server');
const saga = require('./sagas/index');

const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  // saga.startSagas();
  grpcServer.startGrpcServer();

  app.listen(3001, () => {
    console.log('Vocie Service running on port 3001');
  });
}

module.exports = {runApp}