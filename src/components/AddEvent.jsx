import React, { useState } from 'react';
import Datetime from 'react-datetime';



function AddEvent({ onEventAdded }) {
	const [title, setTitle] = useState('');
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());

    const handleTitle = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        onEventAdded({ title, start, end });
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
                
                <button type='submit'>Add Event</button>
			</form>
		</section>
	);
}

export default AddEvent;
