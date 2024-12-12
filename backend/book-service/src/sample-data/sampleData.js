// const mongoose = require('mongoose');
// const Book = require('../models/book');
// const Author = require('../models/author');
// const Rating = require('../models/rating');
// const Chapter = require('../models/chapter');
// const Comment = require('../models/comment');
// const History = require('../models/history');
// const Library = require('../models/library');
// const MediaFile = require('../models/mediaFile');
// const { v4: uuidv4 } = require('uuid');

// // Sample data
// const createSampleData = async () => {
//   try {
//     // Clear existing data
//     await Book.deleteMany();
//     await Author.deleteMany();
//     await Rating.deleteMany();
//     await Chapter.deleteMany();
//     await Comment.deleteMany();
//     await History.deleteMany();
//     await Library.deleteMany();
//     await MediaFile.deleteMany();

//     // MediaFiles
//     const mediaFiles = await MediaFile.insertMany([
//       { id: uuidv4(), file_collection: 'cover', file_url: 'http://example.com/cover1.jpg', file_type: 'image', file_size: 1024 },
//       { id: uuidv4(), file_collection: 'text', file_url: 'http://example.com/chapter1.txt', file_type: 'text', file_size: 2048 },
//       { id: uuidv4(), file_collection: 'audio', file_url: 'http://example.com/audio1.mp3', file_type: 'audio', file_size: 4096 },
//     ]);

//     // Authors
//     const authors = await Author.insertMany([
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c8765', pen_name: 'J.K. Rowling', name: 'Joanne Rowling', description: 'British author' },
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c8766', pen_name: 'George R.R. Martin', name: 'George Raymond Martin', description: 'American novelist and short story writer' },
//     ]);

//     // Books
//     const books = await Book.insertMany([
//       {
//         id: uuidv4(), 
//         title: 'Harry Potter and the Philosopher\'s Stone',
//         author_id: authors[0]._id,
//         genres: ['Fantasy', 'Adventure'],
//         description: 'A young wizard\'s journey begins...',
//         publish_year: 1997,
//         created_at: new Date(),
//         updated_at: new Date(),
//         cover_img: mediaFiles[0]._id,
//       },
//       {
//         id: uuidv4(), 
//         title: 'A Game of Thrones',
//         author_id: authors[1]._id,
//         genres: ['Fantasy', 'Drama'],
//         description: 'The epic fantasy series begins...',
//         publish_year: 1996,
//         created_at: new Date(),
//         updated_at: new Date(),
//         cover_img: mediaFiles[0]._id,
//       },
//     ]);

//     // Ratings
//     await Rating.insertMany([
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c8767', book_id: books[0]._id, rating: 5, review: 'Amazing book!' },
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c8768', book_id: books[1]._id, rating: 4, review: 'Very captivating!' },
//     ]);

//     // Chapters
//     const chapters = await Chapter.insertMany([
//       { id: uuidv4(), name: 'Chapter 1', book_id: books[0]._id, text_file: mediaFiles[1]._id, audio_file: mediaFiles[2]._id },
//       { id: uuidv4(), name: 'Chapter 1', book_id: books[1]._id, text_file: mediaFiles[1]._id, audio_file: mediaFiles[2]._id },
//     ]);

//     // Comments
//     await Comment.insertMany([
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c8769', chapter_id: chapters[0]._id, comment: 'Loved this chapter!', created_at: new Date(), replies: [] },
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c876a', chapter_id: chapters[1]._id, comment: 'Very interesting!', created_at: new Date(), replies: [] },
//     ]);

//     // Histories
//     await History.insertMany([
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c876b', book_id: books[0]._id, voice_id: '60e3b9f71b1a5c6d3c9c876d', chapters: [chapters[0]._id] },
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c876c', book_id: books[1]._id, voice_id: '60e3b9f71b1a5c6d3c9c876e', chapters: [chapters[1]._id] },
//     ]);

//     // Libraries
//     await Library.insertMany([
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c876f', name: 'Favorites', books: [books[0]._id, books[1]._id] },
//       { id: uuidv4(), user_id: '60e3b9f71b1a5c6d3c9c8770', name: 'To Read', books: [books[1]._id] },
//     ]);

//     console.log('Sample data inserted successfully');
//     process.exit();
//   } catch (error) {
//     console.error('Error inserting sample data:', error);
//     process.exit(1);
//   }
// };

// module.exports = {createSampleData}
