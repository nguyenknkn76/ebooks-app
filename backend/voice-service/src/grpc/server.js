const DBConfig = require('../../config/db');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const VoiceHandler = require('./handlers/voiceHandler');
const AgeHandler = require('./handlers/ageHandler');
const DeviceProfileHandler = require('./handlers/deviceProfileHandler');
const LanguageHandler = require('./handlers/languageHandler');
const TypeHandler = require('./handlers/typeHandler');
const MediaFileHandler = require('./handlers/mediaFileHandler');
DBConfig.connectDB();

const PROTO_PATH = './src/grpc/protos/voice.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const voiceProto = grpc.loadPackageDefinition(packageDefinition).voice;
require('dotenv').config();

const server = new grpc.Server();
const startGrpcServer = async () => {
  server.addService(voiceProto.VoiceService.service, { 
    CreateAge: AgeHandler.createAge,
    GetAllAges: AgeHandler.getAllAges,
    GetAgeById: AgeHandler.getAgeById,

    CreateDeviceProfile: DeviceProfileHandler.createDeviceProfile,
    GetAllDeviceProfiles: DeviceProfileHandler.getAllDeviceProfiles,
    GetDeviceProfileById: DeviceProfileHandler.getDeviceProfileById,

    CreateType: TypeHandler.createType,
    GetAllTypes: TypeHandler.getAllTypes,
    GetTypeById: TypeHandler.getTypeById,

    CreateLanguage: LanguageHandler.createLanguage,
    GetAllLanguages: LanguageHandler.getAllLanguages,
    GetLanguageById: LanguageHandler.getLanguageById,

    CreateVoice: VoiceHandler.createVoice,
    GetAllVoices: VoiceHandler.getAllVoices,
    GetAllVoices2: VoiceHandler.getAllVoices2,
    GetVoiceById: VoiceHandler.getVoiceById,
    DeleteVoice: VoiceHandler.deleteVoice,

    CreateAudioFiles: MediaFileHandler.createAudioFiles,

    CountVoices: VoiceHandler.countVoices,
    GetGgcVoiceName: VoiceHandler.getGgcVoiceName

  });
  
  server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Voice Service gRPC server running at http://0.0.0.0:50052");
  });
}

module.exports = {startGrpcServer};

