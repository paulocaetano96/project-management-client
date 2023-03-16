import React, { useState } from "react";
import Datetime from "react-datetime";
import eventService from "../services/event.services";
import { useNavigate, useParams } from "react-router-dom";

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
    <div  className="full-form-container">
      <div>
        <form onSubmit={handleSubmit} className="form-calendar">
        <h2>Edit Event</h2>
          <label htmlFor="title">Title</label>
          <input
            placeholder="Title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitle}
          />
          <div>
            <label htmlFor="start">Start Date</label>
            <Datetime value={start} onChange={(date) => setStart(date)} />
          </div>
          <div>
            <label htmlFor="end">End Date</label>
            <Datetime value={end} onChange={(date) => setEnd(date)} />
          </div>

          <button type="submit">Edit Event</button>
        </form>

        <button onClick={handleDelete} id="button">Delete Event</button>
      </div>
    </div>
  );
}

export default EditEvent;
