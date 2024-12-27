import React, { useEffect, useState } from 'react';

const styles = {
  container: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#333',
  },
  heading: {
    color: '#007bff',
  }
};

const TextFileDisplay = ({ fileUrl }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching the text file:', error);
        setContent('Failed to load the text file.');
      }
    };

    fetchFileContent();
  }, [fileUrl]);

  return (
    <div>
      <h1 style={styles.heading}>Chapter 1: The beginning</h1>
      <div style={styles.container}>
        {content}
      </div>
    </div>
  );
};

export default TextFileDisplay;
