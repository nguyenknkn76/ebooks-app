const mediaFileClient = require('../grpc/services/bookClient');

exports.createMediaFile = async (req, res) => {
    try {
        const mediaFileData = req.body; 
        const response = await mediaFileClient.createMediaFile(mediaFileData); 
        res.status(201).json({ message: 'Media file created successfully', mediaFile: response });
    } catch (error) {
        console.error('Error creating media file:', error);
        res.status(500).json({ message: 'Failed to create media file', error });
    }
};

exports.uploadMediaFile = async (req, res) => {
  try {
    const { file_name, file_content, file_type } = req.body;

    const response = await mediaFileClient.uploadMediaFile({ file_name, file_content, file_type });

    res.status(201).json({ message: 'File uploaded successfully', file_url: response.file_url });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file', error });
  }
};
  