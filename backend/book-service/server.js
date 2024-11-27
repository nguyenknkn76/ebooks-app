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
// const s3Client = require('../config/aws');
require('dotenv').config();
connectDB();

const server = new grpc.Server();

server.addService(bookProto.BookService.service, { 
  CreateBook: BookService.createBook,
  CreateAuthor: AuthorService.createAuthor,
  CreateMediaFile: MediaFileService.createMediaFile,
  UploadMediaFile: MediaFileService.uploadMediaFile,

  CreateChapter: ChapterService.createChapter,
  GetAllChapters: ChapterService.getAllChapters,
  GetChaptersByBookId: ChapterService.getChaptersByBookId,
  GetChapterById: ChapterService.getChapterById,
  //! func edit chapter still bug
  // EditChapter: ChapterService.editChapter,
  CreateComment: CommentService.createComment,
  // AddAudioFile: addAudioFile
});
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50053');
  // server.start();
});


// const addAudioFile = async (call, callback) => {
//   const { chapter_id, file_name, file_content, file_type, file_size } = call.request;

//   try {
//     // check chapter
//     const chapter = await Chapter.findById(chapter_id);
//     if (!chapter) {
//       return callback({
//         code: 404,
//         message: 'Chapter not found',
//       });
//     }

//     // Upload file to s3
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `audio/${Date.now()}_${file_name}`,
//       Body: Buffer.from(file_content, 'base64'),
//       ContentType: file_type,
//     };

//     const s3Response = await s3Client.upload(params).promise();

//     // create new media file
//     const newMediaFile = new MediaFile({
//       file_collection: 'audio',
//       file_url: s3Response.Location,
//       file_type,
//       file_size,
//     });

//     await newMediaFile.save();

//     // add file to list audio_file of chapter
//     chapter.audio_file.push(newMediaFile._id);
//     await chapter.save();

//     // return res
//     const response = {
//       media_file_id: newMediaFile._id.toString(),
//       chapter_id: chapter_id,
//       file_url: s3Response.Location,
//     };

//     callback(null, response);
//   } catch (error) {
//     console.error('Error adding audio file:', error);
//     callback({
//       code: 500,
//       message: 'Internal server error',
//     });
//   }
// };