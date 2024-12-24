import React, { useState, useEffect } from "react";
import "./Banner.scss";

const Banner = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate books every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [books.length]);

  const currentBook = books[currentIndex];

  return (
    <div
      className="banner-container"
      style={{
        backgroundImage: `url(${currentBook.cover_image})`,
      }}
    >
      <div className="banner-content">
        <img src={currentBook.cover_image} alt={currentBook.title} className="banner-image" />
        <div className="banner-info">
          <h1 className="banner-title">{currentBook.title}</h1>
          <p className="banner-author">{currentBook.author}</p>
          <div className="banner-genres">
            {currentBook.genre.map((g, idx) => (
              <span key={idx} className="genre-tag">
                {g.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="banner-description-container">
            <p className="banner-description">{currentBook.description}</p>
          </div>
          <p className="banner-index">No. {currentIndex + 1}</p>
        </div>
      </div>
      <div className="banner-navigation">
        <button
          className="nav-button"
          onClick={() => setCurrentIndex((currentIndex - 1 + books.length) % books.length)}
        >
          &#8249;
        </button>
        <button
          className="nav-button"
          onClick={() => setCurrentIndex((currentIndex + 1) % books.length)}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Banner;
