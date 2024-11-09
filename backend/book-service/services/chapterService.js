const Chapter = require('../models/chapter');

const getChaptersByBookId = async (call, callback) => {
  try {
    const bookId = call.request.book_id;
    const chapters = await Chapter.find({ book_id: bookId });
    callback(null, {
      chapters: chapters.map(chapter => ({
        id: chapter._id.toString(),
        name: chapter.name,
        book_id: chapter.book_id.toString(),
        text_file: chapter.text_file,
        audio_file: chapter.audio_file,
      })),
    });
  } catch (error) {
    console.error('Error in getChaptersByBookId:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const getChapterById = async (call, callback) => {
  try {
    const chapterId = call.request.id;
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Chapter not found',
      });
    }

    callback(null, {
      chapter: {
        id: chapter._id.toString(),
        name: chapter.name,
        book_id: chapter.book_id.toString(),
        text_file: chapter.text_file,
        audio_file: chapter.audio_file,
      },
    });
  } catch (error) {
    console.error('Error in getChapterById:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

module.exports = { getChaptersByBookId, getChapterById };
