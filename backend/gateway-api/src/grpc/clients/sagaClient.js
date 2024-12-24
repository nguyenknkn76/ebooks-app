const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/saga.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const sagaProto = grpc.loadPackageDefinition(packageDefinition).saga;

const client = new sagaProto.VoiceService('localhost:50055', grpc.credentials.createInsecure());

exports.getInfoSaga = () =>
  new Promise((resolve, reject) => {
    client.GetInfoSaga(null, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

