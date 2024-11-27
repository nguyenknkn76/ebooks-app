const Chapter = require('../models/chapter');
const Book = require('../models/book');
const MediaFile = require('../models/mediaFile');

const createChapter = async (call, callback) => {
    try {
      const { name, book_id, text_file_name, text_file_content, audio_file_name, audio_file_content } = call.request;
      //upload file to s3
      let textFileMedia = null;
      if (text_file_name && text_file_content) {
        const textFileParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: text_file_name,
          Body: Buffer.from(text_file_content, 'base64'),
          ContentType: 'text/plain',
          // ACL: 'public-read',
        };
        await s3Client.send(new PutObjectCommand(textFileParams));
  
        // save new text file to mongo
        textFileMedia = await MediaFile.create({
          file_collection: 'ChapterText',
          file_url: `https://${textFileParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${text_file_name}`,
          file_type: 'text/plain',
          file_size: text_file_content.length,
        });
      }
  
      // upload file to s3
      let audioFileMedia = null;
      if (audio_file_name && audio_file_content) {
        const audioFileParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: audio_file_name,
          Body: Buffer.from(audio_file_content, 'base64'),
          ContentType: 'audio/mpeg',
          // ACL: 'public-read',
        };
        await s3Client.send(new PutObjectCommand(audioFileParams));
  
        // save media file
        audioFileMedia = await MediaFile.create({
          file_collection: 'ChapterAudio',
          file_url: `https://${audioFileParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${audio_file_name}`,
          file_type: 'audio/mpeg',
          file_size: audio_file_content.length,
        });
      }
  
      // save chapter
      const newChapter = await Chapter.create({
        name,
        book: book_id,
        text_file: textFileMedia ? textFileMedia._id : null,
        audio_file: audioFileMedia ? [audioFileMedia._id] : [],
      });
  
      await Book.findByIdAndUpdate(
        newChapter.book,
        {$push: {chapters: newChapter._id}},
        {new: true, useFindAndModify: false}  
      )
      // console.log('before create success');
      callback(null, { chapter_id: newChapter._id.toString(), message: 'Chapter created successfully.' });
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
  };
  
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
  
  const editChapter = async (call, callback) => {
    const { chapter_id, name, text_file_id, audio_file_ids } = call.request;
  
    try {
      const chapter = await Chapter.findById(chapter_id);
      
      if (!chapter) {
        return callback({
          code: 404,
          message: 'Chapter not found',
        });
      }
  
      // update chapter info
      if (name) chapter.name = name;
      // if (text_file_id) chapter.text_file = text_file_id;
      // if (audio_file_ids) chapter.audio_file = audio_file_ids;
      chapter.text_file = (text_file_id === null)  ? chapter.text_file : text_file_id;
      if(audio_file_ids) chapter.audio_file = chapter.audio_file;
      
      await chapter.save();
  
      callback(null, { message: 'Chapter updated successfully' });
    } catch (error) {
      console.error('Error editing chapter:', error);
      callback({
        code: 500,
        message: 'Internal server error',
      });
    }
  };
module.exports = { createChapter, getChaptersByBookId, getChapterById, getAllChapters };
