// Importing React, useState, TextField, Button and messageService components from libraries and services
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import messageService from "../services/message.services";
import { AuthContext } from "../context/auth.context";

//Defining a functional component CreateMessage and accepting props as a parameter.
function CreateMessage(props) {
    // Initializing the state of the component to manage user input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(AuthContext);

  // Function that handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const club = user.club;
    // Assembling the data object to be sent to the server
    const data = { title, description, club };
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

  // Rendering the CreateMessage component with a form to create a new message
  return (
    <div>
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
        <Button type="submit" variant="contained">
          Create Message
        </Button>
      </form>
    </div>
  );
}

export default CreateMessage;
