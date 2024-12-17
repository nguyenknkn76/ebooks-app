import React from "react";
import "./Genre.scss";

const Genre = ({ genre }) => {
  return (
    <div className="genre-card">
      <div
        className="genre-cover"
        style={{
          backgroundImage: `url(${genre.cover_image})`,
        }}
      ></div>
      <div className="genre-info">
        <h3 className="genre-name">{genre.name}</h3>
        <p className="genre-description">{genre.description}</p>
      </div>
    </div>
  );
};

export default Genre;
