const mongoose = require('mongoose');
const History = require('../models/history');
const Chapter = require('../models/chapter');
const Book = require('../models/book');
const grpc = require('@grpc/grpc-js');

const createHistory = async (historyData) => {
  try {
    // Create history
    const history = new History(historyData);
    await history.save();

    // Get chapter details to get book ID
    const chapter = await Chapter.findById(historyData.chapter)
      .populate('book');

    if (chapter && chapter.book) {
      // Increment book views
      await Book.findByIdAndUpdate(
        chapter.book._id,
        { 
          $inc: { 
            views: 1,
            monthly_views: 1 
          } 
        }
      );
    }

    return history;
  } catch (error) {
    throw error;
  }
};

const getUserHistory = async (userId) => {
  return await History.find({ user: userId })
    .populate('chapter')
    .sort({ created_at: -1 });
};

const deleteHistory = async (id) => {
  return await History.findByIdAndDelete(id);
};

const getAllHistories = async () => {
  return await History.find()
    .populate('chapter')
    .sort({ created_at: -1 });
};

const getHistoryById = async (id) => {
  return await History.findById(id)
    .populate('chapter')
    // .populate('voice');
};

const getHistoriesByBookId = async (bookId) => {
  return await History.find()
    .populate({
      path: 'chapter',
      match: { book: bookId }
    })
    .sort({ created_at: -1 })
    .then(histories => histories.filter(h => h.chapter)); 
};

const getHistoriesByBookId2 = async (bookId) => {
  return await History.find()
    .populate({
      path: 'chapter',
      match: { book: bookId }
    })
};

const getMostUsedVoiceFromHistories = async (bookId) => {
  const histories = await History.find()
    .populate({
      path: 'chapter',
      match: { book: bookId }
    })
    .select('voice');

  const voiceCounts = histories
    .filter(h => h.chapter)
    .reduce((acc, history) => {
      acc[history.voice] = (acc[history.voice] || 0) + 1;
      return acc;
    }, {});

  const sortedVoices = Object.entries(voiceCounts)
    .sort(([,a], [,b]) => b - a);

  return sortedVoices.length > 0 ? {
    voice_id: sortedVoices[0][0],
    use_count: sortedVoices[0][1]
  } : null;
};

const getLastUsedVoiceFromHistories = async (userId) => {
  const lastHistory = await History.findOne({ user: userId })
    .sort({ created_at: -1 })
    .select('voice created_at');

  return lastHistory ? {
    voice_id: lastHistory.voice,
    created_at: lastHistory.created_at
  } : null;
};

// Add new service method
const getHistoriesBooksByUserId = async (userId) => {
  // Get histories and populate chapter with book details
  const histories = await History.find({ user: userId })
    .populate({
      path: 'chapter',
      populate: {
        path: 'book',
        model: 'Book',
        populate: [
          { path: 'author' },
          { path: 'genres' },
          { path: 'cover_img' }
        ]
      }
    })
    .sort({ created_at: -1 });

  // Extract unique books from histories
  const uniqueBooks = [...new Map(
    histories
      .filter(h => h.chapter && h.chapter.book) // Filter out invalid entries
      .map(h => [h.chapter.book._id.toString(), h.chapter.book])
  ).values()];

  return uniqueBooks;
};

module.exports = {
  getHistoriesBooksByUserId,
  getLastUsedVoiceFromHistories,
  getMostUsedVoiceFromHistories,
  getHistoriesByBookId,
  getHistoriesByBookId2,
  getAllHistories,
  getHistoryById,
  createHistory,
  getUserHistory,
  deleteHistory
};