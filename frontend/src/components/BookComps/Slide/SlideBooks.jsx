import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SlideBooks.scss";
import ItemBook1 from "../ListBooks1/ItemBook1";

const SlideBooks = ({ books }) => {
  const booksPerPage = 6;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "prev") {
      setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
    } else {
      setCurrentPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
    }
  };

  return (
    <div className="slide-books-container">
      <div className="slide-books">
        {currentBooks.map((book, index) => (
          <ItemBook1 key={index} book={book} />
        ))}
      </div>
      <div className="slide-navigation">
        <button className="nav-button" onClick={() => handlePageChange("prev")}>
          &#8249;
        </button>
        <button className="nav-button" onClick={() => handlePageChange("next")}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

SlideBooks.propTypes = {
  books: PropTypes.array.isRequired,
};

export default SlideBooks;