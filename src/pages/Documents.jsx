import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import SubmitDocument from "../components/SubmitDocument";
import EditDocument from "../components/EditDocument";

import documentService from "../services/document.services";

import fileDownload from "js-file-download";
import axios from "axios";

//-------------------------------------------CSS imports
import "../styles/documents.css";
import "../styles/createAndEditDrawers.css";

function Documents() {
  //Initializes a state variable called documents as an empty array and a function called setDocuments that can be used to update the documents state.
  const [documents, setDocuments] = useState([]);
  //const { loggedIn, user } = useContext(AuthContext);: Initializes two variables loggedIn and user from the AuthContext using the useContext hook.
  const { loggedIn, user } = useContext(AuthContext);
  //const [selectedDocument, setSelectedDocument] = useState(null);: Initializes a state variable called selectedDocument as null and a function called setSelectedDocument that can be used to update the selectedDocument state.
  const [selectedDocument, setSelectedDocument] = useState(null);

  //const [state, setState] = useState({top: false});: Initializes a state variable called state as an object with two properties top and left, both initialized as false. Also initializes a function called setState that can be used to update the state.
  const [state, setState] = useState({
    top: false,
  });

  //const getDocuments = async () => {...}: Defines a function called getDocuments that uses the documentService object to make a GET request to the server to retrieve all documents.
  const getDocuments = async () => {
    try {
      const response = await documentService.getDocuments();
      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------------------- Handler functions ⤵

  //const handleUpdateDocument = async (updatedDocument) => {...}: Defines a function called handleUpdateDocument that takes in an updatedDocument object as an argument. The function uses the documentService object to make a PUT request to the server to update the updatedDocument. It then updates the documents state with the updated document and sets the selectedDocument and state.top state to null and false, respectively.
  const handleUpdateDocument = async (updatedDocument) => {
    try {
      const response = await documentService.updateDocument(
        updatedDocument._id,
        updatedDocument
      );
      console.log(response.data);
      const updatedDocuments = documents.map((m) =>
        m._id === updatedDocument._id ? response.data : m
      );
      setDocuments(updatedDocuments);
      setSelectedDocument(null);
      setState({ ...state, top: false });
    } catch (error) {
      console.log(error);
    }
  };

  // async function to handle deleting a document
  const handleDeleteDocument = async (id) => {
    try {
      // delete document with given id using documentService
      const response = await documentService.deleteDocument(id);
      // log response data to console
      console.log(response.data);
      // filter out deleted document from documents state and update documents state with remaining documents
      const filteredDocuments = documents.filter((m) => m._id !== id);
      setDocuments(filteredDocuments);
    } catch (error) {
      // log any errors to console

      console.log(error);
    }
  };

  //useEffect(() => {...}, []);: Runs the getDocuments function when the component mounts.
  useEffect(() => {
    getDocuments();
  }, [state]);

  //------------------------------------------------------------- MUI Drawer functions ⤵

  //const toggleDrawer = (anchor, open, document) => (event) => {...}: Defines a function called toggleDrawer that takes in anchor, open, and document as arguments. The function returns another function that updates the state with the new anchor and open values and updates the selectedDocument state if document is defined.
  const toggleDrawer = (anchor, open, document) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (document) {
      setSelectedDocument(document);
    }

    setState({ ...state, [anchor]: open });
  };

  //const handleEditDrawer = (document) => {...}: Defines a function called handleEditDrawer that takes in a document object as an argument. The function updates the selectedDocument state with the document object and sets the state.top property to true.
  const handleEditDrawer = (document) => {
    setSelectedDocument(document);
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
    <div className="homepage-container-total">
      
      {/* render Drawer component with anchor "top" for creating/editing documents */}
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* button to open Drawer and show create document form */}
          <Button onClick={toggleDrawer(anchor, true)}>SUBMIT DOCUMENT</Button>
          {/* Drawer component containing either CreateDocument or EditDocument component */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {selectedDocument ? (
              // render EditDocument component with selectedDocument props
              <EditDocument
                document={selectedDocument}
                onUpdate={handleUpdateDocument}
                onDelete={handleDeleteDocument}
                onClose={() => {
                  setSelectedDocument(null);
                  setState({ ...state, top: false });
                }}
              />
            ) : (
              // render SubmitDocument component
              <SubmitDocument
                onClose={() => setState({ ...state, [anchor]: false })}
              />
            )}
          </Drawer>
        </React.Fragment>
      ))}

      {/* render list of documents */}
      <div className="document-container">
        {/* if documents is not null or undefined, map over documents array and render each document as an article */}
        {documents &&
          documents.map((document) => {
            return (
              <article key={document._id}>

                <Link
                  onClick={() =>
                    handleDownload(
                      document.fileUrl,
                      `${document.title}${document.fileUrl.slice(-4)}`
                    )
                  }
                >
                  <h3>{document.title}</h3>
                </Link>

                <p>{document.description}</p>
                <div>
                  {/* button to open Drawer and show edit document form */}
                  <button onClick={() => handleEditDrawer(document)}>
                    Edit Document
                  </button>
                  {/* button to delete document with given id */}
                  <button onClick={() => handleDeleteDocument(document._id)}>
                    Delete Document
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
export default Documents;
