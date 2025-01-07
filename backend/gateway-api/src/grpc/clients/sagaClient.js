const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/saga.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const sagaProto = grpc.loadPackageDefinition(packageDefinition).saga;

const client = new sagaProto.VoiceService('localhost:50059', grpc.credentials.createInsecure());



