const grpc = require('@grpc/grpc-js');
const genreService = require('../../services/genreService');

const createGenre = async (call, callback) => {
  try {
    const { name, description } = call.request;
    const genre = await genreService.createGenre({ name, description });

    callback(null, {
      id: genre._id.toString(),
      name: genre.name,
      description: genre.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllGenres = async (call, callback) => {
  try {
    const genres = await genreService.getAllGenres();
    callback(null, {
      genres: genres.map(genre => ({
        id: genre._id.toString(),
        name: genre.name,
        description: genre.description
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getGenreById = async (call, callback) => {
  try {
    const genre = await genreService.getGenreById(call.request.id);
    
    if (!genre) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Genre not found'
      });
    }

    callback(null, {
      id: genre._id.toString(),
      name: genre.name,
      description: genre.description
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById
};