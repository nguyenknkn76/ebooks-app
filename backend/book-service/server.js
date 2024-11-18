const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');

const {getBookById, getBooks} = require('./services/bookService');
const {getAuthorById, getAuthors} = require('./services/authorService');
const {getChapterById, getChaptersByBookId} = require('./services/chapterService');
const {createComment, getCommentsByChapterId} = require('./services/commentService')
const connectDB = require('./config/db');

connectDB();

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;



function main() {
  const server = new grpc.Server();
  server.addService(bookProto.BookService.service, { 
    GetBooks: getBooks,
    GetBookById: getBookById,

    GetAuthors: getAuthors,
    GetAuthorById: getAuthorById,

    GetChapterById: getChapterById,
    GetChaptersByBookId: getChaptersByBookId,

    GetCommentsByChapterId: getCommentsByChapterId,
    CreateComment: createComment,
  });
  server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Book Service running at http://0.0.0.0:50053');
  });
}

main();
