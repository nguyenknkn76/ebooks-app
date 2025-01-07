const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/grpc/protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService('localhost:50053', grpc.credentials.createInsecure());

const createAuthor = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateAuthor(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllAuthors = () => {
  return new Promise((resolve, reject) => {
    client.GetAllAuthors({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAuthorById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetAuthorById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createGenre = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateGenre(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllGenres = () => {
  return new Promise((resolve, reject) => {
    client.GetAllGenres({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getGenreById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetGenreById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createBook = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateBook(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllBooks = (query = {}) => {
  return new Promise((resolve, reject) => {
    client.GetAllBooks(query, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getBookById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetBookById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createBookWithCover = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateBookWithCover(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const updateBook = (id, data) => {
  return new Promise((resolve, reject) => {
    client.UpdateBook({ id, ...data }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createChapter = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateChapter(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getChaptersByBookId = (bookId) => {
  return new Promise((resolve, reject) => {
    client.GetChaptersByBookId({ book_id: bookId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getChapterById = (data) => {
  return new Promise((resolve, reject) => {
    client.GetChapterById(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const updateChapter = (id, data) => {
  return new Promise((resolve, reject) => {
    client.UpdateChapter({ id, ...data }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const updateChapter2 = (id, audioFiles) => {
  return new Promise((resolve, reject) => {
    client.UpdateChapter2({ id, audio_files: audioFiles }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createComment = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateComment(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getCommentsByChapterId = (chapterId) => {
  return new Promise((resolve, reject) => {
    client.GetCommentsByChapterId({ chapter_id: chapterId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createRating = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateRating(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getRatingsByBookId = (bookId) => {
  return new Promise((resolve, reject) => {
    client.GetRatingsByBookId({ book_id: bookId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createLibrary = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateLibrary(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getLibrariesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    client.GetLibrariesByUserId({ user_id: userId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getAllHistories = () => {
  return new Promise((resolve, reject) => {
    client.GetAllHistories({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getHistoriesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    client.GetHistoriesByUserId({ user_id: userId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const createHistory = (data) => {
  return new Promise((resolve, reject) => {
    client.CreateHistory(data, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getHistoriesByBookId = (bookId) => {
  return new Promise((resolve, reject) => {
    client.GetHistoriesByBookId({ book_id: bookId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getMostUsedVoiceFromHistories = (bookId) => {
  return new Promise((resolve, reject) => {
    client.GetMostUsedVoiceFromHistories({ book_id: bookId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getLastUsedVoiceFromHistories = (userId) => {
  return new Promise((resolve, reject) => {
    client.GetLastUsedVoiceFromHistories({ user_id: userId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const countBooks = () => {
  return new Promise((resolve, reject) => {
    client.CountBooks({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const countBooksThisMonth = () => {
  return new Promise((resolve, reject) => {
    client.CountBooksThisMonth({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getTotalBooksInTwelveMonths = () => {
  return new Promise((resolve, reject) => {
    client.GetTotalBooksInTwelveMonths({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getHistoriesBooksByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    client.GetHistoriesBooksByUserId({ user_id: userId }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getBooksByMonthly = () => {
  return new Promise((resolve, reject) => {
    client.GetBooksByMonthly({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getBooksByViews = () => {
  return new Promise((resolve, reject) => {
    client.GetBooksByViews({}, (error, response) => {
      if (error) reject(error);  
      else resolve(response);
    });
  });
};

const getBooksByCreatedTime = () => {
  return new Promise((resolve, reject) => {
    client.GetBooksByCreatedTime({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getBooksByUpdatedTime = () => {
  return new Promise((resolve, reject) => {
    client.GetBooksByUpdatedTime({}, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const updateLibrary = (id, data) => {
  return new Promise((resolve, reject) => {
    client.UpdateLibrary({ id, ...data }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const deleteLibrary = (id) => {
  return new Promise((resolve, reject) => {
    client.DeleteLibrary({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getLibraryById = (id) => {
  return new Promise((resolve, reject) => {
    client.GetLibraryById({ id }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

module.exports = { 
  deleteLibrary,
  getLibraryById,
  updateLibrary,
  getBooksByCreatedTime,
  getBooksByUpdatedTime,
  getBooksByMonthly,
  getBooksByViews,
  getHistoriesBooksByUserId,
  getTotalBooksInTwelveMonths,
  countBooks,
  countBooksThisMonth,
  getLastUsedVoiceFromHistories,
  getMostUsedVoiceFromHistories,
  getHistoriesByBookId,
  createHistory,
  getAllHistories,
  getHistoriesByUserId,
  getLibrariesByUserId,
  createLibrary,
  getRatingsByBookId,
  createRating,
  getCommentsByChapterId,
  createComment,
  updateChapter2,
  updateChapter,
  createChapter,
  updateBook,
  createBookWithCover,
  createBook,
  getAllBooks,
  getBookById,

  createGenre,
  getAllGenres,
  getGenreById,

  createAuthor,
  getAllAuthors,
  getAuthorById,
  getChaptersByBookId,
  getChapterById
};
  

