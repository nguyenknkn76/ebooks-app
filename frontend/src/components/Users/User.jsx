import { useRef, useState } from "react"
import Togglabel from "../Togglabel/Togglabel"
import ReadUser from "./ReadUser"
import EditUser from "./EditUser"

const User = ({user}) => {
    const [pageState, setPageState] = useState('readuser')

    
    return(
        <div>
            {
                pageState === 'readuser' 
                    ? <ReadUser user={user} setPageState={()=> setPageState('edituser')}/>
                    : <EditUser user={user} setPageState={()=> setPageState('readuser')}/>
            }
        </div>
    )
}
export default User