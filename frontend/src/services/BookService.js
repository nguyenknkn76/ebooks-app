import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/users'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const update = async (newUser) => {
    const res = await axios.put(`${baseUrl}/${user.id}`, newUser)
    return res.data
}

const udpateContent = async (newNote) => {
    const res = await axios.put(`${baseUrl}/${newNote.id}`, newNote)
    return res.data
}

const create = async (newNote, loggedinToken) => {
    setToken(loggedinToken)
    const config = {
        headers: { Authrorization: token },
    }
    console.log(config, newNote, baseUrl)
    const res = await axios.post(baseUrl, newNote)
    return res.data
}

const remove = async note => {
    const res = await axios.delete(`${baseUrl}/${note.id}`)
    console.log(res)
    return res.data
}

export default {getAll, update, create,  remove, setToken, udpateContent}