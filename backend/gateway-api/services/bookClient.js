const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService('localhost:50053', grpc.credentials.createInsecure());

exports.createChapter = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateChapter(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

exports.createBook = (bookData) => {
  return new Promise((resolve, reject) => {
    client.CreateBook(bookData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

exports.createAuthor = (authorData) => {
  return new Promise((resolve, reject) => {
    client.CreateAuthor(authorData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

exports.createMediaFile = (mediaFileData) => {
  return new Promise((resolve, reject) => {
    client.CreateMediaFile(mediaFileData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

exports.uploadMediaFile = (fileData) => {
  return new Promise((resolve, reject) => {
    client.UploadMediaFile(fileData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

exports.getAllChapters = () =>
  new Promise((resolve, reject) => {
    client.GetAllChapters({}, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getChaptersByBookId = (book_id) =>
  new Promise((resolve, reject) => {
    client.GetChaptersByBookId({ book_id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });