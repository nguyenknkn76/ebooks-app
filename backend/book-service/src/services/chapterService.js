const Chapter = require('../models/chapter');

const createChapter = async (chapterData) => {
  const chapter = new Chapter(chapterData);
  return await chapter.save();
};

const getAllChapters = async (bookId) => {
  return await Chapter.find({ book: bookId })
    .populate('text_file')
    .populate('audio_file')
    .populate('comments')
    .sort({ chapter_number: 1 });
};

const getChapterById = async (id) => {
  return await Chapter.findById(id)
    .populate('text_file')
    .populate('audio_file')
    .populate('comments');
};

const updateChapter = async (id, chapterData) => {
  return await Chapter.findByIdAndUpdate(id, chapterData, { new: true });
};

const deleteChapter = async (id) => {
  return await Chapter.findByIdAndDelete(id);
};

module.exports = {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
  deleteChapter
};