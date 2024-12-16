import React from "react";
import "./BookDetail.scss";

const BookDetail = ({ book }) => {
  return (
    <div className="book-detail">
      <div className="book-header">
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-series">{book.series}</p>
          <p className="book-author">By: <span>{book.author}</span></p>
          <p className="book-length">Length: {book.length}</p>
          <p className="book-format">{book.format}</p>
          <p className="book-release-date">Release date: {book.releaseDate}</p>
          <p className="book-language">Language: {book.language}</p>
          <p className="book-publisher">Publisher: {book.publisher}</p>
          <div className="book-credit">{book.credits} CREDIT</div>
        </div>
      </div>

      <div className="book-description">
        <h3>Description</h3>
        <p>{book.description}</p>
      </div>

      <div className="book-tags">
        {book.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookDetail;
