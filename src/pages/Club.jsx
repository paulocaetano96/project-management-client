import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import clubService from '../services/club.services';


function Club() {

   const [club, setClub] = useState(null);

   const { id } = useParams();

   const getClub = async () => {
    try {
      
      const response = await clubService.getClub(id);
      setClub(response.data);

      
    } catch (error) {
      console.log(error);
    }
   }
   
   useEffect(() => {
    getClub();
   }, [])

   
  return (

     
    <div>
    {club  && (
      <div>
      <p>Club Name: </p>
       <p>{club.name}</p>
       <p>{club.sport}</p>
       <p>{club.primaryColor}</p>
       <p>{club.secondaryColor}</p>
       <p>{club.teams}</p>
       <p>Invite Key: {club._id}</p>


       </div>
    )}
      
    </div>
  );
};

export default Club;
