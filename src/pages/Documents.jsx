import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import SubmitDocument from "../components/SubmitDocument";
import documentService from "../services/document.services";

import CreateMessage from "../components/CreateMessage";
import EditMessage from "../components/EditMessage";




function Documents() {

   //Initializes a state variable called documents as an empty array and a function called setDocuments that can be used to update the documents state.
   const [documents, setDocuments] = useState([]);
   //const { loggedIn, user } = useContext(AuthContext);: Initializes two variables loggedIn and user from the AuthContext using the useContext hook.
   const { loggedIn, user } = useContext(AuthContext);
     //const [selectedDocument, setSelectedDocument] = useState(null);: Initializes a state variable called selectedDocument as null and a function called setSelectedDocument that can be used to update the selectedDocument state.
   const [selectedDocument, setSelectedDocument] = useState(null);
 
   //const [state, setState] = useState({top: false});: Initializes a state variable called state as an object with two properties top and left, both initialized as false. Also initializes a function called setState that can be used to update the state.
   const [state, setState] = useState({
     top: false
   });


   //const getDocuments = async () => {...}: Defines a function called getDocuments that uses the documentService object to make a GET request to the server to retrieve all messages.
  const getDocuments = async () => {
    try {
      const response = await messageService.getDocuments();
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <SubmitDocument />
    </div>
  )
}

export default Documents