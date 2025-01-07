const grpc = require('@grpc/grpc-js');
const chapterService = require('../../services/chapterService');
const mediaFileService = require('../../services/mediaFileService');
const historyService = require('../../services/historyService');
const {uploadMediaFile2} = require('../../utils/upload');

const createChapter = async (call, callback) => {
  try {
    const { chapter_number, name, book } = call.request;
    
    const chapter = await chapterService.createChapter({
      chapter_number,
      name,
      book
    });

    const populatedChapter = await chapterService.getChapterById(chapter._id);

    callback(null, {
      id: populatedChapter._id.toString(),
      chapter_number: populatedChapter.chapter_number,
      name: populatedChapter.name,
      book: populatedChapter.book.toString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getChaptersByBookId = async (call, callback) => {
  try {
    const chapters = await chapterService.getAllChapters(call.request.book_id);
    
    callback(null, {
      chapters: chapters.map(chapter => ({
        id: chapter._id.toString(),
        chapter_number: chapter.chapter_number,
        name: chapter.name,
        book: chapter.book.toString(),
        text_file: chapter.text_file,
        audio_file: chapter.audio_file,
        comments: chapter.comments
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getChapterById = async (call, callback) => {
  try {
    const chapter = await chapterService.getChapterById(call.request.id);
    
    if (!chapter) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Chapter not found'
      });
    }

    callback(null, {
      id: chapter._id.toString(),
      chapter_number: chapter.chapter_number,
      name: chapter.name,
      book: chapter.book.toString(),
      text_file: chapter.text_file,
      audio_file: chapter.audio_file,
      comments: chapter.comments
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const updateChapter = async (call, callback) => {
  try {
    const { id, chapter_number, name, book, text_file } = call.request;

    let textFileId = null;
    if (text_file) {
      const textFileUrl = await uploadMediaFile2({
        bucket_name: process.env.AWS_BUCKET_NAME,
        file_name: text_file.file_name,
        file_content: text_file.file_content,
        file_type: text_file.file_type
      });

      const textFileDoc = await mediaFileService.createMediaFile({
        file_collection: 'chapters',
        file_url: textFileUrl,
        file_type: text_file.file_type,
        file_size: Buffer.from(text_file.file_content, 'base64').length
      });
      textFileId = textFileDoc._id;
    }

    const chapter = await chapterService.updateChapter(id, {
      chapter_number,
      name, 
      book,
      text_file: textFileId
    });

    if (!chapter) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Chapter not found'
      });
    }

    const populatedChapter = await chapterService.getChapterById(chapter._id);

    callback(null, {
      id: populatedChapter._id.toString(),
      chapter_number: populatedChapter.chapter_number,
      name: populatedChapter.name,
      book: populatedChapter.book.toString(),
      text_file: populatedChapter.text_file,
      audio_file: populatedChapter.audio_file,
      comments: populatedChapter.comments
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const updateChapter2 = async (call, callback) => {
  try {
    const { id, audio_files } = call.request;

    // Create MediaFile records for each audio file
    const mediaFileIds = [];
    for (const audio of audio_files) {
      const mediaFile = await mediaFileService.createMediaFile({
        voice: audio.voice_id,
        file_collection: 'chapters',
        file_url: audio.audio_url,
        file_type: 'audio/mp3',
        file_size: 0 // Set appropriate size if available
      });
      mediaFileIds.push(mediaFile._id);
    }

    // Update chapter with new audio files
    const chapter = await chapterService.updateChapter(id, {
      audio_file: mediaFileIds
    });

    if (!chapter) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Chapter not found'
      });
    }

    const populatedChapter = await chapterService.getChapterById(chapter._id);

    callback(null, {
      id: populatedChapter._id.toString(),
      chapter_number: populatedChapter.chapter_number,
      name: populatedChapter.name,
      book: populatedChapter.book.toString(),
      text_file: populatedChapter.text_file,
      audio_file: populatedChapter.audio_file,
      comments: populatedChapter.comments
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};
module.exports = { 
  updateChapter2,
  updateChapter,
  createChapter,
  getChaptersByBookId,
  getChapterById 
};