const { MediaFile } = require('../models');

const createMediaFile = async (data) => {
  return await MediaFile.create(data);
};

const getAllMediaFiles = async () => {
  return await MediaFile.findAll();
};

const getMediaFileById = async (id) => {
  return await MediaFile.findByPk(id);
};

const getMediaFileByProfileId = async (profileId) => {
  return await MediaFile.findOne({
    where: { profile: profileId }
  });
};

const updateMediaFile = async (id, data) => {
  const mediaFile = await MediaFile.findByPk(id);
  if (!mediaFile) throw new Error('Media file not found');
  return await mediaFile.update(data);
};

const deleteMediaFile = async (id) => {
  const mediaFile = await MediaFile.findByPk(id);
  if (!mediaFile) throw new Error('Media file not found');
  return await mediaFile.destroy();
};

module.exports = {
  createMediaFile,
  getAllMediaFiles,
  getMediaFileById,
  getMediaFileByProfileId,
  updateMediaFile,
  deleteMediaFile
};