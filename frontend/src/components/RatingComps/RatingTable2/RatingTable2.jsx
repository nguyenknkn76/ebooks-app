import React, { useState } from 'react';
import { format } from 'date-fns';
import './RatingTable2.scss';

const RatingTable = ({ ratings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'rating'
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedRatings = [...ratings].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at);
    }
    return sortOrder === 'asc' ? a.star - b.star : b.star - a.star;
  });

  const filteredRatings = sortedRatings.filter(rating => 
    rating.review?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rating-table-container">
      <div className="rating-table-header">
        <h2>Ratings & Reviews</h2>
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="rating-table">
          <thead>
            <tr>
              <th>User</th>
              <th 
                className="sortable"
                onClick={() => handleSort('rating')}
              >
                Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Review</th>
              <th 
                className="sortable"
                onClick={() => handleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.map((rating) => (
              <tr key={rating.id}>
                <td>{rating.user.username}</td>
                <td>
                  <div className="star-rating">
                    <span className="stars">{'★'.repeat(rating.star)}</span>
                    <span className="empty-stars">{'★'.repeat(5 - rating.star)}</span>
                  </div>
                </td>
                <td>
                  <div className="review-text">
                    {rating.review || 'No review provided'}
                  </div>
                </td>
                <td>
                  {format(new Date(rating.created_at), 'MMM dd, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingTable;