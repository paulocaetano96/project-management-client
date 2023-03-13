import React, { useState } from 'react';
import Datetime from 'react-datetime';
import eventService from '../services/event.services';
import { useNavigate, useParams } from 'react-router-dom';


function EditEvent(props) {
	const [title, setTitle] = useState('');
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
    const {selectedEvent, onEventEdited } = props;
    const eventId = selectedEvent.event._def.extendedProps._id

    const navigate = useNavigate();

    const handleTitle = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
/*         e.preventDefault(); */
        onEventEdited({ title, start, end });
    };

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>Title</label>
				<input
					placeholder='Title'
					type='text'
					name='title'
					id='title'
					value={title}
					onChange={handleTitle}
				/>
                <div>
                    <label htmlFor="start">Start Date</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                </div>
                <div>
                    <label htmlFor="end">End Date</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>
                
                <button type='submit'>Edit Event</button>
			</form>
		</section>
	);
}

export default EditEvent;
