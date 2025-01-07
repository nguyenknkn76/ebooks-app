const bookClient = require('../grpc/clients/bookClient');
const voiceClient = require('../grpc/clients/voiceClient');
const userClient = require('../grpc/clients/userClient');
const voiceController = require('./voiceController');
const grpc = require('@grpc/grpc-js');

const createAuthor = async (req, res) => {
  try {
    const { pen_name, name, description } = req.body;
    const response = await bookClient.createAuthor({ 
      pen_name, 
      name, 
      description 
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllAuthors = async (req, res) => {
  try {
    const response = await bookClient.getAllAuthors();
    res.json(response.authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const response = await bookClient.getAuthorById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    const response = await bookClient.createGenre({ name, description });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const response = await bookClient.getAllGenres();
    res.json(response.genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGenreById = async (req, res) => {
  try {
    const response = await bookClient.getGenreById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genres, description, publish_year, cover_img, status } = req.body;
    const response = await bookClient.createBook({ 
      title, 
      author,
      genres, 
      description, 
      publish_year, 
      cover_img,
      status
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const query = { ...req.query };
    
    if (query.genres) {
      query.genres = Array.isArray(query.genres) ? query.genres : [query.genres];
    }

    if (query.publish_year) {
      query.publish_year = parseInt(query.publish_year);
    }

    const response = await bookClient.getAllBooks(query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const response = await bookClient.getBookById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createBookWithCover = async (req, res) => {
  try {
    const { title, author, genres, description, publish_year, status } = req.body;
    const coverImage = req.file;

    if (!coverImage) {
      return res.status(400).json({ error: 'Cover image is required' });
    }

    const response = await bookClient.createBookWithCover({
      title,
      author,
      genres: JSON.parse(genres),
      description,
      publish_year: parseInt(publish_year),
      status,
      cover_image: {
        file_name: coverImage.originalname,
        file_content: coverImage.buffer.toString('base64'),
        file_type: coverImage.mimetype
      }
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genres, description, publish_year, status } = req.body;
    const coverImage = req.file;

    const updateData = {
      title,
      author,
      genres: genres ? JSON.parse(genres) : undefined,
      description,
      publish_year: publish_year ? parseInt(publish_year) : undefined,
      status
    };

    if (coverImage) {
      updateData.new_cover_image = {
        file_name: coverImage.originalname,
        file_content: coverImage.buffer.toString('base64'),
        file_type: coverImage.mimetype
      };
    }

    const response = await bookClient.updateBook(id, updateData);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createChapter = async (req, res) => {
  try {
    const { chapter_number, name, book } = req.body;
    
    const response = await bookClient.createChapter({
      chapter_number: parseInt(chapter_number),
      name,
      book
    });
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getChaptersByBookId = async (req, res) => {
  try {
    const response = await bookClient.getChaptersByBookId(req.params.bookId);
    res.json(response.chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChapterById = async (req, res) => {
  try {
    const response = await bookClient.getChapterById({
      id: req.params.id
    });
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapter_number, name, book } = req.body;
    const textFile = req.file;

    const updateData = {
      chapter_number: parseInt(chapter_number),
      name,
      book
    };
    // console.log('updateData', updateData);
    if (textFile) {
      updateData.text_file = {
        file_name: textFile.originalname,
        file_content: textFile.buffer.toString('base64'),
        file_type: textFile.mimetype
      };
    }

    const chapter = await bookClient.updateChapter(id, updateData);
    // console.log(chapter);
    // Get audio files from voice service
    const audioFilesResponse = await voiceController.createAudioFiles2(chapter.text_file.file_url);
    console.log(audioFilesResponse);
    // Update chapter with audio files
    if (audioFilesResponse?.audio_files?.length > 0) {
      await bookClient.updateChapter2(id, audioFilesResponse.audio_files);
    }

    res.json({
      ...chapter,
      audio_files: audioFilesResponse.audio_files
    });
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createComment = async (req, res) => {
  try {
    const { content, user, chapter } = req.body;
    
    const response = await bookClient.createComment({
      content,
      user,
      chapter
    });
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByChapterId = async (req, res) => {
  try {
    // Get comments
    const response = await bookClient.getCommentsByChapterId(req.params.chapterId);
    
    if (!response || !response.comments) {
      return res.json([]);
    }
    
    const comments = response.comments;
    
    if (!comments || comments.length === 0) {
      return res.json([]);
    }

    // Extract unique user IDs
    const userIds = [...new Set(comments.map(comment => comment.user))];

    // Fetch users data
    const users = await userClient.getUsersByUserIds(userIds);

    // Create user lookup map
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    // Combine comments with user data
    const commentsWithUsers = comments.map(comment => ({
      ...comment,
      user: userMap[comment.user] || { id: comment.user }
    }));

    res.json(commentsWithUsers);
  } catch (error) {
    console.error('Error in getCommentsByChapterId:', error);
    res.status(500).json({ error: error.message });
  }
};
const createRating = async (req, res) => {
  try {
    const { user, book, star, review } = req.body;
    
    const response = await bookClient.createRating({
      user,
      book,
      star: parseInt(star),
      review
    });
    
    res.status(201).json(response);
  } catch (error) {
    if (error.code === grpc.status.INVALID_ARGUMENT) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// const getRatingsByBookId = async (req, res) => {
//   try {
//     const response = await bookClient.getRatingsByBookId(req.params.bookId);
//     // console.log(response.ratings);
//     res.json(response.ratings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getRatingsByBookId = async (req, res) => {
  try {
    // Get ratings
    const response = await bookClient.getRatingsByBookId(req.params.bookId);
    
    // Check if response or ratings is undefined/null
    if (!response || !response.ratings) {
      return res.json([]);
    }
    
    const ratings = response.ratings;
    
    // If no ratings, return empty array
    if (!ratings || ratings.length === 0) {
      return res.json([]);
    }

    // Extract unique user IDs
    const userIds = [...new Set(ratings.map(rating => rating.user))];

    // Fetch users data
    const users = await userClient.getUsersByUserIds(userIds);

    // Create user lookup map
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    // Combine ratings with user data
    const ratingsWithUsers = ratings.map(rating => ({
      ...rating,
      user: userMap[rating.user] || { id: rating.user }
    }));

    res.json(ratingsWithUsers);
  } catch (error) {
    console.error('Error in getRatingsByBookId:', error);
    res.status(500).json({ error: error.message });
  }
};

const createLibrary = async (req, res) => {
  try {
    const { user, name } = req.body;
    
    const response = await bookClient.createLibrary({
      user,
      name
    });
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLibrariesByUserId = async (req, res) => {
  try {
    const response = await bookClient.getLibrariesByUserId(req.params.userId);
    res.json(response.libraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllHistories = async (req, res) => {
  try {
    const response = await bookClient.getAllHistories();
    res.json(response.histories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistoriesByUserId = async (req, res) => {
  try {
    const response = await bookClient.getHistoriesByUserId(req.params.userId);
    res.json(response.histories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHistory = async (req, res) => {
  try {
    const { user, chapter, voice } = req.body;
    
    const response = await bookClient.createHistory({
      user,
      chapter,
      voice
    });
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistoriesByBookId = async (req, res) => {
  try {
    const response = await bookClient.getHistoriesByBookId(req.params.bookId);
    res.json(response.histories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMostUsedVoiceFromHistories = async (req, res) => {
  try {
    const response = await bookClient.getMostUsedVoiceFromHistories(req.params.bookId);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getLastUsedVoiceFromHistories = async (req, res) => {
  try {
    const response = await bookClient.getLastUsedVoiceFromHistories(req.params.userId);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const countBooks = async (req, res) => {
  try {
    const response = await bookClient.countBooks();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countBooksThisMonth = async (req, res) => {
  try {
    const response = await bookClient.countBooksThisMonth();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalBooksInTwelveMonths = async (req, res) => {
  try {
    const response = await bookClient.getTotalBooksInTwelveMonths();
    res.json(response.monthly_totals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistoriesBooksByUserId = async (req, res) => {
  try {
    const response = await bookClient.getHistoriesBooksByUserId(req.params.userId);
    res.json(response.books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByMonthly = async (req, res) => {
  try {
    const response = await bookClient.getBooksByMonthly();
    res.json(response.books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByViews = async (req, res) => {
  try {
    const response = await bookClient.getBooksByViews();
    res.json(response.books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByCreatedTime = async (req, res) => {
  try {
    const response = await bookClient.getBooksByCreatedTime();
    res.json(response.books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooksByUpdatedTime = async (req, res) => {
  try {
    const response = await bookClient.getBooksByUpdatedTime();
    res.json(response.books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLibrary = async (req, res) => {
  try {
    const response = await bookClient.updateLibrary(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLibrary = async (req, res) => {
  try {
    await bookClient.deleteLibrary(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLibraryById = async (req, res) => {
  try {
    const response = await bookClient.getLibraryById(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.code === grpc.status.NOT_FOUND) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
module.exports = {
  deleteLibrary,
  getLibraryById,
  updateLibrary,
  getBooksByCreatedTime,
  getBooksByUpdatedTime,
  getBooksByMonthly,
  getBooksByViews,
  getHistoriesBooksByUserId,
  getTotalBooksInTwelveMonths,
  getLastUsedVoiceFromHistories,
  getMostUsedVoiceFromHistories,
  getHistoriesByBookId,
  createHistory,
  getAllHistories,
  getHistoriesByUserId,
  getLibrariesByUserId,
  createLibrary,
  getRatingsByBookId,
  createRating,
  getCommentsByChapterId,
  createComment,
  updateChapter,
  getChaptersByBookId,
  getChapterById,
  createChapter,
  updateBook,
  createBookWithCover, 
  getAllBooks,
  getBookById,
  createGenre,
  getAllGenres,
  getGenreById,
  createAuthor,
  getAllAuthors,
  getAuthorById,
  createBook,
  countBooks,
  countBooksThisMonth
};