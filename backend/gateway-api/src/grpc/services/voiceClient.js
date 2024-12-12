const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/voice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const voiceProto = grpc.loadPackageDefinition(packageDefinition).voice;

const client = new voiceProto.VoiceService('localhost:50052', grpc.credentials.createInsecure());

exports.getVoiceById = (id) =>
  new Promise((resolve, reject) => {
    client.GetVoiceById({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getVoices = () => {
  return new Promise((resolve, reject) => {
    client.GetVoices({}, (error, response) => {
      if (error) reject(error);
      else resolve(response.voices);
    });
  });
};

exports.createVoice = (voiceData) =>
  new Promise((resolve, reject) => {
    client.CreateVoice(voiceData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getAllVoices = () =>
  new Promise((resolve, reject) => {
    client.GetAllVoices({}, (error, response) => {
      if (error) return reject(error);
      resolve(response.voices);
    });
  });