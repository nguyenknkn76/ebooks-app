const Book = require('../models/book');
const Chapter = require('../models/chapter');
const MediaFile = require('../models/mediaFile');
const Comment = require('../models/comment');
const MediaFileService = require('./mediaFileService');
require('dotenv').config();

/*
  input: name, book_id, text_file_name, text_file_content, audio_file_name, audio_file_content
  check: 
    text file exists => upload to s3 => create media file ~ textbook
    audiofile exists => ... => create ... ~ audiobook
  create chapter
  update book
  output: chapter_id 
*/
const createChapter = async (call, callback) => {
  // console.log('hello im here')
  try {
    const { name, book_id, text_file_name, text_file_content, audio_file_name, audio_file_content } = call.request;

    let textFileMedia = null;
    if(text_file_name && text_file_content) {
      const textBookProps = {
        bucket_name: process.env.AWS_BUCKET_NAME_TEXT_BOOK,
        file_name: text_file_name,
        file_content: text_file_content,
        file_type: "text/plain"
      }
      const textBookUrl = await MediaFileService.uploadMediaFile2(textBookProps);

      textFileMedia = await MediaFile.create({
        file_collection: "TextBook",
        file_url: textBookUrl,
        file_type: 'text/plain',
        file_size: text_file_content.length
      });
    }

    let audioFileMedia = null;
    if (audio_file_name && audio_file_content) {      
      const audioBookProps = {
        bucket_name: process.env.AWS_BUCKET_NAME_AUDIO_BOOK,
        file_name: audio_file_name,
        file_content: audio_file_content,
        file_type: "audio/mpeg"
      }

      const audioBookUrl = await MediaFileService.uploadMediaFile2(audioBookProps);
      audioFileMedia = await MediaFile.create({
        file_collection: 'AudioBook',
        file_url: audioBookUrl,
        file_type: 'audio/mpeg',
        file_size: audio_file_content.length
      });
    }

    const newChapter = await Chapter.create({
      name,
      book: book_id,
      text_file: textFileMedia ? textFileMedia._id : null,
      audio_file: audioFileMedia ? [audioFileMedia._id] : [],
    })

    await Book.findByIdAndUpdate(
      newChapter.book,
      {$push: {chapters: newChapter._id}},
      {new: true, useFindAndModify: false}  
    )
    callback(null, {
      chapter_id: newChapter._id.toString(), 
      message: 'Chapter created successfully.'
    })
  } catch (error) {
    console.error('Error creating chapter:', error);
    callback(error);
  }
};

const getAllChapters = async (call, callback) => {
  try {
    const chapters = await Chapter.find()
      .populate('book', '_id title')
      .populate('text_file', '_id file_url file_type')
      .populate('audio_file', '_id file_url file_type');

    const response = chapters.map((chapter) => ({
      id: chapter._id.toString(),
      name: chapter.name,
      book_id: chapter.book ? chapter.book._id.toString() : null,
      text_file_id: chapter.text_file ? chapter.text_file._id.toString() : null,
      audio_file_ids: chapter.audio_file
        ? chapter.audio_file.map((audio) => audio._id.toString())
        : [],
    }));

    callback(null, { chapters: response });
  } catch (error) {
    console.error('Error fetching chapters:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
}

const getChaptersByBookId = async (call, callback) => {
  const { book_id } = call.request;

  try {
    const chapters = await Chapter.find({ book: book_id })
      .populate('book', '_id title')
      .populate('text_file', '_id file_url file_type')
      .populate('audio_file', '_id file_url file_type');

    const response = chapters.map((chapter) => ({
      id: chapter._id.toString(),
      name: chapter.name,
      book_id: chapter.book ? chapter.book._id.toString() : null,
      text_file_id: chapter.text_file ? chapter.text_file._id.toString() : null,
      audio_file_ids: chapter.audio_file
        ? chapter.audio_file.map((audio) => audio._id.toString())
        : [],
    }));

    callback(null, { chapters: response });
  } catch (error) {
    console.error('Error fetching chapters by book ID:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getChapterById = async (call, callback) => {
  const { chapter_id } = call.request;

  try {
    const chapter = await Chapter.findById(chapter_id)
      .populate('book', '_id title')
      .populate('text_file', '_id file_url file_type')
      .populate('audio_file', '_id file_url file_type')
      .populate({
        path: 'comments',
        select: '_id user comment created_at',
      });

    if (!chapter) {
      return callback({
        code: 404,
        message: 'Chapter not found',
      });
    }

    const response = {
      id: chapter._id.toString(),
      name: chapter.name,
      book_id: chapter.book ? chapter.book._id.toString() : null,
      text_file_id: chapter.text_file ? chapter.text_file._id.toString() : null,
      audio_file_ids: chapter.audio_file
        ? chapter.audio_file.map((audio) => audio._id.toString())
        : [],
      comments: chapter.comments.map((comment) => ({
        id: comment._id.toString(),
        user: comment.user,
        comment: comment.comment,
        created_at: comment.created_at.toISOString(),
      })),
    };

    callback(null, response);
  } catch (error) {
    console.error('Error fetching chapter by ID:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createChapter,
  getAllChapters,
  getChaptersByBookId,
  getChapterById
}