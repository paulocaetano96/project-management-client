import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
//authentication:
import { AuthContext } from '../context/auth.context';
import Club from '../pages/Club';
import Documents from '../pages/Documents';

function NavConsole() {
    //authentication access
    const { loggedIn, user, logout } = useContext(AuthContext);
  
    return (
      <nav className="navconsole-links">
        
  
        {/* if the user is logged In, we show the Projects and Add projects, information we want to show ONLY to people that are already logged in */}
        {loggedIn ? (
          <>
            <span>Hello {user.name}</span>

            <Link to="/home">Home</Link>
  
            <Link to="/calendar">Calendar</Link>

            <Link to="/documents">Documents</Link>

            {user.role === "staff" && (
              <Link to={`/club/${user.club}`}>Club</Link>
            )}

            <Link to="/photos">Photo Gallery</Link>
            
            {/* inside this onClick, is the function we passed it on the const {loggedIn, user, logout} and both these logout are the same, they're comming from the auth.context.jsx file, we have that function there. */}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          //-> OR, if the user is NOT logged in, we show on the navbar, the Signup and Login links
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    );
  }
  
  export default NavConsole;
  
