import React from "react";
import "./BookPreview.scss";

const BookPreview = ({ book }) => {
  return (
    <div className="book-preview">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-series">{book.series}</p>
      <p className="book-author">By: {book.author}</p>
      <p className="book-narrators">Narrated by: {book.narrators.join(", ")}</p>
      <p className="book-length">Length: {book.length}</p>
      <p className="book-format">{book.format}</p>

      <div className="ratings">
        <div className="rating">
          <span>Overall</span>
          <span className="stars">★★★★★</span>
          <span className="rating-value">{book.ratings.overall}</span>
        </div>
        <div className="rating">
          <span>Performance</span>
          <span className="stars">★★★★★</span>
          <span className="rating-value">{book.ratings.performance}</span>
        </div>
        <div className="rating">
          <span>Story</span>
          <span className="stars">★★★★★</span>
          <span className="rating-value">{book.ratings.story}</span>
        </div>
      </div>

      <p className="book-description">{book.description}</p>
    </div>
  );
};

export default BookPreview;
