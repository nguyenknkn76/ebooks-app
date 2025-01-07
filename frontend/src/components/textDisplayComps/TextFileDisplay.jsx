import React, { useEffect, useState } from 'react';

const styles = {
  container: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#333',
    aligntItem: 'center',
    padding: '30px',
    paddingTop: '0px',
  },
  heading: {
    color: 'black',
    textAlign: 'center',
    width: '100%',
  }
};

const TextFileDisplay = ({ chapter }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(chapter.text_file.file_url);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching the text file:', error);
        setContent('Don\'t have content to display.');
      }
    };

    fetchFileContent();
  }, [chapter]);
  console.log(chapter);
  return (
    <div>
      <h1 style={styles.heading}>Chapter {chapter.chapter_number}: {chapter.name}</h1>
      <div style={styles.container}>
        {content}
      </div>
    </div>
  );
};

export default TextFileDisplay;
