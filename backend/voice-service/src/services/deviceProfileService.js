const DeviceProfile = require('../models/deviceProfile');

const createDeviceProfile = async (deviceData) => {
  const deviceProfile = new DeviceProfile(deviceData);
  return await deviceProfile.save();
};

const getAllDeviceProfiles = async () => {
  return await DeviceProfile.find();
};

const getDeviceProfileById = async (id) => {
  return await DeviceProfile.findById(id);
};

const updateDeviceProfile = async (id, deviceData) => {
  return await DeviceProfile.findByIdAndUpdate(id, deviceData, { new: true });
};

const deleteDeviceProfile = async (id) => {
  return await DeviceProfile.findByIdAndDelete(id);
};

module.exports = {
  createDeviceProfile,
  getAllDeviceProfiles,
  getDeviceProfileById,
  updateDeviceProfile,
  deleteDeviceProfile
};