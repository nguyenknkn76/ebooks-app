const mongoose = require('mongoose');
const Book = require('./models/book'); // Import model Book
const History = require('./models/history'); // Import model History
const Rating = require('./models/rating'); // Import model Rating
const Chapter = require('./models/chapter'); // Import model Chapter

exports.getBookDetails = async (bookId) => {
  try {
    // Lấy thông tin cơ bản của sách cùng với các trường tham chiếu
    const book = await Book.findById(bookId)
      .populate('author', 'name')
      .populate('cover_img', 'file_url')
      .populate('chapters', 'name')
      .populate('ratings', 'user rating review')
      .lean();

    if (!book) {
      return null;
    }

    // Tính average rating và total rating
    const ratingsAggregation = await Rating.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      {
        $group: {
          _id: '$book',
          avg_rating: { $avg: '$rating' },
          total_ratings: { $sum: 1 }
        }
      }
    ]);

    const ratingsData = ratingsAggregation.length > 0 ? ratingsAggregation[0] : { avg_rating: 0, total_ratings: 0 };

    // Tính total views
    const viewsAggregation = await History.aggregate([
      { $match: { 'chapter.book': new mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: '$chapter.book', total_views: { $sum: 1 } } }
    ]);

    const viewsData = viewsAggregation.length > 0 ? viewsAggregation[0] : { total_views: 0 };

    return {
      ...book,
      avg_rating: ratingsData.avg_rating,
      total_ratings: ratingsData.total_ratings,
      total_views: viewsData.total_views
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};



exports.getMostUsedVoiceForBook = async (bookId) => {
  try {
    // Lấy các chương của cuốn sách bằng bookId
    const chapters = await Chapter.find({ book: bookId }).select('_id');

    // Trích xuất các chapterId từ kết quả tìm kiếm
    const chapterIds = chapters.map(chapter => chapter._id);

    // Tính số lần sử dụng mỗi voice từ lịch sử sử dụng
    const voices = await History.aggregate([
      { $match: { chapter: { $in: chapterIds } } },
      { $group: { _id: '$voice', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    // Trả về voice được sử dụng nhiều nhất
    if (voices.length > 0) {
      return voices[0]._id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching most used voice:', error);
    return null;
  }
};

exports.getAllBooksWithAvgRating = async () => {
  try {
    const books = await Book.aggregate([
      {
        $lookup: {
          from: 'ratings', // Collection to join
          localField: 'ratings', // Field from the Book collection
          foreignField: '_id', // Field from the Rating collection
          as: 'ratings_info' // New field to hold the joined ratings
        }
      },
      {
        $unwind: {
          path: '$ratings_info',
          preserveNullAndEmptyArrays: true // Include books without ratings
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          author: { $first: '$author' },
          genres: { $first: '$genres' },
          description: { $first: '$description' },
          publish_year: { $first: '$publish_year' },
          cover_img: { $first: '$cover_img' },
          chapters: { $first: '$chapters' },
          ratings: { $push: '$ratings_info' },
          avg_rating2: { $avg: '$ratings_info.rating' }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          author: 1,
          genres: 1,
          description: 1,
          publish_year: 1,
          cover_img: 1,
          chapters: 1,
          avg_rating2: { $ifNull: ['$avg_rating2', 0] }
        }
      }
    ]);

    return books;
  } catch (error) {
    console.error('Error fetching books with average rating:', error);
    return [];
  }
};



exports.getMostReadBooks = async () => {
  try {
    const books = await History.aggregate([
      {
        $lookup: {
          from: 'chapters',
          localField: 'chapter',
          foreignField: '_id',
          as: 'chapter_info'
        }
      },
      { $unwind: "$chapter_info" },
      {
        $lookup: {
          from: 'books',
          localField: 'chapter_info.book',
          foreignField: '_id',
          as: 'book_info'
        }
      },
      { $unwind: "$book_info" },
      {
        $group: {
          _id: "$book_info._id",
          book: { $first: "$book_info" },
          readCount: { $sum: 1 }
        }
      },
      { $sort: { readCount: -1 } }
    ]);

    return books;
  } catch (error) {
    console.error('Error fetching most read books:', error);
    return [];
  }
};


