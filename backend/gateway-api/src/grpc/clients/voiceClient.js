const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/voice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const voiceProto = grpc.loadPackageDefinition(packageDefinition).voice;

const client = new voiceProto.VoiceService('localhost:50052', grpc.credentials.createInsecure());

const createAge = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateAge(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createDeviceProfile = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateDeviceProfile(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createLanguage = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateLanguage(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createType = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateType(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllLanguages = () => {
  return new Promise((resolve, reject) => {
    client.GetAllLanguages({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getLanguageById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetLanguageById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllAges = () => {
  return new Promise((resolve, reject) => {
    client.GetAllAges({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAgeById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetAgeById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllDeviceProfiles = () => {
  return new Promise((resolve, reject) => {
    client.GetAllDeviceProfiles({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getDeviceProfileById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetDeviceProfileById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllTypes = () => {
  return new Promise((resolve, reject) => {
    client.GetAllTypes({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getTypeById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetTypeById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

module.exports = { 
  createType,
  createAge,
  createDeviceProfile, 
  createLanguage,
  getAllLanguages,
  getLanguageById,
  getAllAges,
  getAgeById, 
  getAllDeviceProfiles,
  getDeviceProfileById,
  getAllTypes,
  getTypeById
};