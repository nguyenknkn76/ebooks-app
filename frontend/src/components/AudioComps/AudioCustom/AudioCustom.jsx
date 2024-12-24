import React, { useState } from "react";
import "./AudioCustom.scss";

const AudioCustom = () => {
  const initialCustomOptions = {
    language: "Default",
    voiceType: "Default",
    voiceName: "Default",
    audioDeviceProfile: "Default",
    age: "Default",
    gender: "Default",
  };

  const [customOption, setCustomOption] = useState(initialCustomOptions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomOption({ ...customOption, [name]: value });
  };

  const handleSampleVoice = () => {
    const audio = new Audio("http://samplevoice.mp3");
    audio.play();
  };

  const handleMyVoice = () => {
    console.log("apply my voice");
  };

  const handleDefaultVoice = () => {
    setCustomOption(initialCustomOptions);
  };

  const handleApplyCustom = () => {
    console.log("apply custom success");
  };

  return (
    <div className="audio-custom">
      <h2>Custom Voice</h2>
      <div className="audio-custom-row">
        <div className="audio-custom-field">
          <label>Language</label>
          <select
            name="language"
            value={customOption.language}
            onChange={handleChange}
          >
            <option value="Default">Default</option>
            <option value="English (US)">English (US)</option>
            <option value="Vietnamese (Viet Nam)">Vietnamese (Viet Nam)</option>
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Voice Type</label>
          <select
            name="voiceType"
            value={customOption.voiceType}
            onChange={handleChange}
          >
            <option value="Default">Default</option>
            <option value="Neural2">Neural2</option>
            <option value="Studio">Studio</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Voice Name</label>
          <select
            name="voiceName"
            value={customOption.voiceName}
            onChange={handleChange}
          >
            <option value="Default">Default</option>
          </select>
        </div>
      </div>

      <div className="audio-custom-row">
        <div className="audio-custom-field">
          <label>Audio Device Profile</label>
          <select
            name="audioDeviceProfile"
            value={customOption.audioDeviceProfile}
            onChange={handleChange}
          >
            <option value="Default">Default</option>
            <option value="Small home speaker">Small home speaker</option>
            <option value="Smart phone">Smart phone</option>
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Age</label>
          <select
            name="age"
            value={customOption.age}
            onChange={handleChange}
          >
            <option value="Default">Default</option>
            <option value="Child">Child</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Gender</label>
          <select
            name="gender"
            value={customOption.gender}
            onChange={handleChange}
          >
            <option value="Default">Default</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div className="audio-custom-buttons">
        <button onClick={handleSampleVoice}>Sample Voice</button>
        <button>Recommend Voice</button>
        <button onClick={handleMyVoice}>My Voice</button>
        <button onClick={handleDefaultVoice}>Default Voice</button>
        <button onClick={handleApplyCustom}>Apply Custom</button>
      </div>
    </div>
  );
};

export default AudioCustom;
