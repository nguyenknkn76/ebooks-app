const MediaFile = require('../models/mediaFile');

exports.uploadMediaFile = async (req, res) => {
  try {
    // URL file từ S3 sau khi upload
    const fileUrl = req.file.location;

    // Lưu thông tin file vào MongoDB
    const mediaFile = new MediaFile({
      file_collection: req.body.file_collection,
      file_url: fileUrl,
      file_type: req.file.mimetype,
      file_size: req.file.size,
    });

    const savedMediaFile = await mediaFile.save();
    res.status(201).json({
      message: 'Media file uploaded and saved successfully',
      mediaFile: savedMediaFile,
    });
  } catch (error) {
    console.error('Error uploading media file:', error);
    res.status(500).json({ message: 'Failed to upload media file', error });
  }
};
