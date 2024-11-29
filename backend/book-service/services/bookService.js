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
    const books = await Book.find()
      .populate('author', '_id pen_name name')
      // .populate('chapters', '_id name')
      .populate('cover_img', '_id file_url file_type')
      .populate('ratings', '_id user rating review');

    const response = books.map((book) => ({
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      genres: book.genres,
      description: book.description,
      publish_year: book.publish_year,
      created_at: book.created_at,
      updated_at: book.updated_at,
      cover_img: book.cover_img,
      avg_rating: book.avg_rating,
      // ratings: book.ratings.map((rating) => ({
      //   id: rating._id.toString(),
      //   user: rating.user,
      //   rating: rating.rating,
      //   review: rating.review || '',
      // })),
    }));
    // console.log(books[0]);
    console.log('this is book service response:', response[0]);
    callback(null, { books: response });
  } catch (error) {
    console.error('Error fetching books:', error);
    callback({
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getBookById = async (call, callback) => {
  try {
    const { id } = call.request;

    const book = await Book.findById(id)
      .populate('author', 'id pen_name name')
      .populate('cover_img', 'id file_url file_type')
      .populate({
        path: 'ratings',
        select: 'id user rating review',
      })
      .populate({
        path: 'chapters',
        select: 'id name text_file audio_file',
      });

    if (!book) {
      return callback({
        code: 404,
        message: 'Book not found',
      });
    }

    const response = {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      genres: book.genres,
      description: book.description,
      publish_year: book.publish_year,
      created_at: book.created_at,
      updated_at: book.updated_at,
      avg_rating: book.avg_rating.toFixed(2),
      cover_img: book.cover_img,
      chapters: book.chapters,
      ratings: book.ratings,
    };

    callback(null, response);
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