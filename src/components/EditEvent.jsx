import React, { useState } from "react";
import Datetime from "react-datetime";
import eventService from "../services/event.services";
import { useNavigate, useParams } from "react-router-dom";



// ---------------------------------------------------- MUI IMPORTS
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// ---------------------------------------------------- CSS IMPORTS
import "../styles/createAndEditDrawers.css";

function EditEvent(props) {
  const { selectedEvent, onEventEdited, onEventDeleted } = props;
  const [title, setTitle] = useState(selectedEvent.event._def.title);
  const [start, setStart] = useState(selectedEvent.event.start);
  const [end, setEnd] = useState(selectedEvent.event.end);
  const id = selectedEvent.event._def.extendedProps._id;

  const handleTitle = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEventEdited({ id, title, start, end });
  };

  const handleDelete = () => {
    onEventDeleted({ id });
  };

  return (
    <div className="full-form-calendar-container">
      <div>
        <form onSubmit={handleSubmit} className="form-calendar">
        <h2>Edit Event</h2>
          
          <TextField
          label="Title"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            
          />
          <div>
            <label htmlFor="start">Start Date</label>
            <Datetime value={start} onChange={(date) => setStart(date)} />
          </div>
          <div>
            <label htmlFor="end">End Date</label>
            <Datetime value={end} onChange={(date) => setEnd(date)} />
          </div>

          <button type="submit" id="add-event-button">Edit Event</button>
        </form>

        <button onClick={handleDelete} id="add-event-button">Delete Event</button>
      </div>
    </div>
  );
}

export default EditEvent;
