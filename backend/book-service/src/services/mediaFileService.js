const MediaFile = require('../models/mediaFile');
// const s3 = require('./config/aws');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../../config/aws');
require('dotenv').config();

const getMediaFileById = async (id) => {
  return await MediaFile.findById(id);
};

const createMediaFile = async (data) => {
  const { file_collection, file_url, file_type, file_size } = data;
  const mediaFile = new MediaFile({
    file_collection,
    file_url,
    file_type,
    file_size
  });
  return await mediaFile.save();
};

const uploadMediaFile = async (call, callback) => {
  try {
    const { file_name, file_content, file_type } = call.request;
    const fileProps = {
      bucket_name: process.env.AWS_BUCKET_NAME,
      file_name: file_name,
      file_content: file_content,
      file_type: file_type,
    }
    const fileUrl = await uploadMediaFile2(fileProps); 
    // const params = {
    //   Bucket: process.env.AWS_BUCKET_NAME, 
    //   Key: file_name,
    //   Body: Buffer.from(file_content, 'base64'), 
    //   ContentType: file_type, 
    //   // ACL: 'public-read', 
    // };
    // // send command upload to s3
    // const uploadResult = await s3Client.send(new PutObjectCommand(params));

    // const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_name}`;

    callback(null, { file_url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    callback(error);
  }
};

const uploadMediaFile2 = (props) => {
  try {
    const {bucket_name ,file_name, file_content, file_type} = props;
    const params = {
      Bucket: bucket_name, 
      Key: file_name,
      Body: Buffer.from(file_content, 'base64'), 
      ContentType: file_type, 
    };
    const uploadResult = s3Client.send(new PutObjectCommand(params));
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_name}`;
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file to S3 ~ uploadMediaFile func mediaFileService:', error);
  }
}

module.exports = {uploadMediaFile, uploadMediaFile2, getMediaFileById, createMediaFile}