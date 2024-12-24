import React, { useState } from 'react';
import './BookTable.scss';

const BookTable = ({ books }) => {
  const booksPerPage = 10;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="book-table-wrapper">
      <table className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genres</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.id}</td>
              <td>
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="cover-image"
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre.join(', ')}</td>
              <td>
                <div className="rating">
                  {'★'.repeat(Math.floor(book.avg_rating))}
                  {'☆'.repeat(5 - Math.floor(book.avg_rating))}
                </div>
              </td>
              <td className="actions">
                <button className="view-btn">View</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((page) => page === currentPage)
        .map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BookTable;