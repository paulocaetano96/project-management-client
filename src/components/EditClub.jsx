import React, { useState } from "react";
import clubService from "../services/club.services";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditClub(props) {

  //Initializing the name, sport, primaryColor, secondaryColor and teams state variables using useState hook, and setting their default values to the name and sport properties of props.message.
  const [name, setName] = useState(props.club.name);
  const [sport, setSport] = useState(props.club.sport);
  const [primaryColor, setPrimaryColor] = useState(props.club.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(props.club.secondaryColor);
  const [teams, setTeams] = useState(props.club.teams);


  //Defining a function handleSubmit to handle form submission, which prevents the default form submission behavior,
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //creates a data object containing the club's properties
    const data = { name, sport, primaryColor, secondaryColor, teams };
    try {
        //then we call the updateMessage method of messageService with the data object and the props.message._id. 
      const response = await clubService.updateMessage(
        props.message._id,
        data
      );

      //If the update is successful, it logs the response data
      console.log(response.data);
      //calls props.onClose() to close the form
      props.onClose();
    } catch (error) {
        //If there's an error, it logs the error.
      console.log(error);
    }
  };

  //Defining 2 functions, to handle the change of the title and description and update their stated variables.
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };


  return (
    <div>EditClub</div>
  )
}

export default EditClub