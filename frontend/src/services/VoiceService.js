import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/voices'
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const config = () => {
    return {
        headers: { Authorization: token }
    }
}

// Voices
const createVoice = async (voiceData) => {
    const res = await axios.post(baseUrl, voiceData, config())
    return res.data
}

const getAllVoices = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getAllVoices2 = async (filters) => {
    const res = await axios.get(`${baseUrl}/filter`, { params: filters });
    return res.data;
};

const getVoiceById = async (id) => {
    const res = await axios.get(`${baseUrl}/voice/${id}`)
    return res.data
}

// Ages
const createAge = async (ageData) => {
    const res = await axios.post(`${baseUrl}/ages`, ageData, config())
    return res.data
}

const getAllAges = async () => {
    const res = await axios.get(`${baseUrl}/ages`)
    return res.data
}

const getAgeById = async (id) => {
    const res = await axios.get(`${baseUrl}/ages/${id}`)
    return res.data
}

// Device Profiles
const createDeviceProfile = async (profileData) => {
    const res = await axios.post(`${baseUrl}/device-profiles`, profileData, config())
    return res.data
}

const getAllDeviceProfiles = async () => {
    const res = await axios.get(`${baseUrl}/device-profiles`)
    return res.data
}

const getDeviceProfileById = async (id) => {
    const res = await axios.get(`${baseUrl}/device-profiles/${id}`)
    return res.data
}

// Languages
const createLanguage = async (languageData) => {
    const res = await axios.post(`${baseUrl}/languages`, languageData, config())
    return res.data
}

const getAllLanguages = async () => {
    const res = await axios.get(`${baseUrl}/languages`)
    return res.data
}

const getLanguageById = async (id) => {
    const res = await axios.get(`${baseUrl}/languages/${id}`)
    return res.data
}

// Types
const createType = async (typeData) => {
    const res = await axios.post(`${baseUrl}/types`, typeData, config())
    return res.data
}

const getAllTypes = async () => {
    const res = await axios.get(`${baseUrl}/types`)
    return res.data
}

const getTypeById = async (id) => {
    const res = await axios.get(`${baseUrl}/types/${id}`)
    return res.data
}

// Audio Files
const createAudioFiles = async (textFileUrl) => {
    const res = await axios.post(`${baseUrl}/audio-files`, { text_file_url: textFileUrl }, config())
    return res.data
}

// stat
const countVoices = async () => {
  const res = await axios.get(`${baseUrl}/count/total`)
  return res.data
}

const getGgcVoiceName = async (typeId, languageId, gender) => {
    const res = await axios.get(`${baseUrl}/ggc-names`, {
        params: {
            type_id: typeId,
            language_id: languageId,
            gender
        }
    })
    return res.data.voice_names
}
export default {
    getGgcVoiceName,
    setToken,
    createVoice,
    getAllVoices,
    getVoiceById,
    createAge,
    getAllAges,
    getAgeById,
    createDeviceProfile,
    getAllDeviceProfiles,
    getDeviceProfileById,
    createLanguage,
    getAllLanguages,
    getLanguageById,
    createType,
    getAllTypes,
    getTypeById,
    createAudioFiles, 
    countVoices,
    getAllVoices2
}