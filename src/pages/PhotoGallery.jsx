import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import CreatePhoto from "../components/CreatePhoto";
import EditPhoto from "../components/EditPhoto";

import photogalleryService from "../services/photogallery.services";

function PhotoGallery() {
  //Initializes a state variable called photos as an empty array and a function called setPhotos that can be used to update the photos state.
  const [photos, setPhotos] = useState([]);
  //const { loggedIn, user } = useContext(AuthContext);: Initializes two variables loggedIn and user from the AuthContext using the useContext hook.
  const { loggedIn, user } = useContext(AuthContext);
  //const [selectedPhoto, setSelectedPhoto] = useState(null);: Initializes a state variable called selectedPhoto as null and a function called setSelectedPhoto that can be used to update the selectedPhoto state.
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  //const [state, setState] = useState({top: false});: Initializes a state variable called state as an object with one property,top, initialized as false. Also initializes a function called setState that can be used to update the state.
  const [state, setState] = useState({
    top: false,
  });

  //const getPhotos = async () => {...}: Defines a function called getPhotos that uses the photogalleryService object to make a GET request to the server to retrieve all photos.
  const getPhotos = async () => {
    try {
      const response = await photogalleryService.getPhotos();
      setPhotos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------------------- Handler functions ⤵

  //const handleUpdatePhoto = async (updatedPhoto) => {...}: Defines a function called handleUpdatePhoto that takes in an updatedPhoto object as an argument. The function uses the photogalleryService object to make a PUT request to the server to update the updatedPhoto. It then updates the photos state with the updated photo and sets the selectedPhoto and state.top state to null and false, respectively.
  const handleUpdatePhoto = async (updatedPhoto) => {
    try {
      const response = await photogalleryService.updatePhoto(
        updatedPhoto._id,
        updatedPhoto
      );
      console.log(response.data);
      const updatedPhotos = photos.map((m) =>
        m._id === updatedPhoto._id ? response.data : m
      );
      setPhotos(updatedPhotos);
      setSelectedPhoto(null);
      setState({ ...state, top: false });
    } catch (error) {
      console.log(error);
    }
  };

  // async function to handle deleting a photo
  const handleDeletePhoto = async (id) => {
    try {
      // delete photo with given id using photogalleryService
      const response = await photogalleryService.deletePhoto(id);
      // log response data to console
      console.log(response.data);
      // filter out deleted photo from photos state and update photos state with remaining photos
      const filteredPhotos = photos.filter((m) => m._id !== id);
      setPhotos(filteredPhotos);
    } catch (error) {
      // log any errors to console

      console.log(error);
    }
  };

  //useEffect(() => {...}, []);: Runs the getPhotos function when the component mounts.
  useEffect(() => {
    getPhotos();
  }, [state]);

  //------------------------------------------------------------- MUI Drawer functions ⤵

  //const toggleDrawer = (anchor, open, photo) => (event) => {...}: Defines a function called toggleDrawer that takes in anchor, open, and photo as arguments. The function returns another function that updates the state with the new anchor and open values and updates the selectedPhoto state if photo is defined.
  const toggleDrawer = (anchor, open, photo) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (photo) {
      setSelectedPhoto(photo);
    }

    setState({ ...state, [anchor]: open });
  };

  //const handleEditDrawer = (photo) => {...}: Defines a function called handleEditDrawer that takes in a photo object as an argument. The function updates the selectedPhoto state with the photo object and sets the state.top property to true.
  const handleEditDrawer = (photo) => {
    setSelectedPhoto(photo);
    setState({ ...state, top: true });
  };

  

  return (
    <div>
      {/* render Drawer component with anchor "top" for creating/editing photos */}
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* button to open Drawer and show create photo form */}
          <Button onClick={toggleDrawer(anchor, true)}>Upload Photo</Button>
          {/* Drawer component containing either CreatePhoto or EditPhoto component */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {selectedPhoto ? (
              // render EditPhoto component with selectedPhoto props
              <EditPhoto
                photo={selectedPhoto}
                onUpdate={handleUpdatePhoto}
                onDelete={handleDeletePhoto}
                onClose={() => {
                  setSelectedPhoto(null);
                  setState({ ...state, top: false });
                }}
              />
            ) : (
              // render CreatePhoto component
              <CreatePhoto
                onClose={() => setState({ ...state, [anchor]: false })}
              />
            )}
          </Drawer>
        </React.Fragment>
      ))}

      {/* render list of photos */}
      <div className="photogallery-container">
        {/* if photos is not null or undefined, map over photos array and render each photo as an article */}
        {photos &&
          photos.map((photo) => {
            return (
              <article key={photo._id}>
                <img src={photo.fileUrl} alt={photo.title} />
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
                <p>{photo.gallery}</p>
                <div>
                  {/* button to open Drawer and show edit photo form */}
                  <button onClick={() => handleEditDrawer(photo)}>
                    Edit Photo Details
                  </button>
                  {/* button to delete photo with given id */}
                  <button onClick={() => handleDeletePhoto(photo._id)}>
                    Delete Photo
                  </button>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}
{
}
export default PhotoGallery;
