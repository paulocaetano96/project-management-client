import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import messageService from "../services/message.services";

//Defining a functional component EditMessage and accepting props as a parameter.
function EditMessage(props) {

  const { message, onClose } = props;

  //Initializing the title and description state variables using useState hook, and setting their default values to the title and description properties of props.message.
  const [title, setTitle] = useState(props.message.title);
  const [description, setDescription] = useState(props.message.description);


  //Defining a function handleSubmit to handle form submission, which prevents the default form submission behavior,
  const handleSubmit = async (e) => {
    e.preventDefault();
    //creates a data object containing title and description properties
    const data = { title, description };
    try {
        //then we call the updateMessage method of messageService with the data object and the props.message._id. 
      const response = await messageService.updateMessage(
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
//Rendering a form with two TextField components for title and description, respectively. The TextField components are populated with the corresponding state variables and are set to call handleTitle and handleDescription functions, respectively, when their values change. A Button component is also rendered with the label "Edit Message" and set to submit the form on click, calling the handleSubmit function. The form is wrapped in a form element with the onSubmit attribute set to call handleSubmit function. Finally, the entire form is returned by the component.
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={title}
        onChange={handleTitle}
      />
      <TextField
        label="Description"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={description}
        onChange={handleDescription}
      />
      <Button type="submit" variant="contained">
        Edit Message
      </Button>
    </form>
  );
}

export default EditMessage;
