const { request } = require('express');
const Book = require('../models/book');
const Author = require('../models/author');

/*
	req: book attributes
	do: create book, update author
	res: book (id, title, author)
*/
const createBook = async (call, callback) => {
	try {
    const { title, author, genres, description, publish_year } = call.request;
		console.log(call.request);

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
		authorToUpdate.books.push(authorToUpdate._id);
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
}