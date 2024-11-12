const Chapter = require('../models/chapter');

const getChaptersByBookId = async (call, callback) => {
  try {
    const bookId = call.request.book_id;
    const chapters = await Chapter.find({ book_id: bookId });
    console.log(chapters);
    callback(null, {
      chapters: chapters.map(chapter => (
        {
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
    // console.log(chapter);
    // const newchapter = {
    //     id: chapter._id.toString(),
    //     name: chapter.name,
    //     book_id: chapter.book_id._id.toString(),
    //     text_file: chapter.text_file._id.toString(),
    //     audio_file: chapter.audio_file._id.toString(),
    // }
    // console.log('new chapter: ', newchapter)
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
        book_id: chapter.book_id._id.toString(),
        text_file: chapter.text_file._id.toString(),
        audio_file: chapter.audio_file._id.toString(),
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
