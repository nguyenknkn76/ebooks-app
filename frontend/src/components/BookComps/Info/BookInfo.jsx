import React from "react";
import "./BookInfo.scss";

const BookInfo = ({ book }) => {
  const {
    title,
    cover_image,
    genre,
    description,
    avg_rating,
    total_comments,
    total_followers,
    total_views,
    status,
    language,
    publisher,
    release_year,
  } = book;

  return (
    <div className="book-info-container">
      <div className="top-section">
        <div className="left-section">
          <img className="cover-image" src={cover_image} alt={title} />
          <div className="info">
            <h1 className="title">{title}</h1>
            <p className="author">By: Author 1</p>
            <p className="release-year">Release year: {release_year}</p>
            <p className="language">Language: {language}</p>
            <p className="publisher">Publisher: {publisher}</p>
            <p className="status">Status: {status}</p>
            <div className="genres">
              {genre.map((g, index) => (
                <span key={index} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>
            <div className="stats">
              <span>⭐ {avg_rating.toFixed(2)}</span>
              <span>👥 {total_followers}</span>
              <span>👁️ {total_views}</span>
              <span>💬 {total_comments}</span>
            </div>
          </div>
        </div>

        <div className="right-section">
          <button className="btn like-btn">Like</button>
          <button className="btn add-library-btn">Add To Library</button>
          <button className="btn options-btn">More Options</button>
        </div>
      </div>

      <div className="bottom-section">
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default BookInfo;