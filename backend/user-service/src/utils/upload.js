const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../../config/aws');
require('dotenv').config();

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

module.exports = {uploadMediaFile2}