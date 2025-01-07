const MediaFile = require('../models/mediaFile');

const createMediaFile = async (fileData) => {
  const mediaFile = new MediaFile(fileData);
  return await mediaFile.save();
};

const getMediaFileById = async (id) => {
  return await MediaFile.findById(id);
};

const deleteMediaFile = async (id) => {
  return await MediaFile.findByIdAndDelete(id);
};

module.exports = {
  createMediaFile,
  getMediaFileById,
  deleteMediaFile
};