const grpc = require('@grpc/grpc-js');
const deviceProfileService = require('../../services/deviceProfileService');

const createDeviceProfile = async (call, callback) => {
  try {
    const { casual_name, name, description } = call.request;

    const deviceProfile = await deviceProfileService.createDeviceProfile({
      casual_name,
      name,
      description
    });

    callback(null, {
      id: deviceProfile._id.toString(),
      casual_name: deviceProfile.casual_name,
      name: deviceProfile.name,
      description: deviceProfile.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllDeviceProfiles = async (call, callback) => {
  try {
    const profiles = await deviceProfileService.getAllDeviceProfiles();
    callback(null, {
      device_profiles: profiles.map(profile => ({
        id: profile._id.toString(),
        casual_name: profile.casual_name,
        name: profile.name,
        description: profile.description
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getDeviceProfileById = async (call, callback) => {
  try {
    const profile = await deviceProfileService.getDeviceProfileById(call.request.id);
    
    if (!profile) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Device profile not found'
      });
    }

    callback(null, {
      id: profile._id.toString(),
      casual_name: profile.casual_name,
      name: profile.name,
      description: profile.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = { 
  createDeviceProfile,
  getAllDeviceProfiles,
  getDeviceProfileById
};