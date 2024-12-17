import React from "react";
import Genre from "./Genre"; // Import Genre card
import "./Genres.scss"; // SCSS cho danh sách genres

const Genres = ({ genres }) => {
  return (
    <div className="genres-container">
      <h2 className="genres-title">Explore Audible Categories</h2>
      <div className="genres-grid">
        {genres.map((genre) => (
          <Genre key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
};

export default Genres;
