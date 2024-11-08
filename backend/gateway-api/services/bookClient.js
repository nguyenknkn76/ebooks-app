const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService('localhost:50053', grpc.credentials.createInsecure());

const getBookById = (id) => {
    return new Promise((resolve, reject) => {
      client.GetBookById({ id }, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.book);
      });
    });
  };

  const getAuthors = () => {
    return new Promise((resolve, reject) => {
      client.GetAuthors({}, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.authors);
      });
    });
  };
  
  const getAuthorById = (id) => {
    return new Promise((resolve, reject) => {
      client.GetAuthorById({ id }, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.author);
      });
    });
  };
  
module.exports = { getBookById, getAuthorById, getAuthors };
// module.exports = client;
