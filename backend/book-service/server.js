const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');

const Book = require('./models/Book');
const Author = require('./models/Author')
const MediaFile = require('./models/mediaFile');
const Chapter = require('./models/chapter');
const Comment = require('./models/comment');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;
const connectDB = require('./config/db');
// const s3 = require('./config/aws');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('./config/aws');

require('dotenv').config();

connectDB();
const createBook = async (call, callback) => {
  try {
    const { title, author, genres, description, publish_year } = call.request;

    const book = new Book({
      title,
      author,
      genres,
      description,
      publish_year,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedBook = await book.save();
    callback(null, { id: savedBook.id, title: savedBook.title, author: savedBook.author });
  } catch (error) {
    console.error('Error creating book:', error);
    callback(error);
  }
};

const createAuthor = async (call, callback) => {
  try {
    const { user, pen_name, name, description } = call.request;

    const author = new Author({
      user,
      pen_name,
      name,
      description,
    });

    const savedAuthor = await author.save();
    callback(null, {
      id: savedAuthor.id,
      user: savedAuthor.user,
      pen_name: savedAuthor.pen_name,
      name: savedAuthor.name,
      description: savedAuthor.description,
    });
  } catch (error) {
    console.error('Error creating author:', error);
    callback(error);
  }
};

const createMediaFile = async (call, callback) => {
  try {
    const { file_collection, file_url, file_type, file_size } = call.request;

    const mediaFile = new MediaFile({
      file_collection,
      file_url,
      file_type,
      file_size,
    });

    const savedMediaFile = await mediaFile.save();
    callback(null, {
      id: savedMediaFile.id,
      file_collection: savedMediaFile.file_collection,
      file_url: savedMediaFile.file_url,
      file_type: savedMediaFile.file_type,
      file_size: savedMediaFile.file_size,
    });
  } catch (error) {
    console.error('Error creating media file:', error);
    callback(error);
  }
};

const uploadMediaFile = async (call, callback) => {
  try {
    const { file_name, file_content, file_type } = call.request;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: file_name,
      Body: Buffer.from(file_content, 'base64'), 
      ContentType: file_type, 
      // ACL: 'public-read', 
    };

    // send command upload to s3
    const uploadResult = await s3Client.send(new PutObjectCommand(params));

    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_name}`;

    callback(null, { file_url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    callback(error);
  }
};

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

const createComment = async (call, callback) => {
  const { chapter_id, user, comment } = call.request;

  try {
    // Kiểm tra chapter tồn tại
    const chapter = await Chapter.findById(chapter_id);
    if (!chapter) {
      return callback({
        code: 404,
        message: 'Chapter not found',
      });
    }

    // Tạo comment mới
    const newComment = new Comment({
      user,
      chapter: chapter_id,
      comment,
    });

    await newComment.save();

    // Thêm comment vào chapter
    chapter.comments.push(newComment._id);
    await chapter.save();

    // Trả về response
    const response = {
      id: newComment._id.toString(),
      chapter_id: chapter_id,
      user: newComment.user,
      comment: newComment.comment,
      created_at: newComment.created_at.toISOString(),
    };

    callback(null, response);
  } catch (error) {
    console.error('Error creating comment:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const addAudioFile = async (call, callback) => {
  const { chapter_id, file_name, file_content, file_type, file_size } = call.request;

  try {
    // Kiểm tra chapter tồn tại
    const chapter = await Chapter.findById(chapter_id);
    if (!chapter) {
      return callback({
        code: 404,
        message: 'Chapter not found',
      });
    }

    // Upload file lên S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `audio/${Date.now()}_${file_name}`,
      Body: Buffer.from(file_content, 'base64'),
      ContentType: file_type,
    };

    const s3Response = await s3Client.upload(params).promise();

    // Tạo MediaFile mới
    const newMediaFile = new MediaFile({
      file_collection: 'audio',
      file_url: s3Response.Location,
      file_type,
      file_size,
    });

    await newMediaFile.save();

    // Thêm file vào danh sách audio_file của chapter
    chapter.audio_file.push(newMediaFile._id);
    await chapter.save();

    // Trả về response
    const response = {
      media_file_id: newMediaFile._id.toString(),
      chapter_id: chapter_id,
      file_url: s3Response.Location,
    };

    callback(null, response);
  } catch (error) {
    console.error('Error adding audio file:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const server = new grpc.Server();
server.addService(bookProto.BookService.service, { 
  CreateBook: createBook,
  CreateAuthor: createAuthor,
  CreateMediaFile: createMediaFile,
  UploadMediaFile: uploadMediaFile,

  CreateChapter: createChapter,
  GetAllChapters: getAllChapters,
  GetChaptersByBookId: getChaptersByBookId,
  GetChapterById: getChapterById,
  //! func edit chapter still bug
  EditChapter: editChapter,
  CreateComment: createComment,
  AddAudioFile: addAudioFile
});
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50053');
  // server.start();
});
