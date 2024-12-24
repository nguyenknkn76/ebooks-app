import React, { useState } from "react";
import "./BookInfoForm.scss";
import { FiUpload } from "react-icons/fi"; // Icon upload

const BookInfoForm = ({ book }) => {
  const [bookData, setBookData] = useState({ ...book });
  const [coverPreview, setCoverPreview] = useState(book.cover_image || "default-cover.png");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    console.log("Updated Book Data:", bookData);
    alert("Book updated successfully!");
  };

  return (
    <div className="book-info-form">
      <h2>Book Information</h2>
      <div className="form-content">
        {/* Cover Image Section */}
        <div className="cover-section">
          <div className="cover-wrapper">
            <img src={coverPreview} alt="Cover" className="cover-image" />
          </div>
        </div>

        {/* Book Details Section 1 */}
        <div className="details-section">
          <div className="form-group">
            <label>Cover Image</label>
            <label className="upload-icon">
              <FiUpload size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Genres</label>
            <input
              type="text"
              name="genre"
              value={bookData.genre.join(", ")}
              onChange={(e) =>
                setBookData((prevData) => ({
                  ...prevData,
                  genre: e.target.value.split(",").map((g) => g.trim()),
                }))
              }
            />
          </div>
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              name="language"
              value={bookData.language}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Publication Year</label>
            <input
              type="number"
              name="publish_year"
              value={bookData.publish_year}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Book Details Section 2 */}
        <div className="details-section">
          <div className="form-group">
            <label>Average Rating</label>
            <input type="number" value={bookData.avg_rating} disabled />
          </div>
          <div className="form-group">
            <label>Total Comments</label>
            <input type="number" value={bookData.total_comments} disabled />
          </div>
          <div className="form-group">
            <label>Total Followers</label>
            <input type="number" value={bookData.total_followers} disabled />
          </div>
          <div className="form-group">
            <label>Total Views</label>
            <input type="number" value={bookData.total_views} disabled />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={bookData.status}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Publisher</label>
            <input type="text" value={bookData.publisher} disabled />
          </div>
        </div>
      </div>

      {/* Book Description */}
      <div className="form-group description">
        <label>Description</label>
        <textarea
          className="no-resize"
          name="description"
          value={bookData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* Update Button */}
      <button className="update-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default BookInfoForm;