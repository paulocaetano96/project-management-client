import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import clubService from "../services/club.services";
import EditClub from "../components/EditClub";

// CSS imports
import '../styles/navconsole.css';


function Club() {
  const [club, setClub] = useState(null);

  //for the handler function:
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  //const [state, setState] = useState({top: false});: Initializes a state variable called state as an object with two properties top and left, both initialized as false. Also initializes a function called setState that can be used to update the state.
  const [state, setState] = useState({
    top: false,
  });

  //const getClub = async () => {...}: Defines a function called getClub that uses the clubService object to make a GET request to the server to retrieve the club.
  const getClubs = async () => {
    try {
      const response = await documentService.getClubs();
      getClubs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();

  const getClub = async () => {
    try {
      const response = await clubService.getClub(id);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <div>
      {/*       {club && (
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
 */}
      {club && <EditClub club={club} />}

      <div>
      
      {club && <p>Invite Key: {club._id}</p>}
      </div>
    </div>
  );
}

export default Club;
