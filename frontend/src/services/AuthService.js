import axios from "axios"

const baseUrl = 'http://localhost:8000/api'

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/login`, credentials)
    return res.data
}

const forgetPW =  async email => {
    const objectToSend = {email}
    const res = await axios.post(`${baseUrl}/send-otp`, objectToSend)
    return res.data
}

const rspw = async rspwInfo => {
    const res = await axios.post(`${baseUrl}/verify-otp`, rspwInfo)
    return res.data
}

export default {login, forgetPW, rspw}