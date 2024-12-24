const libraryService = require('../../services/libraryService');
const grpc = require('@grpc/grpc-js');

const formatLibraryResponse = (library) => ({
  id: library._id.toString(),
  user: library.user,
  name: library.name,
  books: library.books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
  })),
});

const createLibrary = async (call, callback) => {
  try {
    const savedLibrary = await libraryService.createLibrary(call.request);
    callback(null, {
      id: savedLibrary._id.toString(),
      message: 'Library created successfully',
    });
  } catch (error) {
    console.error('Error creating library:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
};

const getAllLibraries = async (call, callback) => {
  try {
    const libraries = await libraryService.getAllLibraries();
    callback(null, {
      libraries: libraries.map(formatLibraryResponse)
    });
  } catch (error) {
    console.error('Error fetching libraries:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
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
    callback(null, formatLibraryResponse(library));
  } catch (error) {
    console.error('Error fetching library:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

const getLibrariesByUserId = async (call, callback) => {
  try {
    const libraries = await libraryService.getLibrariesByUserId(call.request.id);
    if (!libraries.length) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'No libraries found for this user'
      });
    }
    callback(null, {
      libraries: libraries.map(formatLibraryResponse)
    });
  } catch (error) {
    console.error('Error fetching libraries:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createLibrary,
  getAllLibraries,
  getLibraryById,
  getLibrariesByUserId
};