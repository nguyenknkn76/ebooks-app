const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const GenreHandler = require('./handlers/genreHandler');
const AuthorHandler = require('./handlers/authorHandler');
const BookHandler = require('./handlers/bookHandler');
const MediaFileHandler = require('./handlers/mediaFileHandler');
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
    CreateAuthor: AuthorHandler.createAuthor,
    GetAllAuthors: AuthorHandler.getAllAuthors,
    GetAuthorById: AuthorHandler.getAuthorById,
    
    CreateGenre: GenreHandler.createGenre,
    GetAllGenres: GenreHandler.getAllGenres,
    GetGenreById: GenreHandler.getGenreById,
    
    CreateBook: BookHandler.createBook,
    GetAllBooks: BookHandler.getAllBooks,
    GetBookById: BookHandler.getBookById,
    GetBooksByMonthly: BookHandler.getBooksByMonthly,
    GetBooksByViews: BookHandler.getBooksByViews,
    GetBooksByCreatedTime: BookHandler.getBooksByCreatedTime,
    GetBooksByUpdatedTime: BookHandler.getBooksByUpdatedTime,

    CreateBookWithCover: BookHandler.createBookWithCover,
    UpdateBook: BookHandler.updateBook,

    CreateChapter: ChapterHandler.createChapter,
    GetChapterById: ChapterHandler.getChapterById,
    GetChaptersByBookId: ChapterHandler.getChaptersByBookId,
    UpdateChapter: ChapterHandler.updateChapter,
    UpdateChapter2: ChapterHandler.updateChapter2,

    CreateComment: CommentHandler.createComment,
    GetCommentsByChapterId: CommentHandler.getCommentsByChapterId,
    
    CreateRating: RatingHandler.createRating,
    GetRatingsByBookId: RatingHandler.getRatingsByBookId,

    CreateLibrary: LibraryHandler.createLibrary,
    GetLibrariesByUserId: LibraryHandler.getLibrariesByUserId,
    UpdateLibrary: LibraryHandler.updateLibrary,
    DeleteLibrary: LibraryHandler.deleteLibrary,
    GetLibraryById: LibraryHandler.getLibraryById,
    
    CreateHistory: HistoryHandler.createHistory,
    GetAllHistories: HistoryHandler.getAllHistories,
    GetHistoriesByUserId: HistoryHandler.getHistoriesByUserId,
    GetHistoriesByBookId: HistoryHandler.getHistoriesByBookId,
    GetMostUsedVoiceFromHistories: HistoryHandler.getMostUsedVoiceFromHistories,
    GetLastUsedVoiceFromHistories: HistoryHandler.getLastUsedVoiceFromHistories,
    
    CountBooks: BookHandler.countBooks ,
    CountBooksThisMonth: BookHandler.countBooksThisMonth, 
    GetTotalBooksInTwelveMonths: BookHandler.getTotalBooksInTwelveMonths,
    GetHistoriesBooksByUserId: HistoryHandler.getHistoriesBooksByUserId,
  });
  
  server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50053');
  });
}
module.exports = {startGrpcServer};
