const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const Chapter = require('./models/chapter');
const Comment = require('./models/comment');
const History = require('./models/history');
const Library = require('./models/library');
const MediaFile = require('./models/mediaFile');
const Rating = require('./models/rating');
const {getBookById} = require('./services/bookService');
const {getAuthorById, getAuthors} = require('./services/authorService');
const connectDB = require('./config/db');

connectDB();

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

async function getBooks(call, callback) {
  try {
    const books = await Book.find().populate('author_id cover_img');
    const bookList = books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      description: book.description,
      author_id: book.author_id.toString(),
      genres: book.genres,
      publish_year: book.publish_year.toString(),
      cover_img: book.cover_img.toString()
    }));
    callback(null, { books: bookList });
  } catch (error) {
    callback(error, null);
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(bookProto.BookService.service, { 
    GetBooks: getBooks,
    GetBookById: getBookById,

    GetAuthors: getAuthors,
    GetAuthorById: getAuthorById,
  });
  server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Book Service running at http://0.0.0.0:50053');
  });
}

main();
