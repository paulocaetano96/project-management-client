import '../styles/authenticate.css';

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
	const [createdClub, setCreatedClub] = useState(null);
	const [isVisible, setVisible] = useState("false");

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
			setCreatedClub(responseClub);
			console.log(createdClub);
			console.log(responseClub);
		} catch (error) {
			console.log(error);
		}
	};

	const handleToggle = () => {
		setVisible(!isVisible);
	  };

	// ---------------------------------------------------- return ⤵

	return (
		<section className='screen__content' id='add-club-component'>
		<button onClick={handleToggle}>Toggle class</button>
			<form
				className={isVisible? 'authenticate hidden' : 'authenticate'}
				id='add-club-form'
				onSubmit={handleSubmit}>
				<div className='authenticate__field'>
					<input
						className='authenticate__input'
						placeholder='Club name'
						type='text'
						name='clubName'
						id='clubName'
						value={name}
						onChange={handleName}
						required
					/>
				</div>
				<div className='authenticate__field'>
					<input
						className='authenticate__input'
						placeholder='Sport'
						type='text'
						name='sport'
						id='sport'
						value={sport}
						onChange={handleSport}
					/>
				</div>
				<div className='authenticate__field'>
					<input
						className='authenticate__input'
						placeholder='Primary Color'
						type='text'
						name='primaryColor'
						id='primaryColor'
						value={primaryColor}
						onChange={handlePrimaryColor}
					/>
				</div>
				<div className='authenticate__field'>
					<input
						className='authenticate__input'
						placeholder='Secondary Color'
						type='text'
						name='secondaryColor'
						id='secondaryColor'
						value={secondaryColor}
						onChange={handleSecondaryColor}
					/>
				</div>
				<div className='authenticate__field'>
					<input
						className='authenticate__input'
						placeholder='Teams'
						type='text'
						name='teams'
						id='teams'
						value={teams}
						onChange={handleTeams}
					/>
				</div>

				<button
					className='button authenticate__submit'
					type='submit'
					id='add-club-submit'>
					<span className='button__text'>Create club</span>
				</button>
			</form>

			<div>
				{createdClub && (
					<p>
						Your club key is <span>{`${createdClub.data._id}`}</span>
					</p>
				)}
			</div>

			
		</section>
	);
}

export default AddClub;
