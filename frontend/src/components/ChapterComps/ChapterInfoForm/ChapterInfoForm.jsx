import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import "./ChapterInfoForm.scss";

const ChapterInfoForm = ({ chapter }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  // Fetch content from the initial text file
  React.useEffect(() => {
    fetch(chapter.text_file)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error fetching text file:", error));
  }, [chapter.text_file]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setContent(e.target.result); 
    };
    reader.readAsText(uploadedFile);
  };

  const handleUpdate = () => {
    alert("Chapter information updated successfully!");
  };

  return (
    <div className="chapter-info-form">
      <h2>Chapter Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="chapterNumber">Chapter:</label>
          <input
            type="text"
            id="chapterNumber"
            value={chapter.chapter_number}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="chapterName">Name:</label>
          <input type="text" id="chapterName" value={chapter.name} readOnly />
        </div>
        <div className="form-group">
          <div className="upload-wrapper">
            <label htmlFor="contentUpload">Content:</label>
            <label className="upload-icon">
              <FiUpload size={20} />
              <input
                type="file"
                id="contentUpload"
                accept=".txt"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        <div className="form-group">
          <textarea
            value={content}
            readOnly
            rows={10}
            placeholder="Content will appear here"
          ></textarea>
        </div>
        <button type="button" onClick={handleUpdate} className="update-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default ChapterInfoForm;
