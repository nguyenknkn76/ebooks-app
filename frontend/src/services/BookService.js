import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/books'
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const config = () => {
    return {
        headers: { Authorization: token }
    }
}

// Books
const getAllBooks = async (params) => {
    const queryParams = { ...params };
    if (params.rating_filter) {
        queryParams.rating_filter = params.rating_filter;
    }
    if (params.genres && Array.isArray(params.genres)) {
        queryParams.genres = params.genres;
    }
    if (params.publish_year) {
        queryParams.publish_year = parseInt(params.publish_year);
    }
    const res = await axios.get(baseUrl, { 
        params: queryParams,
        paramsSerializer: params => {
            return Object.entries(params)
                .filter(([, value]) => value !== undefined && value !== '')
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return value.map(v => `${key}=${v}`).join('&');
                    }
                    return `${key}=${value}`;
                }).join('&');
        }
    });
    return res.data;
}

const getBookById = async (id) => {
    const res = await axios.get(`${baseUrl}/book/${id}`)
    return res.data
}

const createBook = async (bookData) => {
    const res = await axios.post(baseUrl, bookData, config())
    return res.data
}

const createBookWithCover = async (bookData) => {
    const formData = new FormData()
    Object.keys(bookData).forEach(key => {
        if (key === 'genres') {
            formData.append(key, JSON.stringify(bookData[key]))
        } else if (key === 'cover_image') {
            formData.append('cover_image', bookData[key])
        } else {
            formData.append(key, bookData[key])
        }
    })
    const res = await axios.post(`${baseUrl}`, formData, {
        ...config(),
        headers: { ...config().headers, 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

const updateBook = async (id, bookData) => {
    const formData = new FormData()
    Object.keys(bookData).forEach(key => {
        if (key === 'genres') {
            formData.append(key, JSON.stringify(bookData[key]))
        } else if (key === 'cover_image') {
            formData.append('cover_image', bookData[key])
        } else {
            formData.append(key, bookData[key])
        }
    })
    const res = await axios.put(`${baseUrl}/${id}`, formData, {
        ...config(),
        headers: { ...config().headers, 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

// Authors
const getAllAuthors = async () => {
    const res = await axios.get(`${baseUrl}/authors`)
    return res.data
}

const getAuthorById = async (id) => {
    const res = await axios.get(`${baseUrl}/authors/${id}`)
    return res.data
}

const createAuthor = async (authorData) => {
    const res = await axios.post(`${baseUrl}/authors`, authorData, config())
    return res.data
}

// Genres
const getAllGenres = async () => {
    const res = await axios.get(`${baseUrl}/genres`)
    return res.data
}

const getGenreById = async (id) => {
    const res = await axios.get(`${baseUrl}/genres/${id}`)
    return res.data
}

const createGenre = async (genreData) => {
    const res = await axios.post(`${baseUrl}/genres`, genreData, config())
    return res.data
}

// Chapters
const createChapter = async (chapterData) => {
    const res = await axios.post(`${baseUrl}/chapters`, chapterData, config())
    return res.data
}

const getChaptersByBookId = async (bookId) => {
    const res = await axios.get(`${baseUrl}/${bookId}/chapters`)
    return res.data
}

const getChapterById = async (id) => {
    const res = await axios.get(`${baseUrl}/chapters/${id}`)
    return res.data
}

const updateChapter = async (id, chapterData) => {
    const formData = new FormData()
    Object.keys(chapterData).forEach(key => {
        if (key === 'text_file') {
            formData.append('text_file', chapterData[key])
        } else {
            formData.append(key, chapterData[key])
        }
    })
    const res = await axios.put(`${baseUrl}/chapters/${id}`, formData, {
        ...config(),
        headers: { ...config().headers, 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

// Comments
const createComment = async (commentData) => {
    const res = await axios.post(`${baseUrl}/chapters/comments`, commentData, config())
    return res.data
}

const getCommentsByChapterId = async (chapterId) => {
    const res = await axios.get(`${baseUrl}/chapters/${chapterId}/comments`)
    return res.data
}

// Ratings
const createRating = async (ratingData) => {
    const res = await axios.post(`${baseUrl}/ratings`, ratingData, config())
    return res.data
}

const getRatingsByBookId = async (bookId) => {
    const res = await axios.get(`${baseUrl}/${bookId}/ratings`)
    return res.data
}

// Libraries
const createLibrary = async (libraryData) => {
    const res = await axios.post(`${baseUrl}/libraries`, libraryData, config())
    return res.data
}

const getLibrariesByUserId = async (userId) => {
    const res = await axios.get(`${baseUrl}/libraries/user/${userId}`)
    return res.data
}

const deleteLibrary = async (libraryId) => {
    const res = await axios.delete(`${baseUrl}/libraries/${libraryId}`, config())
    return res.data
}

const getLibraryById = async (libraryId) => {
    const res = await axios.get(`${baseUrl}/libraries/${libraryId}`)
    return res.data
}

const updateLibrary = async (libraryId, libraryData) => {
    const res = await axios.put(`${baseUrl}/libraries/${libraryId}`, libraryData, config())
    return res.data
}

const removeBookFromLibrary = async (libraryId, bookId) => {
    const library = await getLibraryById(libraryId);
    const updatedBooks = library.books.filter(book => book.id !== bookId).map(book => book.id);
    
    return await axios.put(`${baseUrl}/libraries/${libraryId}`, {
        name: library.name,
        books: updatedBooks
    }, config());
};

// Histories
const createHistory = async (historyData) => {
    const res = await axios.post(`${baseUrl}/histories`, historyData, config())
    return res.data
}

const getAllHistories = async () => {
    const res = await axios.get(`${baseUrl}/histories`)
    return res.data
}

const getHistoriesByUserId = async (userId) => {
    const res = await axios.get(`${baseUrl}/histories/user/${userId}`)
    return res.data
}

const getHistoriesByBookId = async (bookId) => {
    const res = await axios.get(`${baseUrl}/histories/book/${bookId}`)
    return res.data
}

const getMostUsedVoiceFromHistories = async (bookId) => {
    const res = await axios.get(`${baseUrl}/histories/book/${bookId}/most-used-voice`)
    return res.data
}

const getLastUsedVoiceFromHistories = async (userId) => {
    const res = await axios.get(`${baseUrl}/histories/user/${userId}/last-voice`)
    return res.data
}

//stat
const countBooks = async () => {
    const res = await axios.get(`${baseUrl}/count/total`)
    return res.data
}

const countBooksThisMonth = async () => {
    const res = await axios.get(`${baseUrl}/count/monthly`)
    return res.data
}

const getTotalBooksInTwelveMonths = async () => {
    const res = await axios.get(`${baseUrl}/stats/monthly-totals`);
    return res.data;
};

// get books by sm condition => need to merge this func after
const getBooksByMonthly = async () => {
    const res = await axios.get(`${baseUrl}/sort/monthly`);
    return res.data;
};

const getBooksByViews = async () => {
    const res = await axios.get(`${baseUrl}/sort/views`);
    return res.data;
};

const getBooksByCreatedTime = async () => {
    const res = await axios.get(`${baseUrl}/sort/created`);
    return res.data;
};

const getBooksByUpdatedTime = async () => {
    const res = await axios.get(`${baseUrl}/sort/updated`);
    return res.data;
};

const getHistoriesBooksByUserId = async (userId) => {
    const res = await axios.get(`${baseUrl}/histories/user/${userId}/books`);
    return res.data;
};

export default {
    deleteLibrary,
    getLibraryById,
    updateLibrary,
    getHistoriesBooksByUserId,
    getBooksByMonthly,
    getBooksByViews,
    getBooksByCreatedTime, 
    getBooksByUpdatedTime,
    getTotalBooksInTwelveMonths,
    setToken,
    getAllBooks,
    getBookById,
    createBook,
    createBookWithCover,
    updateBook,
    getAllAuthors,
    getAuthorById,
    createAuthor,
    getAllGenres,
    getGenreById,
    createGenre,
    createChapter,
    getChaptersByBookId,
    getChapterById,
    updateChapter,
    createComment,
    getCommentsByChapterId,
    createRating,
    getRatingsByBookId,
    createLibrary,
    getLibrariesByUserId,
    createHistory,
    getAllHistories,
    getHistoriesByUserId,
    getHistoriesByBookId,
    getMostUsedVoiceFromHistories,
    getLastUsedVoiceFromHistories,
    countBooks,
    countBooksThisMonth,
}