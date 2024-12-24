const chapterService = require('../../services/chapterService');
const mediaFileService = require('../../services/mediaFileService');
const bookService = require('../../services/bookService');
const grpc = require('@grpc/grpc-js');

const formatChapterResponse = (chapter) => ({
  id: chapter._id.toString(),
  name: chapter.name,
  book_id: chapter.book ? chapter.book._id.toString() : null,
  text_file_id: chapter.text_file ? chapter.text_file._id.toString() : null,
  audio_file_ids: chapter.audio_file
    ? chapter.audio_file.map(audio => audio._id.toString())
    : [],
  comments: chapter.comments?.map(comment => ({
    id: comment._id.toString(),
    user: comment.user,
    comment: comment.comment,
    created_at: comment.created_at.toISOString(),
  })) || [],
});

const createChapter = async (call, callback) => {
  try {
    // Create media files first
    let textFileId = null;
    if(call.request.text_file_name && call.request.text_file_content) {
      const textFile = await mediaFileService.createTextBookFile({
        file_name: call.request.text_file_name,
        file_content: call.request.text_file_content
      });
      textFileId = textFile._id;
    }

    let audioFileIds = [];
    if(call.request.audio_file_name && call.request.audio_file_content) {
      const audioFile = await mediaFileService.createAudioBookFile({
        file_name: call.request.audio_file_name,
        file_content: call.request.audio_file_content
      });
      audioFileIds.push(audioFile._id);
    }

    // Create chapter
    const chapter = await chapterService.createChapter({
      name: call.request.name,
      book_id: call.request.book_id,
      text_file_id: textFileId,
      audio_file_ids: audioFileIds
    });

    // Update book
    await bookService.addChapterToBook(call.request.book_id, chapter._id);

    callback(null, { chapter_id: chapter._id.toString() });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllChapters = async (call, callback) => {
  try {
    const chapters = await chapterService.getAllChapters();
    console.log(chapters);
    callback(null, {
      chapters: chapters.map(formatChapterResponse)
    });
  } catch (error) {
    console.error('Error fetching chapters:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

const getChaptersByBookId = async (call, callback) => {
  try {
    const chapters = await chapterService.getChaptersByBookId(call.request.book_id);
    callback(null, {
      chapters: chapters.map(formatChapterResponse)
    });
  } catch (error) {
    console.error('Error fetching chapters by book ID:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

const getChapterById = async (call, callback) => {
  try {
    const chapter = await chapterService.getChapterById(call.request.chapter_id);
    if (!chapter) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Chapter not found'
      });
    }
    callback(null, formatChapterResponse(chapter));
  } catch (error) {
    console.error('Error fetching chapter by ID:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createChapter,
  getAllChapters,
  getChaptersByBookId,
  getChapterById
};