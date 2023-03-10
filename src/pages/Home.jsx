import React, {useState, useEffect, useContext }from 'react'
import { AuthContext } from '../context/auth.context'; 

import messageService from '../services/message.services';

function Home() {
    const [messages, setMessages] = useState([])
    const {loggedIn, user} = useContext(AuthContext);

    const getMessages = async () => {
        try {
            const response = await messageService.getMessages();
            console.log(response.data)
            setMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMessages();
    }, [])


  return (
    <section>
            <h1>Messages</h1>
            {messages && (
                messages.map((message) => {
                    return (
                        <article key={message._id}>
                        <h3>{message.title}</h3>
                        <p>{message.description}</p>
                        </article>
                    )
                })
            )}
        </section>
  )
}

export default Home