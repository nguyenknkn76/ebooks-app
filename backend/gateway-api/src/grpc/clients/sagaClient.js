const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/saga.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const sagaProto = grpc.loadPackageDefinition(packageDefinition).saga;

const client = new sagaProto.SagaService('localhost:50059', grpc.credentials.createInsecure());

const recommendVoice = (data) => {
  return new Promise((resolve, reject) => {
    client.RecommendVoice(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

module.exports = { recommendVoice };
