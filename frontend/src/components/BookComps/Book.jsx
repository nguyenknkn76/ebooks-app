import React from "react";
import "./Book.scss";

const Book = ({ book }) => {
  return (
    <div className="book-card">
      <div
        className="book-cover"
        style={{ backgroundImage: `url(${book.cover_image})` }}
      ></div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">By: {book.author.pen_name}</p>
      </div>
    </div>
  );
};

export default Book;
