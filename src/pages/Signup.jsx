import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
	const navigate = useNavigate();

	//---------------------------------- states ⤵

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [club, setClub] = useState('');
	const [role, setRole] = useState('player')

	//---------------------------------- handler functions ⤵

	const handleName = (e) => setName(e.target.value);
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleClub = (e) => setClub(e.target.value);
	const handleRole = (e) => setRole(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {email, name, password, club, role});
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};


	//---------------------------------- return ⤵

	return (
		<section>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					name='name'
					id='name'
					value={name}
					onChange={handleName}
				/>
				<label htmlFor='email'>E-mail</label>
				<input
					type='email'
					name='email'
					id='email'
					value={email}
					onChange={handleEmail}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					value={password}
					onChange={handlePassword}
				/>
				<label htmlFor='club'>insert club key</label>
				<input
					type='club'
					name='club'
					id='club'
					value={club}
					onChange={handleClub}
				/>
				<h4>Select your role</h4>
				<label htmlFor="staff">Staff</label>
				<input type="radio" id="staff" name="role" value="staff" checked={role==='staff'} onChange={handleRole}/>
				<label htmlFor="player">Player</label>
				<input type="radio" id="player" name="role" value="player" checked={role==='player'} onChange={handleRole}/>

				<button type='submit'>Create account</button>
			</form>

			<p>Already have an account?</p>
			<Link to='/login'>Login</Link>
		</section>
	);
}

export default Signup;
