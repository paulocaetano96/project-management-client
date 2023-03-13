/*considering this is our main page and probably the most code/logic intense one, i'll explain it step by step our logic. Call it an easter egg for you, André. Reviewing 10 thousand projects in one day mustn't be easy, even considering this stuff comes to you with the same ease as speaking portuguese at this point xD. But in all seriousness, this is just a away for us to organize ourselfs considering I do some tasks, Alex does others, we complement each other, but we're not there looking over each other's shoulders, watching every step,  so making a **** ton of comments really helps us out, not only keeping track with our own logic but to learn and remind ourselfs of what the partner did. You were a great teacher and you made this insane life transition of ours not feel like the nightmare of a mountain climb that it is. That being said, i wanted to say thank you, to you and João, Bruno and Lucas as well. Great lads, all around, all of you :) */

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import messageService from "../services/message.services";
import CreateMessage from "../components/CreateMessage";
import EditMessage from "../components/EditMessage";
import NavConsole from "../components/NavConsole";

import "../App.css";

function Home() {
  //Initializes a state variable called messages as an empty array and a function called setMessages that can be used to update the messages state.
  const [messages, setMessages] = useState([]);
  //const { loggedIn, user } = useContext(AuthContext);: Initializes two variables loggedIn and user from the AuthContext using the useContext hook.
  const { loggedIn, user } = useContext(AuthContext);
    //const [selectedMessage, setSelectedMessage] = useState(null);: Initializes a state variable called selectedMessage as null and a function called setSelectedMessage that can be used to update the selectedMessage state.
  const [selectedMessage, setSelectedMessage] = useState(null);

  //const [state, setState] = useState({top: false, left: false,});: Initializes a state variable called state as an object with two properties top and left, both initialized as false. Also initializes a function called setState that can be used to update the state.
  const [state, setState] = useState({
    top: false,
    left: false,
  });


  //const getMessages = async () => {...}: Defines a function called getMessages that uses the messageService object to make a GET request to the server to retrieve all messages.
  const getMessages = async () => {
    try {
      const response = await messageService.getMessages();
      console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------------------- Handler functions ⤵

  //const handleUpdateMessage = async (updatedMessage) => {...}: Defines a function called handleUpdateMessage that takes in an updatedMessage object as an argument. The function uses the messageService object to make a PUT request to the server to update the updatedMessage. It then updates the messages state with the updated message and sets the selectedMessage and state.top state to null and false, respectively.
  const handleUpdateMessage = async (updatedMessage) => {
    try {
      const response = await messageService.updateMessage(
        updatedMessage._id,
        updatedMessage
      );
      console.log(response.data);
      const updatedMessages = messages.map((m) =>
        m._id === updatedMessage._id ? response.data : m
      );
      setMessages(updatedMessages);
      setSelectedMessage(null);
      setState({ ...state, top: false });
    } catch (error) {
      console.log(error);
    }
  };

// async function to handle deleting a message
  const handleDeleteMessage = async (id) => {
    try {
          // delete message with given id using messageService
      const response = await messageService.deleteMessage(id);
          // log response data to console
      console.log(response.data);
          // filter out deleted message from messages state and update messages state with remaining messages
      const filteredMessages = messages.filter((m) => m._id !== id);
      setMessages(filteredMessages);
    } catch (error) {
          // log any errors to console

      console.log(error);
    }
  };

  //useEffect(() => {...}, []);: Runs the getMessages function when the component mounts.
  useEffect(() => {
    getMessages();
  }, [state]);

  //------------------------------------------------------------- MUI Drawer functions ⤵

  //const toggleDrawer = (anchor, open, message) => (event) => {...}: Defines a function called toggleDrawer that takes in anchor, open, and message as arguments. The function returns another function that updates the state with the new anchor and open values and updates the selectedMessage state if message is defined.
  const toggleDrawer = (anchor, open, message) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (message) {
      setSelectedMessage(message);
    }

    setState({ ...state, [anchor]: open });
  };

  //const handleEditMessage = (message) => {...}: Defines a function called handleEditMessage that takes in a message object as an argument. The function updates the selectedMessage state with the message object and sets the state.top property to true.
  const handleEditDrawer = (message) => {
    setSelectedMessage(message);
    setState({ ...state, top: true });
  };

  

// render section containing a list of messages and a create/edit message form using Drawer
  return (
    <section>
      <h1>Messages</h1>
      {/* render Drawer component with anchor "top" for creating/editing messages */}
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* button to open Drawer and show create message form */}
          <Button onClick={toggleDrawer(anchor, true)}>Create Message</Button>
          {/* Drawer component containing either CreateMessage or EditMessage component */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {selectedMessage ? (
            // render EditMessage component with selectedMessage props
              <EditMessage
                message={selectedMessage}
                onUpdate={(handleUpdateMessage)}
                onDelete={handleDeleteMessage}
                onClose={() => {
                  setSelectedMessage(null);
                  setState({ ...state, top: false });
                }}
              />
            ) : (
              // render CreateMessage component
              <CreateMessage
                onClose={() => setState({ ...state, [anchor]: false })}
              />
            )}
          </Drawer>
        </React.Fragment>
      ))}

      {/* render list of messages */}
      <div className="message-container">
       {/* if messages is not null or undefined, map over messages array and render each message as an article */}
        {messages &&
          messages.map((message) => {
            return (
              <article key={message._id}>
                <h3>{message.title}</h3>
                <p>{message.description}</p>
                <div>
                {/* button to open Drawer and show edit message form */}
                  <button onClick={() => handleEditDrawer(message)}>
                    Edit Message
                  </button>
                  {/* button to delete message with given id */}
                  <button onClick={() => handleDeleteMessage(message._id)}>
                    Delete Message
                  </button>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}

export default Home;
