// controllers/chapterController.js

const bookClient = require('../services/bookClient');

exports.getChaptersByBookId = async (req, res) => {
  try {
    const chapters = await bookClient.getChaptersByBookId(req.params.bookId);
    res.json(chapters);
  } catch (error) {
    console.error('Error in getChaptersByBookId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapter = await bookClient.getChapterById(req.params.id);
    res.json(chapter);
  } catch (error) {
    console.error('Error in getChapterById:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
