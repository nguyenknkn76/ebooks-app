exports.formatBook = (book) => ({
  id: book._id.toString(),
  title: book.title,
  author: {
    id: book.author._id.toString(),
    pen_name: book.author.pen_name,
    name: book.author.name,
    description: book.author.description
  },
  genres: book.genres?.map(genre => ({
    id: genre._id.toString(),
    name: genre.name,
    description: genre.description
  })),
  description: book.description,
  publish_year: book.publish_year,
  cover_img: book.cover_img ? {
    id: book.cover_img._id.toString(),
    file_collection: book.cover_img.file_collection,
    file_url: book.cover_img.file_url,
    file_type: book.cover_img.file_type,
    file_size: book.cover_img.file_size
  } : null,
  status: book.status,
  avg_rating: book.avg_rating,
  views: book.views,
  followers: book.followers,
  monthly_views: book.monthly_views
});