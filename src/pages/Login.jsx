import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

import '../styles/authenticate.css'

function Login() {
    
    const navigate = useNavigate()

    //we want to login with email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //handler functions
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    //deconstruct the authenticateUser to be able to run the function that we wrote on the auth.context.jsx
    const { authenticateUser } = useContext(AuthContext)

    //create the handle submit function
    const handleSubmit = async (e) => {

        //
        e.preventDefault()

        //now, to submit it to the database:
        try {
        //we check the .env file to see if our URL is correct. the VITE_API_URL
        //we pass the url and the email, password
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {email, password});

        //in here, we save the token that was created for the logged in user, saving it in the localStorage so that a user that left the website is still logged in.
        localStorage.setItem('authToken', response.data.authToken);

        //and after we've saved the token in the local storage, we call the function to validade said token and send us back all the info related to the user of that token.
        authenticateUser();

        console.log(response.data);

        //so, we await for the user to be created, THEN, if successfull, we're redirected to the home page
        navigate('/home');

        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <section className='login-page'>
            <div class="container">
                <div class="screen">
                    <div class="screen__content">
                        <form className='login' onSubmit={handleSubmit}>
                            <div class="login__field">
                                <i class="login__icon fas fa-user"></i>
                                <input 
                                    type="email" 
                                    class="login__input" 
                                    placeholder="Email" 
                                    name="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={handleEmail}
                                />
                            </div>
                            <div class="login__field">
                                <i class="login__icon fas fa-lock"></i>
                                <input 
                                    type="password" 
                                    class="login__input" 
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    value={password} 
                                    onChange={handlePassword}
                                />
                            </div>

                            <button class="button login__submit" type="submit">
                                <span class="button__text">Log In Now</span>
                                <i class="button__icon fas fa-chevron-right"></i>
                            </button>

                        </form>
                        <p>Don't have an account?</p>
                        <Link to="/signup">Signup</Link>
                        
                    </div>
                    <div class="screen__content"></div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>		
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>		
                </div>
            </div>

            

        </section>
    )
}

export default Login