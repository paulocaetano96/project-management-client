import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import photogalleryService from "../services/photogallery.services";


// ---------------------------------------------------- CSS IMPORTS
import "../styles/createAndEditDrawers.css";

//Defining a functional component EditPhoto and accepting props as a parameter.
function EditPhoto(props) {
  const { photo, onClose } = props;

  //Initializing the title, description and gallery state variables using useState hook, and setting their default values to the title and description properties of props.photo.
  const [title, setTitle] = useState(props.photo.title);
  const [description, setDescription] = useState(props.photo.description);
  const [gallery, setGallery] = useState(props.photo.gallery);

  //Defining a function handleSubmit to handle form submission, which prevents the default form submission behavior,
  const handleSubmit = async (e) => {
    e.preventDefault();
    //creates a data object containing title, description and gallery properties
    const data = { title, description, gallery };
    console.log(data);

    try {
      //then we call the updatePhoto method of photogalleryService with the data object and the props.photo._id.
      const response = await photogalleryService.updatePhoto(
        props.photo._id,
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

  //Defining 3 functions, to handle the change of the title, description and gallery and update their stated variables.
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleGallery = (e) => {
    setGallery(e.target.value);
  };

  return (
    //Rendering a form with 3 TextField components for title, description and gallery,  respectively. The TextField components are populated with the corresponding state variables and are set to call handleTitle, handleDescription and handleGallery functions, respectively, when their values change. A Button component is also rendered with the label "Edit Photo" and set to submit the form on click, calling the handleSubmit function. The form is wrapped in a form element with the onSubmit attribute set to call handleSubmit function. Finally, the entire form is returned by the component.
    <div  className="full-form-container">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Edit Photos</h2>

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
            label="Gallery"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={gallery}
            onChange={handleGallery}
          />
          <Button type="submit" variant="contained" className="edit-photo-button" >
            Edit Photo
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditPhoto;
