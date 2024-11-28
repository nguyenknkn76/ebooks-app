const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');

// const Book = require('./models/Book');
// const Author = require('./models/Author');
// const MediaFile = require('./models/mediaFile');
// const Chapter = require('./models/chapter');
// const Comment = require('./models/comment');
const BookService = require('./services/bookService');
const AuthorService = require('./services/authorService');
const MediaFileService = require('./services/mediaFileService');
const ChapterService = require('./services/chapterService');
const CommentService = require('./services/commentService');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;
const connectDB = require('./config/db');
// const s3 = require('./config/aws');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const s3Client = require('./config/aws');
// console.log(s3Client);
require('dotenv').config();
connectDB();

const server = new grpc.Server();

server.addService(bookProto.BookService.service, { 
  CreateBook: BookService.createBook,
  CreateAuthor: AuthorService.createAuthor,

  UploadMediaFile: MediaFileService.uploadMediaFile,
});
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50053');
});
