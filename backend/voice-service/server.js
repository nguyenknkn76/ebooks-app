const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
// const AWS = require('aws-sdk');
const Voice = require('./models/Voice');
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

// S3 Localstack configuration
// const s3 = new AWS.S3({
//   endpoint: 'http://localhost:4566', // Localstack S3 URL
//   s3ForcePathStyle: true,
// });

const PROTO_PATH = './protos/voice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const voiceProto = grpc.loadPackageDefinition(packageDefinition).voice;

const voices = [
    { id: '1', name: 'Voice A', language: 'English', device_profile: 'Mobile', type: 'Male', sample_voice_url: 'http://example.com/sample1.mp3' },
    { id: '2', name: 'Voice B', language: 'French', device_profile: 'Desktop', type: 'Female', sample_voice_url: 'http://example.com/sample2.mp3' }
  ];
// if (!voiceProto) {
//     console.error("Failed to load VoiceService from .proto file");
//     process.exit(1);
// }
// console.log('voice proto load success', voiceProto)

// Fetch voice data from MongoDB and construct S3 URL
async function getVoiceById(call, callback) {
  try {
    console.log('try to get voice info')

    // const voice = await Voice.findById(call.request.id)
    //   .populate('language_id')
    //   .populate('device_profile_id')
    //   .populate('type_id');

    // if (!voice) {
    //   return callback({ code: grpc.status.NOT_FOUND, message: 'Voice not found' });
    // }

    // const sampleVoiceUrl = s3.getSignedUrl('getObject', {
    //   Bucket: 'your-bucket',
    //   Key: voice.sample_voice,
    //   Expires: 60 * 5, // URL valid for 5 minutes
    // });

    // callback(null, {
    //   id: voice._id.toString(),
    //   name: voice.name,
    //   language: voice.language_id.language,
    //   device_profile: voice.device_profile_id.name,
    //   type: voice.type_id.type,
    //   sample_voice_url: sampleVoiceUrl,
    // });
  } catch (error) {
    console.error('Error fetching voice:', error);
    callback({ code: grpc.status.INTERNAL, message: 'Error fetching voice' });
  }
}

// Start gRPC server
const server = new grpc.Server();

server.addService(voiceProto.VoiceService.service, { 
    GetVoiceById: getVoiceById
});

server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Voice Service running on port 50052');
//   server.start();
});
