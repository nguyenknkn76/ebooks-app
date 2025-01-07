const Library = require('../models/library');

const createLibrary = async (libraryData) => {
  const library = new Library(libraryData);
  return await library.save();
};

const getUserLibraries = async (userId) => {
  return await Library.find({ user: userId })
    .populate('books');
};

const getLibraryById = async (id) => {
  return await Library.findById(id)
    .populate({
      path: 'books',
      populate: [
        { 
          path: 'author',
          select: 'id pen_name name description'
        },
        { 
          path: 'genres',
          select: 'id name description'
        },
        {
          path: 'cover_img',
          select: 'id file_collection file_url file_type file_size'
        }
      ]
    });
};

const updateLibrary = async (id, libraryData) => {
  return await Library.findByIdAndUpdate(
    id,
    {
      ...libraryData,
      updated_at: Date.now()
    },
    { new: true }
  ).populate('books');
};

const deleteLibrary = async (id) => {
  return await Library.findByIdAndDelete(id);
};

module.exports = {  
  createLibrary,
  getUserLibraries,
  getLibraryById,
  updateLibrary,
  deleteLibrary
};