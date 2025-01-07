import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ItemBook11.scss";

const ItemBook11 = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/bookdetails/${book.id}`}>
        <img
          src={book.cover_img?.file_url || "https://via.placeholder.com/100"}
          alt={book.title}
          className="book-cover"
        />
      </Link>
      <div className="book-info">
        <Link to={`/bookdetails/${book.id}`} className="book-title-link">
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">By: {book.author.pen_name || book.author.name}</p>
      </div>
    </div>
  );
};

ItemBook11.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      pen_name: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    cover_img: PropTypes.shape({
      file_url: PropTypes.string,
    }),
  }).isRequired,
};

export default ItemBook11;
