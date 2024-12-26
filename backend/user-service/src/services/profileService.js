const { Profile, MediaFile } = require('../models');

const createProfile = async (data) => {
  return await Profile.create(data);
};

const getAllProfiles = async () => {
  return await Profile.findAll({
    include: [MediaFile]
  });
};

const getProfileById = async (id) => {
  return await Profile.findByPk(id, {
    include: [MediaFile]
  });
};

const getProfileByUserId = async (userId) => {
  return await Profile.findOne({
    where: { user: userId },
    include: [MediaFile]
  });
};

const updateProfile = async (id, data) => {
  const profile = await Profile.findByPk(id);
  if (!profile) throw new Error('Profile not found');
  return await profile.update(data);
};

const deleteProfile = async (id) => {
  const profile = await Profile.findByPk(id);
  if (!profile) throw new Error('Profile not found');
  return await profile.destroy();
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileByUserId,
  updateProfile,
  deleteProfile
};