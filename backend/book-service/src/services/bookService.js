const Book = require('../models/book');
const Author = require('../models/author');

const createBook = async (bookData) => {
  const { title, author, genres, description, publish_year } = bookData;
  
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
  const authorToUpdate = await Author.findById(author);
  if(!authorToUpdate) throw new Error('Author not found');
  
  authorToUpdate.books.push(savedBook._id);
  await authorToUpdate.save();
  
  return savedBook;
};

const getAllBooks = async () => {
  return await Book.find({})
    .populate({
      path: 'author',
      select: '_id pen_name name',
    })
    .populate({
      path: 'cover_img',
      select: 'file_url',
    });
};

const getBookById = async (id) => {
  return await Book.findById(id)
    .populate({
      path: 'author',
      select: '_id pen_name name',
    })
    .populate({
      path: 'cover_img',
      select: '_id file_url',
    })
    .populate({
      path: 'chapters',
      select: '_id name',
    })
    .populate({
      path: 'ratings',
      select: '_id user rating review',
      options: {limit: 3},
    });
};

const updateBook = async (id, bookData) => {
  const { title, author, genres, description, publish_year } = bookData;
  
  return await Book.findByIdAndUpdate(
    id,
    { 
      title, 
      author, 
      genres, 
      description, 
      publish_year,
      updated_at: new Date() 
    },
    { new: true }
  );
};

const updateBookRating = async (bookId, ratingId, ratings) => {
  const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  
  return await Book.findByIdAndUpdate(
    bookId,
    { 
      $push: { ratings: ratingId },
      avg_rating: avgRating.toFixed(2)
    },
    { new: true }
  );
};

const addChapterToBook = async (bookId, chapterId) => {
  return await Book.findByIdAndUpdate(
    bookId,
    { $push: { chapters: chapterId }},
    { new: true }
  );
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  updateBookRating,
  addChapterToBook
};