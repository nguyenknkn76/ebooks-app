import React from "react";
import Book from "./Book";
import "./Books.scss";

const Books = ({ books }) => {
  return (
    <div className="books-container">
      <h2 className="books-title">Trending now</h2>
      <div className="books-grid">
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
