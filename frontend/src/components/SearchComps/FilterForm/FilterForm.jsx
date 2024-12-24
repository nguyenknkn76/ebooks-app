import React, { useState, useRef, useEffect } from "react";
import "./FilterForm.scss";
import GenreBox from "../../GenresComps/GenreBox/GenreBox";

const FilterForm = () => {
  const [filter, setFilter] = useState({
    search: "",
    sortBy: "none",
    genres: [],
    contentRating: "any",
    publicationYear: "",
    author: "any",
    language: "any",
    status: "any",
  });

  const [showGenreBox, setShowGenreBox] = useState(false);
  const genreBoxRef = useRef(null);

  const availableGenres = ["Fantasy", "Action", "Adventure", "Romance"];
  const availableAuthors = ["Author 1", "Author 2", "Author 3"];
  const availableLanguages = ["English", "Vietnamese", "Spanish"];

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const checkGenre = genre => filter.genres.includes(genre);

  const handleAddGenre = (genre) => {
    if (!checkGenre(genre)) {
      setFilter((prev) => ({
        ...prev,
        genres: [...prev.genres, genre],
      }));
    }
    else {
      setFilter((prev) => ({
        ...prev,
        genres: prev.genres.filter(g => g !== genre),
      }));
    }
    // setShowGenreBox(false);
  };

  const resetFilters = () => {
    setFilter({
      search: "",
      sortBy: "none",
      genres: [],
      contentRating: "any",
      publicationYear: "",
      author: "any",
      language: "any",
      status: "any",
    });
  };

  const handleSearch = () => {
    console.log("Search with filters:", filter);
  };

  const handleClickOutside = (event) => {
    if (genreBoxRef.current && !genreBoxRef.current.contains(event.target)) {
      setShowGenreBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-form">
      {/* Search Bar and Hide Button */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search book title"
          className="search-bar"
          value={filter.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        <button
          className="hide-button"
          onClick={() => setFilter((prev) => ({ ...prev, showFilters: !prev.showFilters }))}
        >
          {filter.showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {/* Filter Rows */}
      {filter.showFilters === true && (
        <>
          <div className="filter-row">
            <div className="filter-field">
              <label>Sort by</label>
              <select
                value={filter.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <option value="none">None</option>
                <option value="latest">Latest Upload</option>
                <option value="oldest">Oldest Upload</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            <div className="filter-field">
              <label>Genres</label>
              <div
                className="dropdown"
                onClick={() => setShowGenreBox(!showGenreBox)}
              >
                {filter.genres.length > 0
                  ? filter.genres.join(", ")
                  : "Include any"}
              </div>
              {showGenreBox && (
                <div ref={genreBoxRef} className="genre-box-container">
                  <GenreBox genres={availableGenres} onGenreClick={handleAddGenre} />
                </div>
              )}
            </div>
            <div className="filter-field">
              <label>Content Rating</label>
              <select
                value={filter.contentRating}
                onChange={(e) => handleFilterChange("contentRating", e.target.value)}
              >
                <option value="any">Any</option>
                <option value="safe">Safe</option>
                <option value="suggestive">Suggestive</option>
              </select>
            </div>
            <div className="filter-field">
              <label>Publication Year</label>
              <input
                type="number"
                placeholder="Year"
                value={filter.publicationYear}
                onChange={(e) => handleFilterChange("publicationYear", e.target.value)}
              />
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-field">
              <label>Author</label>
              <select
                value={filter.author}
                onChange={(e) => handleFilterChange("author", e.target.value)}
              >
                <option value="any">Any</option>
                {availableAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-field">
              <label>Language</label>
              <select
                value={filter.language}
                onChange={(e) => handleFilterChange("language", e.target.value)}
              >
                <option value="any">Any</option>
                {availableLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-field">
              <label>Status</label>
              <select
                value={filter.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="any">Any</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="hiatus">Hiatus</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="filter-field"></div>
          </div>
          
        </>
      )}

      {/* Action Buttons */}
      <div className="filter-row">
        <div className="empty-field"></div>
        <button className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterForm;