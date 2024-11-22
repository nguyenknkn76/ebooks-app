const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author')
const MediaFile = require('./models/mediaFile');
const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;
const connectDB = require('./config/db');
// const s3 = require('./config/aws');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('./config/aws');

require('dotenv').config();

connectDB();
const createBook = async (call, callback) => {
  try {
    const { title, author, genres, description, publish_year } = call.request;

    const book = new Book({
      title,
      author,
      genres,
      description,
      publish_year,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedBook = await book.save();
    callback(null, { id: savedBook.id, title: savedBook.title, author: savedBook.author });
  } catch (error) {
    console.error('Error creating book:', error);
    callback(error);
  }
};

const createAuthor = async (call, callback) => {
  try {
    const { user, pen_name, name, description } = call.request;

    const author = new Author({
      user,
      pen_name,
      name,
      description,
    });

    const savedAuthor = await author.save();
    callback(null, {
      id: savedAuthor.id,
      user: savedAuthor.user,
      pen_name: savedAuthor.pen_name,
      name: savedAuthor.name,
      description: savedAuthor.description,
    });
  } catch (error) {
    console.error('Error creating author:', error);
    callback(error);
  }
};

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

const server = new grpc.Server();
server.addService(bookProto.BookService.service, { 
  CreateBook: createBook,
  CreateAuthor: createAuthor,
  CreateMediaFile: createMediaFile,
  UploadMediaFile: uploadMediaFile,

});
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50053');
  // server.start();
});
