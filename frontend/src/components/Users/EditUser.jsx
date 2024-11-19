import { useState } from "react"

const EditUser = ({user, setPageState}) => {
    const [newName, setNewName] = useState(user.name)
    const [newEmail, setNewEmail] = useState(user.email)
    const [newAddress, setNewAddress] = useState(user.profile.address)
    const [newPhone, setNewPhone] = useState(user.profile.phone_number)

    const handleEditUser = (e) =>{
        e.preventDefault()

    }
    return(
        <div>
            <form onSubmit={handleEditUser}>
                <h2>EDIT</h2>
                <h2>user info</h2>
                <div>
                    <strong> id: </strong>
                    <input value={user.id} readOnly/>
                </div>
                <div>
                    <strong> name: </strong>
                    <input value={newName} onChange={(e)=> setNewName(e.target.value)}/>
                </div>
                <div>
                    <strong> email: </strong>
                    <input value={newEmail} onChange={(e)=> setNewEmail(e.target.value)}/>
                </div>
                <h2>profile</h2>
                <div>
                    <strong> address: </strong>
                    <input value={newAddress} onChange={(e)=> setNewAddress(e.target.value)}/>
                </div>
                <div>
                    <strong> phone: </strong>
                    <input value={newPhone} onChange={(e)=> setNewPhone(e.target.value)}/>
                </div>
                <button type="submit">save</button>
                <button onClick={setPageState}>back</button>
            </form>
        </div>
    )
}
export default EditUser