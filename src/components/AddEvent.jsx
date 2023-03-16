import React, { useState, useContext } from 'react';
import Datetime from 'react-datetime';

import { AuthContext } from "../context/auth.context";


// ---------------------------------------------------- MUI IMPORTS
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// ---------------------------------------------------- CSS IMPORTS
import "../styles/createAndEditDrawers.css";

function AddEvent({ onEventAdded }) {
	const [title, setTitle] = useState('');
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const { user } = useContext(AuthContext);

    const handleTitle = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
		const club = user.club;
        onEventAdded({ title, start, end, club });
    };

	return (
		<div className="full-form-calendar-container">
		<section>
			<form onSubmit={handleSubmit} className="form-calendar">
			<h2 className='white-color-label' >Add Event</h2>
			<TextField
              label="Title"
              variant="outlined"
              margin="normal"
              fullWidth
              required
			  className='calendar-title-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
					<div id="lala">
                    <label htmlFor="start" className='white-color-label'>Start Date</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                
                    <label htmlFor="end" className='white-color-label' >End Date</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>
                
                <button type="submit" variant="contained"  id="add-event-button">Add Event</button>
			</form>
		</section>
		</div>
	);
}

export default AddEvent;
