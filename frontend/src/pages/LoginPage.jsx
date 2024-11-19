import React from "react"
import { useState } from "react"
import LoginService from "../services/LoginService"
import { useDispatch, useSelector } from "react-redux"
import { setLoggedIn } from "../reducers/LoggedinReducer"
import ForgetPassword from "../components/Login/ForgetPassword"
import { Routes, useNavigate } from "react-router-dom"
import { Link, Route } from "react-router-dom"
import NoteService from "../services/NoteService"

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedin = useSelector(state => state.loggedin)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [forgetPassword, setForgetPassword] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('try login')
        setEmail('')
        setPassword('')
        const credentials = {
            email,
            password
        }
        const resUser = await LoginService.login(credentials)
        dispatch(setLoggedIn(resUser))

        navigate('/')
    }

    return(
        <div>
            this is Login
            <form onSubmit={handleLogin}>
                <div>
                    email: <input value={email} type='text' onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div>
                    password: <input value={password} type='password' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div>debug pw: {password}</div>
                <button type="submit">login</button>
            </form> 
            {/* <a href="#" onClick={()=>setForgetPassword(true)}>forget password</a> */}
            <div>
                {/* {
                    forgetPassword && 
                    <div>
                        <ForgetPassword/>
                    </div>
                } */}
                <div>
                    <Link to='/forgetpw' >rs pw here</Link>
                </div>
                
                <Link to='/register'>dont have acc, register here</Link>
            </div>
        </div>
    )
}

export default LoginPage