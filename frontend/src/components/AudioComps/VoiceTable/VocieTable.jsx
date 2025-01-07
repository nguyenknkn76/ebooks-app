import React, { useState } from "react";
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import "./VoiceTable.scss";

const VoiceTable = ({ voices }) => {
  const voicesPerPage = 10;
  const totalPages = Math.ceil(voices.length / voicesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);

  const currentVoices = voices.slice(
    (currentPage - 1) * voicesPerPage,
    currentPage * voicesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePlay = (voice) => {
    if (playingVoiceId === voice.id) {
      playingAudio.pause();
      setPlayingAudio(null);
      setPlayingVoiceId(null);
    } else {
      if (playingAudio) {
        playingAudio.pause();
      }
      const audio = new Audio(voice.audio_file);
      setPlayingAudio(audio);
      setPlayingVoiceId(voice.id);
      audio.play();

      audio.onended = () => {
        setPlayingAudio(null);
        setPlayingVoiceId(null);
      };
    }
  };

  return (
    <div className="voice-table">
      {/* <h2>Voices</h2> */}
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Casual Name</th>
            <th>Language</th>
            <th>Device Profile</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Type</th>
            <th>Audio File</th>
          </tr>
        </thead>
        <tbody>
          {currentVoices.map((voice) => (
            <tr key={voice.id}>
              {/* <td>{voice.id}</td> */}
              <td>{voice.name}</td>
              <td>{voice.casual_name}</td>
              <td>{voice.language}</td>
              <td>{voice.device_profile}</td>
              <td>{voice.gender}</td>
              <td>{voice.age}</td>
              <td>{voice.type}</td>
              <td>
                <button
                  className="play-button"
                  onClick={() => handlePlay(voice)}
                >
                  {playingVoiceId === voice.id ? (
                    <FaRegPauseCircle size={20} />
                  ) : (
                    <FaRegPlayCircle size={20} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default VoiceTable;