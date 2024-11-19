import {BrowserRouter as Router, Link, Routes, Route, Navigate, useMatch} from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotePage from './pages/NotePage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification/Notification'
import ForgetPassword from './components/Login/ForgetPassword'
import ResetPassword from './components/Login/ResetPassword'
import Note from './components/Notes/Note'
import { useEffect } from 'react'
import { initialNotes } from './reducers/NoteReducer'
import UserService from './services/UserService'
import { setUsers } from './reducers/UserReducer'
import { setLoggedIn } from './reducers/LoggedinReducer'
import User from './components/Users/User'
import RegisterForm from './components/Login/RegisterForm'
// import TryAPIPage from './pages/TryAPIPage'
// import Dictionary from './components/TryAPI/Dictionary'

const App = () => {
  const loggedin = useSelector(state => state.loggedin)
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const notes = useSelector(state => state.notes)
  const match_note = useMatch('/notes/:id')
  const match_user = useMatch('/users/:id')

  const note = match_note
      ? notes.find(note => note.id === Number(match_note.params.id))
      : null

  const user = match_user
    ? users.find(user => user.id === Number(match_user.params.id))
    : null
    
  useEffect(()=>{
      dispatch(initialNotes())
  },[])

  useEffect(()=> {
      UserService
        .getAll()
        .then(res =>  dispatch(setUsers(res)))

  console.log(users)
  },[])

  const handleLogout = () => {
    dispatch(setLoggedIn(null))
  }

  const padding = {
    padding: 5
  }

  return(
    <div>
      <Notification/>
      <div>
        <Link to='/' style={padding}>Home</Link>
        <Link to='/users' style={padding}>User</Link>
        <Link to='/notes' style={padding}>Note</Link>
        <Link to='/try-api' style={padding}>API</Link>
        <span>
          {
            loggedin
                ? 
                  (
                    <span>
                        <em>{loggedin.name} logged in</em>
                        <Link to='/logout' style={padding} onClick={handleLogout}>Logout</Link>
                    </span>

                  )
                : <Link to='/login' style={padding} >Login</Link>
          }
        </span>
      </div>
      <div>
        <strong>~ dubug token: </strong> {loggedin?.token}
      </div>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/notes' element={<NotePage notes={notes}/>}/>
        <Route path='/notes/:id' element={<Note note={note}/>}/>

        <Route path='/users' element={loggedin ? <UserPage users={users}/> : <Navigate replace to='/login'/>}/>
        <Route path='/users/:id' element={loggedin ? <User user={user}/> : <Navigate replace to='/login'/>}/>
      
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/logout' element={<Navigate replace to='/login'/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/forgetpw' element={<ForgetPassword/>}/>
        <Route path='/rspw' element={<ResetPassword/>}/>

        {/* <Route path='/try-api' element={<TryAPIPage/>}/>
        <Route path='/dictionary' element={<Dictionary/>}/> */}
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default App