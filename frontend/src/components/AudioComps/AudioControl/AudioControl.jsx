import React, { useRef } from 'react';

const AudioControl = ({fileUrl}) => {
  const style = {
    width: '100%',
  }
  console.log(fileUrl);
  return (
    <div>
      <p style={{paddingLeft: '9px'}}><strong>
        Let's listen this audiobook!
        </strong></p>
      <audio style={style} src={fileUrl} controls></audio>
    </div>
  );
};

export default AudioControl;

