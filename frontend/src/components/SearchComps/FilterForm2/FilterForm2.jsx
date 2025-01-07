import React, { useState, useEffect } from "react";
import { Input, Select, Button } from 'antd';
import BookService from "../../../services/BookService";
import "./FilterForm2.scss";

const FilterForm2 = ({ onSearch }) => {
  const [filter, setFilter] = useState({
    search: "",
    sort: "-created_at",
    genres: [],
    publish_year: "",
    author: "",
    status: "",
    rating_filter: "",
    page: 1,
    limit: 10
  });

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [authorsData, genresData] = await Promise.all([
        BookService.getAllAuthors(),
        BookService.getAllGenres()
      ]);
      setAuthors(authorsData);
      setGenres(genresData);
    };
    fetchData();
  }, []);

  const filterAuthors = (input, option) => {
    if (!input) return true;
    const authorName = option?.label?.toLowerCase() || '';
    const authorPenName = authors.find(a => a.id === option?.value)?.pen_name?.toLowerCase() || '';
    const searchTerm = input.toLowerCase();
    return authorName.includes(searchTerm) || authorPenName.includes(searchTerm);
  };

  const getFilteredAuthors = () => {
    if (!filter.author && authors.length > 5) {
      return authors.slice(0, 5);
    }
    return authors;
  };

  const getFilteredGenres = () => {
    if (!filter.genres && genres.length > 5) {
      return genres.slice(0, 5);
    }
    return genres;
  };

  const filterGenres = (input, option) => {
    return option?.label?.toLowerCase().includes(input.toLowerCase());
  };

  const handleFilterChange = (field, value) => {
    setFilter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filter);
  };

  const resetFilters = () => {
    setFilter({
      search: "",
      sort: "-created_at",
      genres: [],
      publish_year: "",
      author: "",
      status: "",
      rating_filter: "",
      page: 1,
      limit: 10
    });
    onSearch({});
  };
  console.log(filter);
  return (
    <div className="filter-form">
      <div className="search-row">
        <label>Search:</label>
        <Input
          placeholder="Search by title"
          value={filter.search}
          onChange={e => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div className="filter-row">
        <div className="form-group">
          <label>Sort By:</label>
          <Select 
            placeholder="Sort by"
            value={filter.sort}
            onChange={value => handleFilterChange("sort", value)}
          >
            <Select.Option value="-created_at">Latest Upload</Select.Option>
            <Select.Option value="created_at">Oldest Upload</Select.Option>
            <Select.Option value="-avg_rating">Highest Rating</Select.Option>
            <Select.Option value="avg_rating">Lowest Rating</Select.Option>
            <Select.Option value="-views">Most Views</Select.Option>
            <Select.Option value="-monthly_views">Most Monthly Views</Select.Option>
          </Select>
        </div>

        <div className="form-group">
          <label>Genres:</label>
          <Select
            mode="multiple"
            placeholder="Search genres"
            value={filter.genres}
            onChange={value => handleFilterChange("genres", value)}
            showSearch
            filterOption={filterGenres}
            optionFilterProp="label"
          >
            {getFilteredGenres().map(genre => (
              <Select.Option key={genre.id} value={genre.id} label={genre.name}>
                {genre.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="form-group">
          <label>Author</label>
          <Select
            placeholder="Search authors"
            value={filter.author}
            onChange={value => handleFilterChange("author", value)}
            showSearch
            filterOption={filterAuthors}
            optionFilterProp="label"
          >
            {getFilteredAuthors().map(author => (
              <Select.Option 
                key={author.id} 
                value={author.id}
                label={`${author.pen_name || author.name}`}
              >
                {author.pen_name || author.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      
      <div className="filter-row">
        <div className="form-group">
          <label>Publication Year:</label>
          <Input
            type="number"
            placeholder="Publication Year"
            value={filter.publish_year}
            onChange={e => handleFilterChange("publish_year", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <Select
            placeholder="Rating"
            value={filter.rating_filter}
            onChange={value => handleFilterChange("rating_filter", value)}
            allowClear
          >
            <Select.Option value="perfect">Perfect (4.5+)</Select.Option>
            <Select.Option value="good">Good (4+)</Select.Option>
            <Select.Option value="ok">OK (3+)</Select.Option>
          </Select>
        </div>

        <div className="form-group">
          <label>Status:</label>
          <Select
            placeholder="Status"
            value={filter.status}
            onChange={value => handleFilterChange("status", value)}
            allowClear
          >
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="published">Published</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </div>
      </div>

      <div className="filter-actions">
        <Button onClick={resetFilters}>Reset</Button>
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default FilterForm2;