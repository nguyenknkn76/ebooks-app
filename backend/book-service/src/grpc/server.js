const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const BookHandler = require('./handlers/bookHandler');
const AuthorHandler = require('./handlers/authorHandler');
const MediaFileService = require('../services/mediaFileService');
const ChapterHandler = require('./handlers/chapterHandler');
const CommentHandler = require('./handlers/commentHandler');
const RatingHandler = require('./handlers/ratingHandler');
const LibraryHandler = require('./handlers/libraryHandler');
const HistoryHandler = require('./handlers/historyHandler');

const PROTO_PATH = './src/grpc/protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;
const connectDB = require('../../config/db');
require('dotenv').config();
connectDB();

const startGrpcServer = async () => {
  const server = new grpc.Server();
  server.addService(bookProto.BookService.service, { 
    CreateBook: BookHandler.createBook,
    GetAllBooks: BookHandler.getAllBooks,
    GetBookById: BookHandler.getBookById,
  
    CreateAuthor: AuthorHandler.createAuthor,
    GetAllAuthors: AuthorHandler.getAllAuthors,
    GetAuthorById: AuthorHandler.getAuthorById,
  
    UploadMediaFile: MediaFileService.uploadMediaFile,
    CreateChapter: ChapterHandler.createChapter,
    GetAllChapters: ChapterHandler.getAllChapters,
    GetChaptersByBookId: ChapterHandler.getChaptersByBookId,
    GetChapterById: ChapterHandler.getChapterById,
  
    CreateComment: CommentHandler.createComment,
  
    CreateRating: RatingHandler.createRating,
  
    CreateLibrary: LibraryHandler.createLibrary,
    GetAllLibraries: LibraryHandler.getAllLibraries,
    GetLibraryById: LibraryHandler.getLibraryById,
    GetLibrariesByUserId: LibraryHandler.getLibrariesByUserId,
  
    CreateHistory: HistoryHandler.createHistory,
    GetAllHistories: HistoryHandler.getAllHistories,
    GetHistoryById: HistoryHandler.getHistoryById,
    GetHistoriesByUserId: HistoryHandler.getHistoriesByUserId,
  });
  
  server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50053');
  });
}
module.exports = {startGrpcServer};
