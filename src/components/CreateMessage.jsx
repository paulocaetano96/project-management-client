// Importing React, useState, TextField, Button and messageService components from libraries and services
import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import messageService from "../services/message.services";
import { AuthContext } from "../context/auth.context";
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import clubService from '../services/club.services';

//Defining a functional component CreateMessage and accepting props as a parameter.
function CreateMessage(props) {
    // Initializing the state of the component to manage user input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDays, setExpirationDays] = useState("");
  const [important, setImportant] = useState(false)
  const [club, setClub] = useState(null)
  const { user } = useContext(AuthContext);

  const getClub = async () => {
    try {
      const response = await clubService.getClub(user.club);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = (e) => {
    console.log(e)
    setImportant(e.target.checked);
  };

  // Function that handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sentTo = [];
    const membersArray = club.members;
    membersArray.forEach((member) => {
      sentTo.push(member._id)
    })
    console.log(sentTo)

    // Assembling the data object to be sent to the server
    const data = { title, description, club: club._id, sentTo, important, expirationDays };
    try {
        // Making an API call to create a new message using messageService
      const response = await messageService.createMessage(data);

      console.log(response.data);
      // Closing the form after the message has been created
      props.onClose();

    } catch (error) {
        // Handling errors
      console.log(error);
    }
  };

  useEffect(() => {
    getClub();
  }, []);

  // Rendering the CreateMessage component with a form to create a new message
  return (
    
    <div>
    {club && (
      <form onSubmit={handleSubmit}>
        <h1>Create New Message</h1>
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          maxRows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Expires in (days)"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          maxRows={1}
          value={expirationDays}
          onChange={(e) => setExpirationDays(e.target.value)}
        />
        <FormGroup>
          <FormControlLabel control={
            <Checkbox
              checked={important === true}
              onChange={handleImportant}
              inputProps={{ 'aria-label': 'controlled' }}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
            />} label="set as important" />
        </FormGroup>
        <Button type="submit" variant="contained">
          Create Message
        </Button>
      </form>
    )}
    </div>
  );
}

export default CreateMessage;
