import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ListBooks1.scss";
import ItemBook1 from "./ItemBook1";

const ListBooks1 = ({ books }) => {
  const booksPerPage = 6;
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
    <div className="list-books-container">
      <div className="list-books">
        {currentBooks.map((book, index) => (
          <ItemBook1 key={index} book={book} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter(page => 
            page === currentPage
          )
          .map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`page-btn ${currentPage === page ? "active" : ""}`}
            >
              Page: {page}
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

ListBooks1.propTypes = {
  books: PropTypes.array.isRequired,
};

export default ListBooks1;