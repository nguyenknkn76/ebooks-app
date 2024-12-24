const DeviceProfile = require('../models/deviceProfile');

const createDeviceProfile = async (data) => {
  const deviceProfile = new DeviceProfile(data);
  return await deviceProfile.save();
};

const getAllDeviceProfiles = async () => {
  return await DeviceProfile.find();
};

const getDeviceProfileById = async (id) => {
  return await DeviceProfile.findById(id);
};

const updateDeviceProfile = async (id, data) => {
  return await DeviceProfile.findByIdAndUpdate(id, data, { new: true });
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