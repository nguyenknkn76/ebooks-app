const grpcServer = require('./grpc/server');
const saga = require('./sagas/index');

const express = require('express');
const app = express();
app.use(express.json());

const runApp = async () => {
  saga.startSagas();
  grpcServer.startGrpcServer();

  app.listen(3002, ()=> {
    console.log('User Service runing on port 3002');
  })
}

module.exports = {runApp};