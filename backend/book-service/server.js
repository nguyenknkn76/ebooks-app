const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');

const BookService = require('./services/bookService');
const AuthorService = require('./services/authorService');
const MediaFileService = require('./services/mediaFileService');
const ChapterService = require('./services/chapterService');
const CommentService = require('./services/commentService');
const RatingService = require('./services/ratingService');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;
const connectDB = require('./config/db');
require('dotenv').config();
connectDB();

const server = new grpc.Server();

server.addService(bookProto.BookService.service, { 
  CreateBook: BookService.createBook,
  //! get all books still bug ~ can't populate author, cover image
  GetAllBooks: BookService.getAllBooks,
  // GetBookById: BookService.getBookById,

  CreateAuthor: AuthorService.createAuthor,
  GetAllAuthors: AuthorService.getAllAuthors,
  GetAuthorById: AuthorService.getAuthorById,

  UploadMediaFile: MediaFileService.uploadMediaFile,
  CreateChapter: ChapterService.createChapter,
  GetAllChapters: ChapterService.getAllChapters,
  GetChaptersByBookId: ChapterService.getChaptersByBookId,
  GetChapterById: ChapterService.getChapterById,

  CreateComment: CommentService.createComment,

  CreateRating: RatingService.createRating,
});
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50053');
});
