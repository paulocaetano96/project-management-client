import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


import clubService from '../services/club.services';


function Club() {

/*   const { loggedIn, user, logout } = useContext(AuthContext);
 */




  return (
    <div>
      <p>Club Name: </p>
       <p>{user.name}</p>}
    </div>
  );
};

export default Club;
