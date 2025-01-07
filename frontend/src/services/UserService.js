import axios from 'axios'

const baseUrl = 'http://localhost:5000/api'
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const config = () => {
    return {
        headers: { Authorization: token }
    }
}

// Auth
const login = async credentials => {
    const res = await axios.post(`${baseUrl}/auth/login`, credentials)
    return res.data
}

const register = async userData => {
    const res = await axios.post(`${baseUrl}/register`, userData)
    return res.data
}

// Users
const getAllUsers = async () => {
    const res = await axios.get(`${baseUrl}/users`, config())
    return res.data
}

const getUserById = async (id) => {
    const res = await axios.get(`${baseUrl}/users/user/${id}`, config())
    return res.data
}

const countUsers = async () => {
    const res = await axios.get(`${baseUrl}/users/count/total`, config())
    return res.data
}

const countUsersThisMonth = async () => {
    const res = await axios.get(`${baseUrl}/users/count/monthly`, config())
    return res.data
}

// Profile
const createProfile = async (profileData) => {
    const formData = new FormData()
    Object.keys(profileData).forEach(key => {
        if (key === 'avatar') {
            formData.append('avatar', profileData[key])
        } else {
            formData.append(key, profileData[key])
        }
    })
    const res = await axios.post(`${baseUrl}/profile`, formData, {
        ...config(),
        headers: { ...config().headers, 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

const getTotalUsersInTwelveMonths = async () => {
  const res = await axios.get(`${baseUrl}/users/stats/monthly-totals`);
  return res.data;
};

const updateUser = async (userId, formData) => {
    const res = await axios.put(
        `${baseUrl}/users/${userId}`,
        formData,
        {
            ...config(),
            headers: {
                ...config().headers,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return res.data;
};

export default {
updateUser, 
  getTotalUsersInTwelveMonths,
  setToken,
  login,
  register,
  getAllUsers,
  getUserById,
  countUsers,
  countUsersThisMonth,
  createProfile
}