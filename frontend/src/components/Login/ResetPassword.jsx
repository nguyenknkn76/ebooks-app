import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginService from "../../services/LoginService"
import { setMsg } from "../../reducers/MessageReducer"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const dispatch = useDispatch()
    const rspwemail = useSelector(state => state.rspwemail)
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    
    const handleResetPW = (event) => {
        event.preventDefault()
        console.log('rspw')
        const rspwInfo = {
            email: rspwemail,
            otp,
            password,
            password_confirmation
        }
        LoginService
            .rspw(rspwInfo)
            .then(res => dispatch(setMsg(res.message)))
        navigate('/login')
    }
    return(
        <div>
            this is rs pw 
            <form onSubmit={handleResetPW}>
                <div>
                    otp: <input value={otp} onChange={(e) => setOtp(e.target.value)}/>
                </div>
                <div>
                    email: <input value={rspwemail === null ? '' : rspwemail} readOnly/>
                </div>
                <div>
                    pw: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    cofnirm pw: <input type='password' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                </div>
                <button type="submit">reset</button>
            </form>
        </div>
    )
}

export default ResetPassword

// {
//     "email": "uiojklzxc02@gmail.com",
//     "otp": "235916",
//     "password": "newpassword",
//     "password_confirmation": "newpassword"
// }