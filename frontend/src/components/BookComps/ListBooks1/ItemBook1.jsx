import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ItemBook1.scss";

const ItemBook1 = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/bookdetails/${book.id}`}>
        <img
          src={book.cover_image || "https://via.placeholder.com/100"}
          alt={book.title}
          className="book-cover"
        />
      </Link>
      <div className="book-info">
        <Link to={`/bookdetails/${book.id}`} className="book-title-link">
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">By: {book.author}</p>
      </div>
    </div>
  );
};

ItemBook1.propTypes = {
  book: PropTypes.object.isRequired,
};

export default ItemBook1;