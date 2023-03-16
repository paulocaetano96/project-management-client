import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import clubService from "../services/club.services";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// ---------------------------------------------------- CSS IMPORTS
import "../styles/createAndEditDrawers.css";

function CreatePhoto({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [club, setClub] = useState(null);
  const { user } = useContext(AuthContext);

  const getClub = async () => {
    try {
      const response = await clubService.getClub(user.club);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/photos`,
        {
          title,
          description,
          gallery,
          fileUrl,
          club: club._id,
        }
      );
      onClose();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const uploadData = new FormData();
      uploadData.append("fileUrl", e.target.files[0]);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      console.log("upload console log", response.data.fileUrl);
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <div className="full-form-container">
      <div>
        <h2>Please Upload a photo here</h2>
        {club && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="fileUrl">Insert file</label>
            <input
              type="file"
              name="fileUrl"
              id="fileUrl"
              onChange={handleFileUpload}
              className="form-control"
              aria-label="file example"
              required
            />

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
              label="Gallery"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              maxRows={4}
              required
              value={gallery}
              onChange={(e) => setGallery(e.target.value)}
            />

            <button type="submit" id="add-event-button">
              Submit Photo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreatePhoto;
