import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// CSS imports
import '../styles/navconsole.css';
//authentication:
import { AuthContext } from '../context/auth.context';
import Club from '../pages/Club';
import Documents from '../pages/Documents';

function NavConsole() {
  //authentication access
  const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav className="navconsole">
      {/* home should be available to everyone */}
      <Link to="/home" className="navconsole-link">Home</Link>

      {/* if the user is logged In, we show the Projects and Add projects, information we want to show ONLY to people that are already logged in */}
      {loggedIn ? (
        <>
          <span>Hello {user.name}</span>

          <Link to="/calendar" className="navconsole-link">Calendar</Link>

          <Link to="/documents" className="navconsole-link">Documents</Link>

            {user.role === "staff" && (
              <Link to={`/club/${user.club}`}  className="navconsole-link">Club</Link>
            )}

          <Link to="/photos" className="navconsole-link">Photo Gallery</Link>

          {/* inside this onClick, is the function we passed it on the const {loggedIn, user, logout} and both these logout are the same, they're comming from the auth.context.jsx file, we have that function there. */}
          <button onClick={logout} className="navconsole-button">Logout</button>
        </>
      ) : (
        //-> OR, if the user is NOT logged in, we show on the navbar, the Signup and Login links
        <>
          <Link to="/signup" className="navconsole-link">Signup</Link>
          <Link to="/login" className="navconsole-link">Login</Link>
        </>
      )}
    </nav>
  );
}

export default NavConsole;
