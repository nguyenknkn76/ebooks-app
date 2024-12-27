const MediaFile = require('../models/mediaFile');
const { uploadMediaFile2 } = require('../utils/upload');

const createMediaFile = async (fileData, file) => {
  try {
    let fileUrl;
    if (file) {
      fileUrl = await uploadMediaFile2({
        bucket_name: process.env.AWS_BUCKET_NAME_SAMPLE_VOICE,
        file_name: file.originalname,
        file_content: file.buffer,
        file_type: file.mimetype
      });
    }

    const mediaFile = new MediaFile({
      file_collection: fileData.file_collection,
      file_url: fileUrl,
      file_type: file?.mimetype,
      file_size: file?.size
    });

    return await mediaFile.save();
  } catch (error) {
    throw new Error(`Error creating media file: ${error.message}`);
  }
};

const getAllMediaFiles = async () => {
  return await MediaFile.find();
};

const getMediaFileById = async (id) => {
  return await MediaFile.findById(id);
};

const updateMediaFile = async (id, fileData) => {
  return await MediaFile.findByIdAndUpdate(id, fileData, { new: true });
};

const deleteMediaFile = async (id) => {
  return await MediaFile.findByIdAndDelete(id);
};

module.exports = {
  createMediaFile,
  getAllMediaFiles,
  getMediaFileById,
  updateMediaFile,
  deleteMediaFile
};