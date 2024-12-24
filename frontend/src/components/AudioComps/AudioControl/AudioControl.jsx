import React, { useRef } from 'react';

const AudioControl = () => {
  const style = {
    width: '100%',
  }

  return (
    <div>
      <audio style={style} src="https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/river+flows+in+you.mp3" controls></audio>
    </div>
  );
};

export default AudioControl;

