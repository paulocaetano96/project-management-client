import React from 'react';
import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'


import axios from "axios";

//This intitializes the context, and we want it for the authorization.
//note: the wrapper is just for main.jsx to wrap the <App />
const AuthContext = createContext();

//every time we wrap something, we have to pass props so that we can access the children components, in this case, the <App />
function AuthWrapper(props) {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false); //-> we ALWAYS start as false because we dont want to give access to people that aren't logged in already.
  const [user, setUser] = useState(null); //-> and we're here, storing on the user the information comming from the verify on postman and on the code, so, the user email and password in our case
  const [loading, setLoading] = useState(true); //-> we are always "loading" when waiting for the API, and when we get the data, it sets to false, so we got the information so no more need to be loading
console.log(user)
  //functions and methods -----------------------------------------------------

  const authenticateUser = async () => {
    //check for a token
    const storedToken = localStorage.getItem("authToken");

    //if the token exists!!!!!!!!!!!! ----------------------------

    if (storedToken) {
      //this try catch block is a safety measure to ensure we're doing the right thing, even if we logged in but an error is there.
      try {
        //after the url, that { headers} is an options object that allows us to set the header that has the Token we wanna send, inside authorization (http language)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        //here, we know that the response is okay so we can update the states
        setLoggedIn(true);
        setUser(response.data);
        setLoading(false);

        //if the user is logged in BUT we're having an error, then we:
      } catch (error) {
        console.log(error);
        //here, we set up that, if the user is not loggedin due to error, we set the state to false
        setLoggedIn(false);
        //if there is no login due to error, then we have no user, so we set the state to null
        setUser(null);
        //even if we don't have an user and a login done due to error, we still set the loading state as false because we're already loaded the date
        setLoading(false);
      }

      // else {, meaning, if we do NOT recieve any token, at all
    } else {
      //exactly the same as before, so:
      setLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  };

  //so, this logout function will remove the token, and then call the authenticateUser function that we already made so that, if it does not have a valid token, and we just killed ours, it sets the log in state as false and the user state as null.
  const logout = async () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate('/');
  };

  //to prevent us from losing info everytime we refresh, to not lose the token.
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    //we're passing an object inside of value, the loggedIn, the user and the loading, so we need {} inside {} because we're doing javascript, so we need that outside {}.
    <AuthContext.Provider
      value={{ loggedIn, user, loading, logout, authenticateUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

//We export and not export default like all other pages because we want to export specific parts of the code, and, in this case, we just want to export the AuthContext and the AuthWrapper
export { AuthContext, AuthWrapper };
