import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// ---------------------------------------------------- CSS IMPORTS
import "../styles/createAndEditDrawers.css";

function SubmitDocument({onClose}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/documents`,
        {
          title,
          description,
          fileUrl,
          group,
        }
      );
      onClose();
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
    uploadData.append("fileUrl", e.target.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      setFileUrl(response.data.fileUrl);
      console.log("upload console log", response.data.fileUrl);
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  return (

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

            <label htmlFor="group">Group</label>
            <input
              type="text"
              name="group"
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />

            <button type="submit" id="button">
              Submit Document
            </button>
          </form>
          
    
  );
}

export default SubmitDocument;