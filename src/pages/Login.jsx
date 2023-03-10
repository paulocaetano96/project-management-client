import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'


function Login() {

    //we want to login with email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //handler functions
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    //deconstruct the authenticateUser to be able to run the function that we wrote on the auth.context.jsx
    const { authenticateUser } = useContext(AuthContext)


    //create the handle submit function
    const handleSubmit = (e) => {

        //
        e.preventDefault()

        //now, to submit it to the database:
        try {
    //we check the .env file to see if our URL is correct. the VITE_API_URL
            //we pass the url and the email, password
        const response = axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {email, password});


    //in here, we save the token that was created for the logged in user, saving it in the localStorage so that a user that left the website is still logged in.
        localStorage.setItem('authToken', response.data.token);

    //and after we've saved the token in the local storage, we call the function to validade said token and send us back all the info related to the user of that token.
        authenticateUser();

        console.log(response.data)

    //so, we await for the user to be created, THEN, if successfull, we're redirected to the home page
    navigate('/home')

        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()

    return (
        <section>

            <h1>Login</h1>

                <form onSubmit="handleSubmit">

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={handleEmail}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={handlePassword}/>

                    <button type="submit">Login</button>

                </form>

{/* if the user doesn't have account, we give him an option to make one */}
            <p>Don't have an account?</p>
            <Link to="/signup">Signup</Link>






        </section>
    )
}

export default Login