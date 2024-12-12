const DBConfig = require('../../config/db');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const VoiceService = require('../services/voiceService');
DBConfig.connectDB();

// const KafkaHandler = require('./src/kafka/index');
const PROTO_PATH = './src/grpc/protos/voice.proto';

// const saga = require('../sagas/index');
// saga.startSagas();

const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const voiceProto = grpc.loadPackageDefinition(packageDefinition).voice;
require('dotenv').config();

// KafkaHandler.startKafkaConsumer();
const server = new grpc.Server();
const startGrpcServer = async () => {
  server.addService(voiceProto.VoiceService.service, { 
    GetVoices: VoiceService.getVoices,
    CreateVoice: VoiceService.createVoice,
    GetAllVoices: VoiceService.getAllVoices,
    GetVoiceById: VoiceService.getVoiceById,
  });
  
  server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Voice Service gRPC server running at http://0.0.0.0:50052");
  });
}

module.exports = {startGrpcServer};

