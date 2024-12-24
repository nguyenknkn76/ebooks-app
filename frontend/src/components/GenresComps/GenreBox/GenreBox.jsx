import React from "react";
import PropTypes from "prop-types";
import "./GenreBox.scss";

const GenreBox = ({ genres, onGenreClick }) => {
  return (
    <div className="genre-box">
      <h3>Genre</h3>
      <div className="genre-container">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="genre-item"
            onClick={() => onGenreClick(genre)}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

GenreBox.propTypes = {
  genres: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default GenreBox;