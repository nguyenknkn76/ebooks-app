const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService('localhost:50053', grpc.credentials.createInsecure());

exports.getHistoriesByUserId = (userId) =>
  new Promise((resolve, reject) => {
    client.GetHistoriesByUserId({ userId }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });


exports.getHistoryById = (id) =>
  new Promise((resolve, reject) => {
    client.GetHistoryById({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getAllHistories = () =>
  new Promise((resolve, reject) => {
    client.GetAllHistories({}, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.createHistory = (data) =>
  new Promise((resolve, reject) => {
    client.CreateHistory(data, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getLibrariesByUserId = (id) =>
  new Promise((resolve, reject) => {
    client.GetLibrariesByUserId({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getAllLibraries = () =>
  new Promise((resolve, reject) => {
    client.GetAllLibraries({}, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getLibraryById = (id) =>
  new Promise((resolve, reject) => {
    client.GetLibraryById({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });


exports.createLibrary = (libraryData) =>
  new Promise((resolve, reject) => {
    client.CreateLibrary(libraryData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.createRating = (data) =>
  new Promise((resolve, reject) => {
    client.CreateRating(data, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.createChapter = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateChapter(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

exports.createBook = (bookData) => {
  // console.log(bookData);
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

exports.getAllBooks = () =>
  new Promise((resolve, reject) => {
    client.GetAllBooks({}, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });


exports.getAllAuthors = () =>
  new Promise((resolve, reject) => {
    client.GetAllAuthors({}, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.getBookById = (id) =>
  new Promise((resolve, reject) => {
    client.GetBookById({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response.book);
    });
  });
    
exports.getAuthorById = (id) =>
  new Promise((resolve, reject) => {
    client.GetAuthorById({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

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

exports.getChapterById = (chapter_id) =>
  new Promise((resolve, reject) => {
    client.GetChapterById({ chapter_id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.editChapter = (chapter_id, name, text_file_id, audio_file_ids) =>
  new Promise((resolve, reject) => {
    client.EditChapter(
      { chapter_id, name, text_file_id, audio_file_ids },
      (error, response) => {
        if (error) return reject(error);
        resolve(response);
      }
    );
  });

exports.createComment = (chapter_id, user, comment) =>
  new Promise((resolve, reject) => {
    client.CreateComment({ chapter_id, user, comment }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });

exports.addAudioFile = (chapter_id, file_name, file_content, file_type, file_size, file_collection) =>
  new Promise((resolve, reject) => {
    client.AddAudioFile(
      { chapter_id, file_name, file_content, file_type, file_size, file_collection },
      (error, response) => {
        if (error) return reject(error);
        resolve(response);
      }
    );
  });

exports.addAudioFile = (chapter_id, file_name, file_content, file_type, file_size) =>
  new Promise((resolve, reject) => {
    client.AddAudioFile(
      { chapter_id, file_name, file_content, file_type, file_size },
      (error, response) => {
        if (error) return reject(error);
        resolve(response);
      }
    );
  });

  

