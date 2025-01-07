import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTable2.scss';

const BookTable2 = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  const handleView = (bookId) => {
    navigate(`/adminbooks/${bookId}`);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.pen_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'status-published';
      case 'draft': return 'status-draft';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="book-table-container">
      <div className="book-table-header">
        <h2>Books List</h2>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="book-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genres</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="book-cover">
                  <img 
                    src={book.cover_img?.file_url || '/default-cover.png'} 
                    alt={book.title}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author.pen_name || book.author.name}</td>
                <td>
                  <div className="genre-tags">
                    {book.genres.map(genre => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="rating">
                    <span className="stars">{'★'.repeat(Math.round(book.avg_rating))}</span>
                    <span className="rating-value">({book.avg_rating.toFixed(1)})</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(book.status)}`}>
                    {book.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => handleView(book.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable2;