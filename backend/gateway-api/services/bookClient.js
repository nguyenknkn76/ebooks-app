const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { response } = require('express');

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

const getBooks = () => {
    return new Promise((resolve, reject) => {
        client.GetBooks({}, (error, response) => {
            if(error) return reject(error);
            resolve(response.books);
        })
    })
}

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

const getChaptersByBookId = (bookId) => {
  return new Promise((resolve, reject) => {
    client.GetChaptersByBookId({ book_id: bookId }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.chapters);
    });
  });
};

const getChapterById = async (id) => {
  const res = await client.getChapterById({id})
  console.log(res);
  return new Promise((resolve, reject) => {
    client.GetChapterById({ id }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.chapter);
    });
  });
};

const getCommentsByChapterId = (chapterId) => {
  return new Promise((resolve, reject) => {
    client.GetCommentsByChapterId({ chapter_id: chapterId }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.comments);
    });
  });
};

const createComment = (chapterId, userId, commentText) => {
  return new Promise((resolve, reject) => {
    client.CreateComment({ chapter_id: chapterId, user_id: userId, comment: commentText }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.comment);
    });
  });
};


module.exports = { 
  getBookById, getBooks, 
  getAuthorById, getAuthors,  
  //! getChaptersByBookId: choose book -> input: book id -> list chapters of this book
  getChaptersByBookId, getChapterById,
  createComment, getCommentsByChapterId, 
};
// module.exports = client;
