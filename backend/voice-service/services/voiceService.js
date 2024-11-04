const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Voice = require('../models/voice');
const Language = require('../models/language');
const DeviceProfile = require('../models/deviceProfile');
const MediaFile = require('../models/mediaFile');
const Type = require('../models/type');
const PROTO_PATH = './protos/voice.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const voiceProto = grpc.loadPackageDefinition(packageDefinition).VoiceService;

const getVoices = async (call, callback) => {
    try {
      const voices = await Voice.find().populate('type_id language_id device_profile_id sample_voice_id');
      callback(null, { voices });
    } catch (error) {
      callback(error);
    }
  };

const startGrpcServer = () => {
  const server = new grpc.Server();
  server.addService(voiceProto.service, { GetVoices: getVoices });
  server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Voice Service gRPC server running at http://0.0.0.0:50052");
    // server.start();
  });
};

module.exports = startGrpcServer;
