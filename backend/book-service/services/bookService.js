const { request } = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const MediaFile = require('../models/mediaFile');
const Chapter = require('../models/chapter');
/*
	req: book attributes
	do: create book, update author
	res: book (id, title, author)
*/
const createBook = async (call, callback) => {
	try {
    const { title, author, genres, description, publish_year } = call.request;
		// console.log(call.request);

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
		const savedAuthor = await authorToUpdate.save();
		// console.log(savedAuthor, savedBook);
		// const rs = {
		// 	book: savedBook,
		// 	author: savedAuthor
		// }
		// console.log('this is rs:', rs);
    callback(null, {id: savedBook.id, title: savedBook.title, author: savedBook.author});
  } catch (error) {
    console.error('Error creating book:', error);
    callback(error);
  }
}
const getAllBooks = async (call, callback) => {
  try {
    const books = await Book.find({})
      .populate({
        path: 'author',
        select: '_id pen_name name',
      })
      .populate({
        path: 'cover_img',
        select: 'file_url',
      });

    const formattedBooks = books.map((book) => ({
      id: book._id.toString(),
      title: book.title,
      author: book.author ? {
        id: book.author._id.toString(),
        pen_name: book.author.pen_name,
        name: book.author.name,
      } : null,
      genres: book.genres,
      description: book.description || '',
      publish_year: book.publish_year || 0,
      cover_img: book.cover_img?.file_url || '',
      avg_rating: book.avg_rating,
      count_rating: book.ratings.length,
    }));

    callback(null, { books: formattedBooks });
  } catch (error) {
    console.error('Error fetching books:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getBookById = async (call, callback) => {
  const { id } = call.request;
  // console.log('this is book_id:', call.request);
  console.log(id);
  try {
    const book = await Book.findById(id)
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
        // options: {slice: -3}
      });
    if (!book) {
      return callback({
        code: 404,
        message: 'Book not found',
      });
    }

    //* use to get exactly 3 recent ratings records
    // const ratings = await Rating.find({ _id: { $in: book.ratings } }) 
    //   .sort({ _id: -1 }) 
    //   .limit(3);

    const response = {
      id: book._id.toString(),
      title: book.title,
      author: {
        id: book.author?._id.toString() || '',
        pen_name: book.author?.pen_name || '',
        name: book.author?.name || '',
      },
      genres: book.genres,
      description: book.description || '',
      publish_year: book.publish_year || 0,
      cover_img: book.cover_img?.file_url || '',
      chapters: book.chapters.map((chapter) => ({
        id: chapter._id.toString(),
        name: chapter.name,
      })),
      ratings: book.ratings.map((r) => ({
        id: r._id.toString(),
        user: r.user,
        rating: r.rating.toFixed(2),
        review: r.review
      })),
      count_rating: book.ratings.length,
      avg_rating: book.avg_rating,
    };
    // console.log(response);
    callback(null, { book: response });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};


const updateBook = async (call, callback) => {
  const { id, title, author, genres, description, publish_year } = call.request;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
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

    if (!updatedBook) {
      return callback({ code: grpc.status.NOT_FOUND, message: 'Book not found' });
    }
		
    callback(null, { 
      id: updatedBook.id,
      title: updatedBook.title, 
      author: updatedBook.author,
      genres: updatedBook.genres,
      description: updatedBook.description,
      publish_year: updatedBook.publish_year,
      updated_at: updatedBook.updated_at
    });
  } catch (error) {
    console.error('Error updating book:', error);
    callback(error);
  }
}

module.exports = {
	createBook,
	updateBook,
  getAllBooks,
  getBookById,
}