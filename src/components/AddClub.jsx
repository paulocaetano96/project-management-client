// ---------------------------------------------------- package imports ⤵

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clubService from '../services/club.services';
import axios from 'axios';

// ----------------------------------------------------  imports ⤴

function AddClub() {
	const [name, setName] = useState('');
	const [sport, setSport] = useState('');
	const [primaryColor, setPrimaryColor] = useState('');
	const [secondaryColor, setSecondaryColor] = useState('');
	const [teams, setTeams] = useState([]);
	const [createdClub, setCreatedClub] = useState(null)

	// ---------------------------------------------------- handle functions ⤵

	const handleName = (e) => setName(e.target.value);
	const handleSport = (e) => setSport(e.target.value);
	const handlePrimaryColor = (e) => setPrimaryColor(e.target.value);
	const handleSecondaryColor = (e) => setSecondaryColor(e.target.value);
	const handleTeams = (e) => setTeams(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = { name, sport, primaryColor, secondaryColor, teams };
		try {
			const responseClub = await clubService.createClub(body); //doesn't have to be body, just because on the backend it's req.body. We can call it whatever on the frontend
  			setCreatedClub(responseClub)
			console.log(createdClub)
			console.log(responseClub)
		} catch (error) {
			console.log(error);
		}
	};

	// ---------------------------------------------------- return ⤵

	return (
		<section>
			<h1>Create a club</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					name='name'
					id='name'
					value={name}
					onChange={handleName}
				/>
				<label htmlFor='sport'>Sport</label>
				<input
					type='text'
					name='sport'
					id='sport'
					value={sport}
					onChange={handleSport}
				/>
				<label htmlFor='primaryColor'>Primary color</label>
				<input
					type='text'
					name='primaryColor'
					id='primaryColor'
					value={primaryColor}
					onChange={handlePrimaryColor}
				/>
				<label htmlFor='secondaryColor'>Secondary color</label>
				<input
					type='text'
					name='secondaryColor'
					id='secondaryColor'
					value={secondaryColor}
					onChange={handleSecondaryColor}
				/>
				<label htmlFor='teams'>Teams</label>
				<input
					type='text'
					name='teams'
					id='teams'
					value={teams}
					onChange={handleTeams}
				/>
				<button type='submit'>Create Club</button>
			</form>

			{createdClub && (
				<h3>Your club key is {`${createdClub.data._id}`}</h3>
			)}
		</section>
	);
}

export default AddClub;
