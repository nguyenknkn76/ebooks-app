import React, { useState, useEffect } from "react";
import VoiceService from "../../../services/VoiceService";
import "./AudioCustom.scss";
import { useDispatch, useSelector } from "react-redux";
import BookService from "../../../services/BookService";
import { setCustomVoice } from "../../../reducers/CustomVoiceReducer";

const AudioCustom = ({book}) => {
  const [loading, setLoading] = useState(true);
  const [voices, setVoices] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  const [deviceProfiles, setDeviceProfiles] = useState([]);
  const [ages, setAges] = useState([]);
  const [filteredVoices, setFilteredVoices] = useState([]);
  const loggedin = useSelector(state => state.loggedin);
  const customvoice = useSelector(state => state.customvoice);
  const dispatch = useDispatch();

  const defaultCustom = {
    language: "677c543df3fd5038392b1696",
    type: "677c53b5f3fd5038392b168d",
    voice: "677c62064f64db5caf4189c4",
    deviceProfile: "677c54eaf3fd5038392b1698",
    age: "677c525af3fd5038392b167d",
    gender: "MALE"
  };
  const initCustom = {
    language: "",
    type: "",
    voice: "",
    deviceProfile: "",
    age: "",
    gender: ""
  }
  const [customOption, setCustomOption] = useState(initCustom);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voicesData, languagesData, typesData, profilesData, agesData] = await Promise.all([
          VoiceService.getAllVoices(),
          VoiceService.getAllLanguages(),
          VoiceService.getAllTypes(),
          VoiceService.getAllDeviceProfiles(),
          VoiceService.getAllAges()
        ]);
        setVoices(voicesData);
        setLanguages(languagesData);
        setTypes(typesData);
        setDeviceProfiles(profilesData);
        setAges(agesData);
        dispatch(setCustomVoice(defaultCustom.voice));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // console.log(book);
  // useEffect(async () => {

  // },[])
  // useEffect(async () => {
  //   const [recommendedVoiceId, myVoiceId] = await Promise.all([
  //     BookService.getMostUsedVoiceFromHistories(book.id),
  //     BookService.getLastUsedVoiceFromHistories(),
  //   ]);

  //   const [recommendedVoice, myVoice] = await Promise.all([
  //     VoiceService.getVoiceById(recommendedVoiceId),
  //     VoiceService.getVoiceById(myVoiceId),
  //   ]);
  //   console.log(recommendedVoiceId, myVoiceId);
  //   console.log(recommendedVoice, myVoice);
  // },[]);
  
  useEffect(() => {
    // Filter voices when any filter criteria changes
    const filterVoices = async () => {
      try {
        const filters = {};
        if (customOption.language) filters.language_id = customOption.language;
        if (customOption.type) filters.type_id = customOption.type;
        if (customOption.deviceProfile) filters.device_profile_id = customOption.deviceProfile;
        if (customOption.age) filters.age_id = customOption.age;
        if (customOption.gender !== 'Default') filters.gender = customOption.gender;

        // Only fetch if at least one filter is selected
        if (Object.keys(filters).length > 0) {
          const filtered = await VoiceService.getAllVoices2(filters);
          setFilteredVoices(filtered);
        } else {
          setFilteredVoices(voices);
        }
      } catch (error) {
        console.error('Error filtering voices:', error);
      }
    };
    
    filterVoices();
  }, [customOption.language, customOption.type, customOption.deviceProfile, customOption.age, customOption.gender]);
  // console.log(customOption);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    if (name === 'voice') {
      // When voice is selected, update other fields
      const selectedVoice = voices.find(v => v.id === value);
      if (selectedVoice) {
        setCustomOption({
          language: selectedVoice.language?.id || '',
          type: selectedVoice.type?.id || '',
          deviceProfile: selectedVoice.device_profile?.id || '',
          age: selectedVoice.age?.id || '',
          gender: selectedVoice.gender || 'Default',
          voice: value
        });
      }
    } else {
      // When other fields change, reset voice and update filter
      setCustomOption(prev => ({
        ...prev,
        [name]: value,
        voice: '' // Reset voice when filters change
      }));
    }
  };

  const handleSampleVoice = async () => {
    try {
      const selectedVoice = voices.find(v => v.id === customOption.voice);
      if (selectedVoice) {
        // Handle sample voice playback
        console.log("Playing sample for voice:", selectedVoice);
        const audio = new Audio(selectedVoice.sample_voice.file_url);
        await audio.play();
      }
    } catch (error) {
      console.error('Error playing sample:', error);
    }
  };

  const handleApplyCustom = async () => {
    try {
      const selectedVoice = voices.find(v => v.id === customOption.voice);
      if (selectedVoice) {
        // Handle voice application
        // console.log("Applying voice:", selectedVoice);
        dispatch(setCustomVoice(selectedVoice.id));
        // console.log(selectedVoice.id);
      }
    } catch (error) {
      console.error('Error applying voice:', error);
    }
  };

  const handleRecommend = async () => {
    // console.log(book);
    const response = await BookService.getMostUsedVoiceFromHistories(book.id);
    const recommendedVoiceId = response.voice_id;
    const recommendedVoice = await VoiceService.getVoiceById(recommendedVoiceId);
    console.log(recommendedVoice);
    // console.log(recommendedVoice);
    setCustomOption({
      language: recommendedVoice.language.id,
      type: recommendedVoice.type.id,
      voice: recommendedVoice.id,
      deviceProfile: recommendedVoice.device_profile.id,
      age: recommendedVoice.age.id,
      gender: recommendedVoice.gender
    });
  };

  const handleMyVoice = async () => {
    if(loggedin){
      const response = await BookService.getLastUsedVoiceFromHistories(loggedin.user.id);
      const myVoiceId = response.voice_id;
      const myVoice = await VoiceService.getVoiceById(myVoiceId);
      console.log(myVoice);
      setCustomOption({
        language: myVoice.language.id,
        type: myVoice.type.id,
        voice: myVoice.id,
        deviceProfile: myVoice.device_profile.id,
        age: myVoice.age.id,
        gender: myVoice.gender
      });
    }
  };
  const handleDefaultVoice = async () => {
    setCustomOption(initCustom);
  }
  if (loading) return <div>Loading voice options...</div>;

  return (
    <div className="audio-custom">
      <h3>Custom Voice</h3>
      <div className="audio-custom-row">
        <div className="audio-custom-field">
          <label>Language</label>
          <select name="language" value={customOption.language} onChange={handleChange}>
            <option value="">Select Language</option>
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.name} ({lang.language_code})
              </option>
            ))}
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Voice Type</label>
          <select name="type" value={customOption.type} onChange={handleChange}>
            <option value="">Select Type</option>
            {types.map(type => (
              <option key={type.id} value={type.id}>
                {type.description}
              </option>
            ))}
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Voice</label>
          <select name="voice" value={customOption.voice} onChange={handleChange}>
            <option value="">Select Voice</option>
            {filteredVoices && filteredVoices.map(voice => (
              <option key={voice.id} value={voice.id}>
                {voice.casual_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="audio-custom-row">
        <div className="audio-custom-field">
          <label>Audio Device Profile</label>
          <select name="deviceProfile" value={customOption.deviceProfile} onChange={handleChange}>
            <option value="">Select Profile</option>
            {deviceProfiles.map(profile => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Age</label>
          <select name="age" value={customOption.age} onChange={handleChange}>
            <option value="">Select Age</option>
            {ages.map(age => (
              <option key={age.id} value={age.id}>
                {age.name}
              </option>
            ))}
          </select>
        </div>
        <div className="audio-custom-field">
          <label>Gender</label>
          <select name="gender" value={customOption.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>

      <div className="audio-custom-buttons">
        <button onClick={handleSampleVoice} disabled={!customOption.voice}>
          Sample Voice
        </button>
        <button onClick={handleRecommend}>Recommend Voice</button>
        <button onClick={handleMyVoice}>My Voice</button>
        <button onClick={handleDefaultVoice}>Default Voice</button>
        <button onClick={handleApplyCustom} disabled={!customOption.voice}>
          Apply Custom
        </button>

      </div>
    </div>
  );
};

export default AudioCustom;