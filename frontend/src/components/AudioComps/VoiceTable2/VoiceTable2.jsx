import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceTable2.scss';

const VoiceTable2 = ({ voices, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleView = (voiceId) => {
    navigate(`/admin/voices/${voiceId}`);
  };

  const filteredVoices = voices.filter(voice =>
    voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voice.casual_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlaySample = (url) => {
    const audio = new Audio(url);
    audio.play();
  };
  console.log(voices)
  return (
    <div className="voice-table-container">
      <div className="voice-table-header">
        <h2>Voices List</h2>
        <input
          type="text"
          placeholder="Search voices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="voice-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Casual Name</th>
              <th>Language</th>
              <th>Device Profile</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Type</th>
              <th>Sample</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoices.map((voice) => (
              <tr key={voice.id}>
                <td>{voice.name}</td>
                <td>{voice.casual_name}</td>
                <td>{voice.language.language}</td>
                <td>{voice.device_profile.name}</td>
                <td>{voice.gender}</td>
                <td>{voice.age.name}</td>
                <td>{voice.type.type}</td>
                <td>
                  {voice.sample_voice ? (
                    <button
                      className="play-btn"
                      onClick={() => handlePlaySample(voice.sample_voice.file_url)}
                    >
                      ▶ Play
                    </button>
                  ) : (
                    'No sample'
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    {/* <button
                      className="view-btn"
                      onClick={() => handleView(voice.id)}
                    >
                      View
                    </button> */}
                    <button
                      className="view-btn"
                      onClick={() => onEdit(voice.id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoiceTable2;