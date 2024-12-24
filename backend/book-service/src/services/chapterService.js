const Chapter = require('../models/chapter');

const createChapter = async (data) => {
  const { name, book_id, text_file_id, audio_file_ids } = data;
  
  const chapter = new Chapter({
    name,
    book: book_id,
    text_file: text_file_id,
    audio_file: audio_file_ids || []
  });

  return await chapter.save();
};

const getAllChapters = async () => {
  return await Chapter.find()
    .populate('book', '_id title')
    .populate('text_file', '_id file_url file_type')
    .populate('audio_file', '_id file_url file_type')
    .populate('comments', '_id user comment created_at');
};

const getChaptersByBookId = async (bookId) => {
  return await Chapter.find({ book: bookId })
    .populate('book', '_id title')
    .populate('text_file', '_id file_url file_type')
    .populate('audio_file', '_id file_url file_type')
    .populate('comments', '_id user comment created_at');
};

const getChapterById = async (id) => {
  return await Chapter.findById(id)
    .populate('book', '_id title')
    .populate('text_file', '_id file_url file_type')
    .populate('audio_file', '_id file_url file_type')
    .populate('comments', '_id user comment created_at');
};

module.exports = {
  createChapter,
  getAllChapters,
  getChaptersByBookId,
  getChapterById
};