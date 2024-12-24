const History = require('../models/history');

const createHistory = async (data) => {
  const { user, chapterId, voice } = data;
  const newHistory = new History({
    user,
    chapter: chapterId,
    voice,
  });
  return await newHistory.save();
};

const getAllHistories = async () => {
  return await History.find()
    .populate({
      path: 'chapter',
      select: '_id name book',
      populate: {
        path: 'book',
        select: '_id title', 
      },
    });
};

const getHistoryById = async (id) => {
  return await History.findById(id)
    .populate({
      path: 'chapter',
      select: '_id name book',
      populate: {
        path: 'book',
        select: '_id title',
      },
    });
};

const getHistoriesByUserId = async (userId) => {
  return await History.find({ user: userId })
    .populate({
      path: 'chapter',
      select: '_id name book',
      populate: {
        path: 'book',
        select: '_id title',
      },
    });
};

const getMostUsedVoice = async (bookId) => {
  const histories = await History.find()
    .populate({
      path: 'chapter',
      select: '_id name book',
      populate: {
        path: 'book',
        match: {_id: bookId},
        select: '_id title', 
      },
    });

  const filteredHistories = histories.filter((history) => 
    history.chapter && history.chapter.book && history.chapter.book._id.toString() === bookId
  );

  const voiceCount = {}
  filteredHistories.forEach((history) => {
    if(history.voice) {
      voiceCount[history.voice] = (voiceCount[history.voice] || 0) + 1;
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
  
  return { bookId, mostUsedVoice, count: maxCount };
};

module.exports = {
  createHistory,
  getAllHistories,
  getHistoryById,
  getHistoriesByUserId,
  getMostUsedVoice
};