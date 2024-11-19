import { useDispatch, useSelector } from "react-redux"
import { initialNotes, setNotes, updateNoteImp } from "../../reducers/NoteReducer"
import { useEffect } from "react"
import { Link, useMatch } from "react-router-dom"
// import NoteService from "../../services/NoteService"
// import { setMsg } from "../../reducers/MessageReducer"

const Users = ({users}) => {
    const dispatch = useDispatch()
    
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>profile_address</th>
                        <th>profile_phone</th>
                        <th>view</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => 
                        <tr key={user.id} >
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.profile ? user.profile.address : 'sus'}</td>
                            <td>{user.profile ? user.profile.phone_number : 'sus'}</td>
                            <td><Link to={`/users/${user.id}`}>view</Link></td>
                        </tr>
                    )}
                </tbody>   
            </table>
        </div>
    )
}
export default Users