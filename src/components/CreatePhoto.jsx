import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function CreatePhoto() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/photos`,
        {
          title,
          description,
          gallery,
          url,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append("url", e.target.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      setUrl(response.data.fileUrl);
      console.log("upload console log", response.data.fileUrl);
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  return (
    <div>
      <h1>Please Upload a photo here</h1>

      <div className="upload-document-container">
        <div className="mb-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="url">Insert file</label>
            <input
              type="file"
              name="url"
              id="url"
              onChange={handleFileUpload}
              className="form-control"
              aria-label="file example"
              required
            />

            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="gallery">Gallery</label>
            <input
              type="text"
              name="gallery"
              id="gallery"
              value={gallery}
              onChange={(e) => setGallery(e.target.value)}
            />

            <button type="submit" className="btn btn-primary">
              Submit Photo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePhoto;