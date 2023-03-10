import React, {useState, useEffect, useContext }from 'react'
import { AuthContext } from '../context/auth.context'; 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import messageService from '../services/message.services';

import NavConsole from '../components/NavConsole'

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

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <NavConsole />
        </Box>
      );
    


  return (
    <section>
            <h1>Messages</h1>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
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