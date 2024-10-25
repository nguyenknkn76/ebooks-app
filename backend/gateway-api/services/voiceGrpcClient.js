const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './protos/voice.proto'
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });

const voiceProto = grpc.loadPackageDefinition(packageDefinition).VoiceService;

const voiceClient = new voiceProto('localhost:50051', grpc.credentials.createInsecure());

module.exports = voiceClient;
