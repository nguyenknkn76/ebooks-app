const historyService = require('../../services/historyService');
const grpc = require('@grpc/grpc-js');

const formatHistoryResponse = (history) => ({
  id: history._id.toString(),
  user: history.user,
  chapter: history.chapter ? {
    id: history.chapter._id.toString(),
    name: history.chapter.name,
    book: history.chapter.book ? {
      id: history.chapter.book._id.toString(),
      title: history.chapter.book.title,
    } : null,
  } : null,
  voice: history.voice,
  timestamp: history.timestamp.toISOString(),
});

const createHistory = async (call, callback) => {
  try {
    const savedHistory = await historyService.createHistory(call.request);
    callback(null, {
      id: savedHistory._id.toString(),
      message: 'History created successfully',
    });
  } catch (error) {
    console.error('Error creating history:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const getAllHistories = async (call, callback) => {
  try {
    const histories = await historyService.getAllHistories();
    if (histories.length > 0) {
      const bookId = histories[histories.length - 1].chapter.book._id.toString();
      const mostUsedVoice = await historyService.getMostUsedVoice(bookId);
      console.log(mostUsedVoice);
    }
    callback(null, {
      histories: histories.map(formatHistoryResponse)
    });
  } catch (error) {
    console.error('Error fetching histories:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const getHistoryById = async (call, callback) => {
  try {
    const history = await historyService.getHistoryById(call.request.id);
    if (!history) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'History not found',
      });
    }
    callback(null, formatHistoryResponse(history));
  } catch (error) {
    console.error('Error fetching history by ID:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const getHistoriesByUserId = async (call, callback) => {
  try {
    const histories = await historyService.getHistoriesByUserId(call.request.userId);
    if (!histories || histories.length === 0) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'No histories found for this user',
      });
    }
    callback(null, {
      histories: histories.map(formatHistoryResponse)
    });
  } catch (error) {
    console.error('Error fetching histories by userId:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createHistory,
  getAllHistories,
  getHistoryById,
  getHistoriesByUserId,
};