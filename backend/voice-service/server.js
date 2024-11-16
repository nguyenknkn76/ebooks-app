require('dotenv').config();
const { connectDB } = require('./config/db');
// const startGrpcServer = require('./services/voiceService');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// const Voice = require('../models/voice');
// const Language = require('../models/language');
// const DeviceProfile = require('../models/deviceProfile');
// const MediaFile = require('../models/mediaFile');
// const Type = require('../models/type');
const {getVoices} = require('./services/voiceService');
const PROTO_PATH = './protos/voice.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const voiceProto = grpc.loadPackageDefinition(packageDefinition).VoiceService;

const startGrpcServer = () => {
  const server = new grpc.Server();
  server.addService(voiceProto.service, { 
    GetVoices: getVoices,
  });
  server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Voice Service gRPC server running at http://0.0.0.0:50052");
  });
};
connectDB();
startGrpcServer();