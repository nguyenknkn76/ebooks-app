import React, { useRef } from "react";
import "./ListBooks.scss";

const ListBooks = ({ books }) => {
  const containerRef = useRef(null);

  const CARD_WIDTH = 150; 
  const CARD_GAP = 15; 
  const CARDS_TO_SCROLL = 6; 

  const scrollAmount = CARDS_TO_SCROLL * (CARD_WIDTH + CARD_GAP); 

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="list-books">
      <h3 className="list-title">Listeners who picked this title also picked</h3>
      <div className="list-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="books-container" ref={containerRef}>
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <img
                src={book.cover_image}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-details">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">By: {book.author}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ListBooks;
