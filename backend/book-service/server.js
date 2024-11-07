const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const PROTO_PATH = './proto/book.proto';
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
  server.addService(bookProto.BookService.service, { GetBooks: getBooks });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Book Service running at http://0.0.0.0:50051');
    server.start();
  });
}

main();
