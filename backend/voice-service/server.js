const DBConfig = require('./config/db');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const VoiceService = require('./services/voiceService');
// const KafkaHandler = require('./src/kafka/index');
const PROTO_PATH = './protos/voice.proto';

const saga = require('./src/sagas/index');
saga.startSagas();

const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const voiceProto = grpc.loadPackageDefinition(packageDefinition).voice;
require('dotenv').config();

DBConfig.connectDB();
// KafkaHandler.startKafkaConsumer();

const server = new grpc.Server();
server.addService(voiceProto.VoiceService.service, { 
  GetVoices: VoiceService.getVoices,
  CreateVoice: VoiceService.createVoice,
  GetAllVoices: VoiceService.getAllVoices,
  GetVoiceById: VoiceService.getVoiceById,
});

server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log("Voice Service gRPC server running at http://0.0.0.0:50052");
});
