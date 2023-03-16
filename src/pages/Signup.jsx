import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AddClub from '../components/AddClub';
import clubService from '../services/club.services';

function Signup() {
	const navigate = useNavigate();

	//---------------------------------- states ⤵

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [club, setClub] = useState('');
	const [role, setRole] = useState('player');

	const [clubName, setClubName] = useState('');
	const [sport, setSport] = useState('');
	const [primaryColor, setPrimaryColor] = useState('');
	const [secondaryColor, setSecondaryColor] = useState('');
	const [teams, setTeams] = useState([]);
	const [createdClub, setCreatedClub] = useState(null);
	const [isVisible, setVisible] = useState('false');
	const [buttonIsVisible, buttonSetVisible] = useState('true');

	//---------------------------------- handler functions ⤵

	const handleName = (e) => setName(e.target.value);
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleClub = (e) => setClub(e.target.value);
	const handleRole = (e) => setRole(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
				email,
				name,
				password,
				club,
				role,
			});
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	const handleClubName = (e) => setClubName(e.target.value);
	const handleSport = (e) => setSport(e.target.value);
	const handlePrimaryColor = (e) => setPrimaryColor(e.target.value);
	const handleSecondaryColor = (e) => setSecondaryColor(e.target.value);
	const handleTeams = (e) => setTeams(e.target.value);

	const handleClubSubmit = async (e) => {
		e.preventDefault();
		const body = {
			name: clubName,
			sport,
			primaryColor,
			secondaryColor,
			teams,
		};
		try {
			const responseClub = await clubService.createClub(body); //doesn't have to be body, just because on the backend it's req.body. We can call it whatever on the frontend
			setCreatedClub(responseClub);
			handleToggle();
		} catch (error) {
			console.log(error);
		}
	};

	const handleToggle = () => {
		setVisible(!isVisible);
		buttonSetVisible(!buttonIsVisible);
	};

	//---------------------------------- return ⤵

	return (
		<section className='authenticate-page'>
			<div className='container'>
				<div className='screen'>
					<div className='screen__content'>
						<form
							className='authenticate'
							id='signup-form'
							onSubmit={handleSubmit}>
							<div className='authenticate__field'>
								<input
									className='authenticate__input'
									placeholder='Name'
									type='text'
									name='name'
									id='name'
									value={name}
									onChange={handleName}
									required
								/>
							</div>
							<div className='authenticate__field'>
								<input
									className='authenticate__input'
									placeholder='E-mail'
									type='email'
									name='email'
									id='email'
									value={email}
									onChange={handleEmail}
									required
								/>
							</div>
							<div className='authenticate__field'>
								<input
									className='authenticate__input'
									placeholder='Password'
									type='password'
									name='password'
									id='password'
									value={password}
									onChange={handlePassword}
									required
								/>
							</div>
							<div className='authenticate__field'>
								<input
									className='authenticate__input'
									placeholder='Insert club key'
									type='text'
									name='club'
									id='club'
									value={club}
									onChange={handleClub}
									required
								/>
							</div>

							<div
								className='authenticate-field'
								id='signup-role'>
								<h4>Select your role:</h4>
								<div id='radio-buttons'>
									<label htmlFor='staff'>staff</label>
									<input
										type='radio'
										id='staff'
										name='role'
										value='staff'
										checked={role === 'staff'}
										onChange={handleRole}
									/>
								</div>
								<div id='radio-buttons'>
									<label htmlFor='player'>player</label>
									<input
										type='radio'
										id='player'
										name='role'
										value='player'
										checked={role === 'player'}
										onChange={handleRole}
									/>
								</div>
							</div>

							<button
								className='button authenticate__submit'
								type='submit'
								id='signup-submit'>
								<span className='button__text'>
									Create account
								</span>
								<i className='button__icon fas fa-chevron-right'></i>
							</button>
						</form>
					</div>
					<div className='screen__content' id='add-club-component'>
						<button
							id='create-club-toggle'
							onClick={handleToggle}
							className={
								buttonIsVisible
									? 'button authenticate__submit'
									: "button authenticate__submit hidden"
							}>
							Create a new club
						</button>

						<form
							className={
								isVisible
									? 'authenticate hidden'
									: 'authenticate'
							}
							id='add-club-form'
							onSubmit={handleClubSubmit}>
							<div className='authenticate__field'>
								<input
									className='authenticate__input'
									placeholder='Club name'
									type='text'
									name='clubName'
									id='clubName'
									value={clubName}
									onChange={handleClubName}
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
								<span className='button__text'>
									Create club
								</span>
							</button>
						</form>
					</div>
					<div id="club-key">
						{createdClub && (
							<p>
								Your club key is{' '}
								<span>{`${createdClub.data._id}`}</span>
							</p>
						)}
					</div>

					<div className='screen__background'>
						<span className='screen__background__shape screen__background__shape4'></span>
						<span className='screen__background__shape screen__background__shape3'></span>
						<span className='screen__background__shape screen__background__shape2'></span>
						<span className='screen__background__shape screen__background__shape1'></span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Signup;
