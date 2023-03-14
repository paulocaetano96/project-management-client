import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import documentService from "../services/document.services";

//Defining a functional component EditDocument and accepting props as a parameter.
function EditDocument(props) {
  const { document, onClose } = props;

  //Initializing the title and description state variables using useState hook, and setting their default values to the title and description properties of props.message.
  const [title, setTitle] = useState(props.document.title);
  const [description, setDescription] = useState(props.document.description);
  const [group, setGroup] = useState(props.document.group);

  //Defining a function handleSubmit to handle form submission, which prevents the default form submission behavior,
  const handleSubmit = async (e) => {
    e.preventDefault();
    //creates a data object containing title and description properties
    const data = { title, description, group };
    try {
      //then we call the updateDocument method of documentervice with the data object and the props.document._id.
      const response = await documentService.updateDocument(
        props.document._id,
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

  //Defining 3 functions, to handle the change of the title, description and group and update their stated variables.
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleGroup = (e) => {
    setGroup(e.target.value);
  };

  return (
    //Rendering a form with 4 TextField components for title, description and group,  respectively. The TextField components are populated with the corresponding state variables and are set to call handleTitle and handleDescription functions, respectively, when their values change. A Button component is also rendered with the label "Edit Document" and set to submit the form on click, calling the handleSubmit function. The form is wrapped in a form element with the onSubmit attribute set to call handleSubmit function. Finally, the entire form is returned by the component.
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

      <TextField
        label="Group"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={group}
        onChange={handleGroup}
      />
      <Button type="submit" variant="contained">
        Edit Document
      </Button>
    </form>
  );
}

export default EditDocument;
