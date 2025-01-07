const grpc = require('@grpc/grpc-js');
const libraryService = require('../../services/libraryService');
const formatData = require('../../utils/formatData');

const createLibrary = async (call, callback) => {
  try {
    const { user, name } = call.request;
    
    const library = await libraryService.createLibrary({
      user,
      name,
      books: []
    });

    const populatedLibrary = await libraryService.getLibraryById(library._id);

    callback(null, {
      id: populatedLibrary._id.toString(),
      user: populatedLibrary.user,
      name: populatedLibrary.name,
      books: [], // Return empty array
      created_at: populatedLibrary.created_at.toISOString(),
      updated_at: populatedLibrary.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getLibrariesByUserId = async (call, callback) => {
  try {
    const libraries = await libraryService.getUserLibraries(call.request.user_id);
    
    callback(null, {
      libraries: libraries.map(library => ({
        id: library._id.toString(),
        user: library.user,
        name: library.name,
        books: library.books.map(book => formatData.formatBook(book)),
        created_at: library.created_at.toISOString(),
        updated_at: library.updated_at?.toISOString()
      }))
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const updateLibrary = async (call, callback) => {
  try {
    const { id, ...updateData } = call.request;
    const library = await libraryService.updateLibrary(id, updateData);
    
    callback(null, {
      id: library._id.toString(),
      user: library.user,
      name: library.name,
      books: library.books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        description: book.description,
        cover_img: book.cover_img,
        status: book.status
      })),
      created_at: library.created_at.toISOString(),
      updated_at: library.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const deleteLibrary = async (call, callback) => {
  try {
    await libraryService.deleteLibrary(call.request.id);
    callback(null, {});
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getLibraryById = async (call, callback) => {
  try {
    const library = await libraryService.getLibraryById(call.request.id);
    if (!library) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Library not found'
      });
    }
    
    callback(null, {
      id: library._id.toString(),
      user: library.user,
      name: library.name,
      books: library.books.map(book => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        description: book.description,
        cover_img: book.cover_img,
        status: book.status
      })),
      created_at: library.created_at.toISOString(),
      updated_at: library.updated_at?.toISOString()
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

module.exports = {
  deleteLibrary,
  getLibraryById,
  createLibrary,
  getLibrariesByUserId,
  updateLibrary
};