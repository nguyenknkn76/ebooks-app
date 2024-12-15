const History = require('../models/history');
const Chapter = require('../models/chapter');
const Book = require('../models/book');

const getHistoriesByUserId = async (call, callback) => {
  try {
    const { userId } = call.request;
    // console.log("req", call.request)
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

const getMostUsedVoice = async (bookId) => {
  try {
    const histories = await History.find()
      .populate({
        path: 'chapter',
        select: '_id name book',
        populate: {
          path: 'book',
          match: {_id: bookId},
          select: '_id title', 
        },
      })
      .exec();
    
    // console.log(bookId);
    // console.log(histories);
    const filteredHistories = histories.filter((history) => 
      history.chapter && history.chapter.book && history.chapter.book._id.toString() === bookId
    );
    // console.log(filteredHistories);
    const voiceCount = {}
    filteredHistories.forEach((history) => {
      const voice = history.voice;
      if(voice){
        voiceCount[voice] = (voiceCount[voice] || 0) + 1;
      }
    });
    let mostUsedVoice = null;
    let maxCount = 0;
    
    for (const [voice, count] of Object.entries(voiceCount)){
      if (count > maxCount){
        mostUsedVoice = voice;
        maxCount = count;
      }
    }
    
    const response = {
      bookId, mostUsedVoice, count: maxCount
    }
    // console.log(response);
    return response;

  } catch (error) {
    console.error('Error in Get most used Voice');
    return null;
  }
}
const getAllHistories = async (call, callback) => {
  try {
    const histories = await History.find()
      .populate({
        path: 'chapter',
        select: '_id name book',
        populate: {
          path: 'book',
          select: '_id title', 
        },
      })
      .exec();
    
    
    const bookId = histories[histories.length - 1].chapter.book._id.toString();
    const mostUsedVoice = await getMostUsedVoice(bookId);
    console.log(mostUsedVoice);

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
