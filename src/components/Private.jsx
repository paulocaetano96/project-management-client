import React, {useContext} from 'react'
import { AuthContext } from '../context/auth.context'
import {Navigate} from 'react-router-dom'

function Private({children}) {

    const {loading, loggedIn} = useContext(AuthContext)

    if (loading) return <p>Loading...</p>

    if(!loggedIn) {
        return <Navigate to={'/'}/>
    } else {
        return children
    }

  
}

export default Private