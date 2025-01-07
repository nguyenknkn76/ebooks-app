import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ListBooks2.scss";
import ItemBook2 from "./ItemBook2";

const ListBooks2 = ({ books }) => {
  const booksPerPage = 2;
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
    <div className="list-books2-container">
      <div className="list-books2">
        {currentBooks.map((book, index) => (
          <ItemBook2 key={index} book={book} />
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

ListBooks2.propTypes = {
  books: PropTypes.array.isRequired,
};

export default ListBooks2;