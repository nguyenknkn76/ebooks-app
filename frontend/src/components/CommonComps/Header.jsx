import {BrowserRouter as Router, Link, Routes, Route, Navigate, useMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../reducers/LoggedinReducer';

const Header = () => {
  const loggedin = useSelector(state => state.loggedin);

  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(setLoggedIn(null));
  };

  const padding = {
    padding: 5
  };

  return(
    <div>
      this is header
      <div>
        <img src='https://nguyentdkptit02-cover-images.s3.ap-southeast-2.amazonaws.com/logo1.jpg'/>
      </div>
      <Link to='/' style={padding}>Home</Link>
      <Link to='/users' style={padding}>User</Link>
      <span>
        {
          loggedin ?
          (
            <span>
              <em>{loggedin.name} loggedin</em>
              <Link to='/logout' style={padding} onClick={handleLogout}>Logout</Link>
            </span>
          )
          : <Link to='/login' style={padding}>Login</Link>
        }
      </span>
    </div>
  );
};

export default Header;