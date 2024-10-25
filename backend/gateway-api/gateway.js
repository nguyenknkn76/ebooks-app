require('dotenv').config();
const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('saga.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const sagaProto = grpc.loadPackageDefinition(packageDefinition).saga;

const app = express();
const port = 3000;

// Kết nối gRPC tới Orchestrator
const orchestratorClient = new sagaProto.OrchestratorService(
  `${process.env.ORCHESTRATOR_HOST}:${process.env.ORCHESTRATOR_PORT}`,
  grpc.credentials.createInsecure()
);

// Route bắt đầu Saga
app.get('/start-saga', (req, res) => {
  orchestratorClient.StartSaga({ orderId: '12345' }, (err, response) => {
    if (err) return res.status(500).send(err.message);
    res.send(response);
  });
});

app.listen(port, () => {
  console.log(`Gateway API running at http://localhost:${port}`);
});
