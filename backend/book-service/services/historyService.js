const History = require('../models/history');

const createHistory = async (call, callback) => {
  try {
    const { user, chapterId, voice } = call.request;

    // Tạo bản ghi mới cho lịch sử
    const newHistory = new History({
      user,
      chapter: chapterId,
      voice,
    });

    const savedHistory = await newHistory.save();

    const response = {
      id: savedHistory._id.toString(),
      message: 'History created successfully',
    };

    callback(null, response);
  } catch (error) {
    console.error('Error creating history:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createHistory,
};
