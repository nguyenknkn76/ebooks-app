const grpc = require('@grpc/grpc-js');
const historyService = require('../../services/historyService');

const createHistory = async (call, callback) => {
  try {
    const { user, chapter, voice } = call.request;
    
    const history = await historyService.createHistory({
      user,
      chapter,
      voice,
      created_at: new Date()
    });

    const populatedHistory = await historyService.getHistoryById(history._id);

    callback(null, {
      id: populatedHistory._id.toString(),
      user: populatedHistory.user,
      chapter: {
        id: populatedHistory.chapter._id.toString(),
        chapter_number: populatedHistory.chapter.chapter_number,
        name: populatedHistory.chapter.name,
        book: populatedHistory.chapter.book.toString()
      },
      voice: populatedHistory.voice,
      created_at: populatedHistory.created_at.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllHistories = async (call, callback) => {
  try {
    const histories = await historyService.getAllHistories();
    
    callback(null, {
      histories: histories.map(history => ({
        id: history._id.toString(),
        user: history.user,
        chapter: {
          id: history.chapter._id.toString(),
          chapter_number: history.chapter.chapter_number,
          name: history.chapter.name,
          book: history.chapter.book.toString()
        },
        voice: history.voice,
        created_at: history.created_at.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getHistoriesByUserId = async (call, callback) => {
  try {
    const histories = await historyService.getUserHistory(call.request.user_id);
    
    callback(null, {
      histories: histories.map(history => ({
        id: history._id.toString(),
        user: history.user,
        chapter: {
          id: history.chapter._id.toString(),
          chapter_number: history.chapter.chapter_number,
          name: history.chapter.name,
          book: history.chapter.book.toString()
        },
        voice: history.voice,
        created_at: history.created_at.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getHistoriesByBookId = async (call, callback) => {
  try {
    const histories = await historyService.getHistoriesByBookId(call.request.book_id);
    
    callback(null, {
      histories: histories.map(history => ({
        id: history._id.toString(),
        user: history.user,
        chapter: {
          id: history.chapter._id.toString(),
          chapter_number: history.chapter.chapter_number,
          name: history.chapter.name,
          book: history.chapter.book.toString()
        },
        voice: history.voice,
        created_at: history.created_at.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getMostUsedVoiceFromHistories = async (call, callback) => {
  try {
    const result = await historyService.getMostUsedVoiceFromHistories(call.request.book_id);
    
    if (!result) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'No voice history found for this book'
      });
    }

    callback(null, {
      voice_id: result.voice_id,
      use_count: result.use_count
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getLastUsedVoiceFromHistories = async (call, callback) => {
  try {
    const result = await historyService.getLastUsedVoiceFromHistories(call.request.user_id);
    
    if (!result) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'No voice history found for this user'
      });
    }

    callback(null, {
      voice_id: result.voice_id,
      created_at: result.created_at.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getHistoriesBooksByUserId = async (call, callback) => {
  try {
    const books = await historyService.getHistoriesBooksByUserId(call.request.user_id);
    
    callback(null, {
      books: books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        genres: book.genres,
        description: book.description,
        publish_year: book.publish_year,
        cover_img: book.cover_img,
        chapters: book.chapters,
        avg_rating: book.avg_rating,
        views: book.views,
        followers: book.followers,
        monthly_views: book.monthly_views,
        status: book.status,
        created_at: book.created_at.toISOString(),
        updated_at: book.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  getHistoriesBooksByUserId,
  getMostUsedVoiceFromHistories,
  getLastUsedVoiceFromHistories,
  getHistoriesByBookId,
  createHistory,
  getAllHistories,
  getHistoriesByUserId
};