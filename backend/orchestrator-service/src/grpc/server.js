const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const sagaHandler = require('./handlers/sagaHandler');

const PROTO_PATH = './src/grpc/protos/saga.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const sagaProto = grpc.loadPackageDefinition(packageDefinition).saga;

const startGrpcServer = async () => {
  const server = new grpc.Server();
  
  server.addService(sagaProto.SagaService.service, {
    RecommendVoice: sagaHandler.recommendVoice
  });

  server.bindAsync('0.0.0.0:50059', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running at http://0.0.0.0:50059');
    // server.start();
  });
};

module.exports = { startGrpcServer };