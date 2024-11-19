import { useState } from "react"
import LoginService from "../../services/LoginService"
import { useDispatch } from "react-redux"
import { setMsg } from "../../reducers/MessageReducer"
import { useNavigate } from "react-router-dom"
import { setChoosedEmail } from "../../reducers/ChoosedEmail"

const ForgetPassword = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleForgetPW = async (event) => {
        event.preventDefault()
        console.log('try rs')
        setEmail('')
        dispatch(setChoosedEmail(event.target.rspwemail.value))
        await LoginService
            .forgetPW(email)
            .then(res => dispatch(setMsg(res.message)))
        navigate('/rspw')
    }
    return(
        <div>
            this is forget password
            <form onSubmit={handleForgetPW}>
                <input value={email} name='rspwemail' placeholder='enter ur email here' onChange={(e)=> setEmail(e.target.value)}/>
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}
export default ForgetPassword