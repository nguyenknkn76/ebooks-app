const Genre = require('../models/genre');

const createGenre = async (genreData) => {
  const genre = new Genre(genreData);
  return await genre.save();
};

const getAllGenres = async () => {
  return await Genre.find();
};

const getGenreById = async (id) => {
  return await Genre.findById(id);
};

const updateGenre = async (id, genreData) => {
  return await Genre.findByIdAndUpdate(id, genreData, { new: true });
};

const deleteGenre = async (id) => {
  return await Genre.findByIdAndDelete(id);
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre
};