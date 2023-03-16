import React, { useState, useContext } from 'react';
import Datetime from 'react-datetime';

import { AuthContext } from "../context/auth.context";

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
		<section className="full-form-calendar-container">
			<form onSubmit={handleSubmit} className="form-calendar">
			<h2>Add Event</h2>
				<label htmlFor='title'>Title</label>
				<input
					placeholder='Title'
					type='text'
					name='title'
					id='title'
					value={title}
					onChange={handleTitle}
					required
				/>
                
                    <label htmlFor="start">Start Date</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                
                    <label htmlFor="end">End Date</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                
                
                <button type='submit'>Add Event</button>
			</form>
		</section>
	);
}

export default AddEvent;
