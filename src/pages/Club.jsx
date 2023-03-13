import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import clubService from '../services/club.services';


function Club() {

  const [club, setClub] = useState('');
  const [name, setName] = useState('');




  return (
    <div>
      <p>Club Name: </p>
      <p>{name}</p>
    </div>
  );
};

export default Club;
