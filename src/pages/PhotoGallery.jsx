import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

import axios from "axios";

import fileDownload from "js-file-download";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from "@mui/material/TextField";

import CreatePhoto from "../components/CreatePhoto";
import EditPhoto from "../components/EditPhoto";

import photogalleryService from "../services/photogallery.services";

//-------------------------------------------CSS imports

import "../styles/photoGallery.css"

function PhotoGallery() {
  //Initializes a state variable called photos as an empty array and a function called setPhotos that can be used to update the photos state.
  const [photos, setPhotos] = useState([]);
  //const { loggedIn, user } = useContext(AuthContext);: Initializes two variables loggedIn and user from the AuthContext using the useContext hook.
  const { user } = useContext(AuthContext);
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

      const filteredPhotos = response.data.filter((photo) => {
        return photo.club === user.club
      })
      setPhotos(filteredPhotos);

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
  }, [user, state]);

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
    } else setSelectedPhoto(null);

    setState({ ...state, [anchor]: open });
  };

  //const handleEditDrawer = (photo) => {...}: Defines a function called handleEditDrawer that takes in a photo object as an argument. The function updates the selectedPhoto state with the photo object and sets the state.top property to true.
  const handleEditDrawer = (photo) => {
    setSelectedPhoto(photo);
    setState({ ...state, top: true });
  };

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div id='photogallery-box'>
      {/* render Drawer component with anchor "top" for creating/editing photos */}
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* button to open Drawer and show create photo form */}

          <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={toggleDrawer(anchor, true)} id="upload-message-btn">
              Upload Photo
            </Button>
          </Stack>

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
      <div className='photos-container'>
        {/* if photos is not null or undefined, map over photos array and render each photo as an article */}
{/*         <div className='heading'>
              <h3>Photo Gallery</h3>
        </div> */}

        {photos &&
          photos.map((photo) => {
            return (
              <article key={photo._id} className='individual-photo-section'>
                  <img src={photo.fileUrl} alt={photo.title} className='individual-photo'/>
                <details >
                  <summary></summary>
                  <div className='photo-dropdown'>
                    <Link
                      onClick={() =>
                        handleDownload(
                          photo.fileUrl,
                          `${photo.title}${photo.fileUrl.slice(-4)}`
                        )
                      }
                    >
                    <h3>{photo.title}<span className='mini-text'>click to download</span></h3>
                    </Link>
                    <p>{photo.description}</p>
                    <p>{photo.gallery}</p>
                    
                    <div className='secondary-btn-container'>
                      {/* button to open Drawer and show edit photo form */}
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" endIcon={<EditIcon />} onClick={() => handleEditDrawer(photo)} className="secondary-btn">
                          Edit
                        </Button>
                      </Stack>
                      {/* button to delete photo with given id */}

                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" endIcon={<DeleteIcon />} onClick={() => handleDeletePhoto(photo._id)} className="secondary-btn">
                          Delete
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </details>
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
