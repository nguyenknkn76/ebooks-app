const MediaFile = require('../models/mediaFile');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/aws');

const createMediaFile = async (call, callback) => {
  try {
    const { file_collection, file_url, file_type, file_size } = call.request;
    const mediaFile = new MediaFile({
      file_collection,
      file_url,
      file_type,
      file_size,
    });
    const savedMediaFile = await mediaFile.save();
    callback(null, {
      id: savedMediaFile.id,
      file_collection: savedMediaFile.file_collection,
      file_url: savedMediaFile.file_url,
      file_type: savedMediaFile.file_type,
      file_size: savedMediaFile.file_size,
    });
  } catch (error) {
    console.error('Error creating media file:', error);
    callback(error);
  }
};

const uploadMediaFile = async (call, callback) => {
  try {
    const { file_name, file_content, file_type } = call.request;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file_name,
      Body: Buffer.from(file_content, 'base64'),
      ContentType: file_type,
    };
    const uploadResult = await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_name}`;
    callback(null, { file_url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    callback(error);
  }
};

module.exports = { createMediaFile, uploadMediaFile };
