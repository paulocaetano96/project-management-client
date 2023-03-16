import React, { useState } from "react";
import clubService from "../services/club.services";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditClub(props) {
  //Initializing the name, sport, primaryColor, secondaryColor and teams state variables using useState hook, and setting their default values to the name and sport properties of props.message.
  const [name, setName] = useState(props.club.name);
  const [sport, setSport] = useState(props.club.sport);
  const [primaryColor, setPrimaryColor] = useState(props.club.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    props.club.secondaryColor
  );
  const [teams, setTeams] = useState(props.club.teams);
  const [members, setMembers] = useState(props.club.members);

  //Defining a function handleSubmit to handle form submission, which prevents the default form submission behavior,
  const handleSubmit = async (e) => {
    e.preventDefault();

    //creates a data object containing the club's properties
    const data = { name, sport, primaryColor, secondaryColor, teams, members };
    try {
      //then we call the updateClub method of clubService with the data object and the props.club._id.
      const response = await clubService.updateClub(props.club._id, data);

      //If the update is successful, it logs the response data
      console.log(response.data);
      //calls props.onClose() to close the form
      props.onClose();
    } catch (error) {
      //If there's an error, it logs the error.
      console.log(error);
    }
  };

  //Defining 6 functions, to handle the change of the name, sport, primaryColor, secondaryColor, teams and members, and update their stated variables.
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSport = (e) => {
    setSport(e.target.value);
  };

  const handlePrimaryColor = (e) => {
    setPrimaryColor(e.target.value);
  };

  const handleSecondaryColor = (e) => {
    setSecondaryColor(e.target.value);
  };

  const handleTeams = (e) => {
    setTeams(e.target.value);
  };

  const handleMembers = (e) => {
    setMembers(e.target.value);
  };

  console.log(members[0].name);

  return (
    //Rendering a form with 4 TextField components for title, description and group,  respectively. The TextField components are populated with the corresponding state variables and are set to call handleTitle and handleDescription functions, respectively, when their values change. A Button component is also rendered with the label "Edit Document" and set to submit the form on click, calling the handleSubmit function. The form is wrapped in a form element with the onSubmit attribute set to call handleSubmit function. Finally, the entire form is returned by the component.
    <div>
      <div>
        <form onSubmit={handleSubmit}>
        <h2>Create New Message</h2>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={name}
            onChange={handleName}
          />
          <TextField
            label="Sport"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={sport}
            onChange={handleSport}
          />

          <TextField
            label="Primary Color"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={primaryColor}
            onChange={handlePrimaryColor}
          />

          <TextField
            label="secondary Color"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={secondaryColor}
            onChange={handleSecondaryColor}
          />

          <TextField
            label="Teams"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={teams}
            onChange={handleTeams}
          />

          <TextField
            label="Members"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={members.map((member) => member.name).join(", ")}
            onChange={handleMembers}
          />

          <Button type="submit" variant="contained">
            Edit Club Details
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditClub;
