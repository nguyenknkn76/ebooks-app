const History = require('../models/history');
const Chapter = require('../models/chapter');
const Book = require('../models/book');

const getHistoriesByUserId = async (call, callback) => {
  try {
    const { userId } = call.request;
    // console.log("req", call.request)
    // Tìm danh sách history theo userId và populate chapter, book
    const histories = await History.find({ user: userId })
      .populate({
        path: 'chapter',
        select: '_id name book',
        populate: {
          path: 'book',
          select: '_id title',
        },
      })
      .exec();

    if (!histories || histories.length === 0) {
      return callback({
        code: 404,
        message: 'No histories found for this user',
      });
    }

    // Chuẩn hóa dữ liệu trả về
    const response = {
      histories: histories.map((history) => ({
        id: history._id.toString(),
        user: history.user,
        chapter: history.chapter
          ? {
              id: history.chapter._id.toString(),
              name: history.chapter.name,
              book: history.chapter.book
                ? {
                    id: history.chapter.book._id.toString(),
                    title: history.chapter.book.title,
                  }
                : null,
            }
          : null,
        voice: history.voice,
        timestamp: history.timestamp.toISOString(),
      })),
    };

    callback(null, response);
  } catch (error) {
    console.error('Error fetching histories by userId:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getAllHistories = async (call, callback) => {
  try {
    // Lấy danh sách lịch sử và populate chapter cùng book
    const histories = await History.find()
      .populate({
        path: 'chapter',
        select: '_id name book', // Chỉ lấy _id, name, và book từ chapter
        populate: {
          path: 'book',
          select: '_id title', // Chỉ lấy _id và title từ book
        },
      })
      .exec();

    // Chuyển đổi dữ liệu để trả về
    const response = {
      histories: histories.map((history) => ({
        id: history._id.toString(),
        user: history.user,
        chapter: history.chapter
          ? {
              id: history.chapter._id.toString(),
              name: history.chapter.name,
              book: history.chapter.book
                ? ({
                    id: history.chapter.book._id.toString(),
                    title: history.chapter.book.title,
                  })
                : null,
            }
          : null,
        voice: history.voice,
        timestamp: history.timestamp.toISOString(),
      })),
    };
    // console.log(response[0].chapter)
    // console.log(response.histories[0].chapter);
    callback(null, response);
  } catch (error) {
    console.error('Error fetching histories:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};


const getHistoryById = async (call, callback) => {
  try {
    const { id } = call.request;

    // Tìm history theo ID và populate chapter, book
    const history = await History.findById(id)
      .populate({
        path: 'chapter',
        select: '_id name book',
        populate: {
          path: 'book',
          select: '_id title',
        },
      })
      .exec();

    if (!history) {
      return callback({
        code: 404,
        message: 'History not found',
      });
    }

    // Chuẩn hóa dữ liệu trả về
    const response = {
      id: history._id.toString(),
      user: history.user,
      chapter: history.chapter
        ? {
            id: history.chapter._id.toString(),
            name: history.chapter.name,
            book: history.chapter.book
              ? {
                  id: history.chapter.book._id.toString(),
                  title: history.chapter.book.title,
                }
              : null,
          }
        : null,
      voice: history.voice,
      timestamp: history.timestamp.toISOString(),
    };

    callback(null, response);
  } catch (error) {
    console.error('Error fetching history by ID:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

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
  getAllHistories,
  getHistoryById,
  getHistoriesByUserId,
};
