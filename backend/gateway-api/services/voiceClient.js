const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = '../voice-service/protos/voice.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const voiceProto = grpc.loadPackageDefinition(packageDefinition).VoiceService;
const client = new voiceProto('localhost:50052', grpc.credentials.createInsecure());

exports.getVoices = () => {
  return new Promise((resolve, reject) => {
    client.GetVoices({}, (error, response) => {
      if (error) reject(error);
      else resolve(response.voices);
    });
  });
};
