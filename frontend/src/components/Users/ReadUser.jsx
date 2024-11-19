const ReadUser = ({user, setPageState}) => {
        
    return(
        <div>
            <h2>VIEW</h2>
            <h2>user info</h2>
            <div>
                <strong> id: </strong>
                <input value={user.id} readOnly/>
            </div>
            <div>
                <strong> name: </strong>
                <input value={user.name} readOnly/>
            </div>
            <div>
                <strong> email: </strong>
                <input value={user.email} readOnly/>
            </div>
            <h2>profile</h2>
            <div>
                <strong> address: </strong>
                <input value={user.profile.address} readOnly/>
            </div>
            <div>
                <strong> phone: </strong>
                <input value={user.profile.phone_number} readOnly/>
            </div>
            <button onClick={setPageState}>edit</button>
        </div>
    )
}
export default ReadUser