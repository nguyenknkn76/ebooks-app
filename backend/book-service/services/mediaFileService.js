const MediaFile = require('../models/mediaFile');
// const s3 = require('./config/aws');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/aws');
require('dotenv').config();

const fileNaming = async (call, callback) => {
  
}
const uploadMediaFile = async (call, callback) => {
  try {
    const { file_name, file_content, file_type } = call.request;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: file_name,
      Body: Buffer.from(file_content, 'base64'), 
      ContentType: file_type, 
      // ACL: 'public-read', 
    };
    // send command upload to s3
    const uploadResult = await s3Client.send(new PutObjectCommand(params));

    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_name}`;

    callback(null, { file_url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    callback(error);
  }
};

module.exports = {uploadMediaFile}