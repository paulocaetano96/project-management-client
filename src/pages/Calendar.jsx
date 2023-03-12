import React, {useState, useRef} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import calendarService from '../services/calendar.services';
import moment from 'moment';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import AddEvent from '../components/AddEvent';

function Calendar() {

    const [events, setEvents] = useState([])

    const calendarRef = useRef(null)

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        })

    }


    async function handleEventAdd(data) {
        await calendarService.createEvent(data.event);
    }

    async function handleDatesSet(data) {
        const response = await calendarService.getEvents();
        setEvents(response.data);
    }

    //---------------------------------------------------- MUI Drawer functions ⤵

    const [state, setState] = React.useState({
        top: false,
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
    >
      <AddEvent onEventAdded={event => onEventAdded(event)}/>
    </Box>
  );

  //---------------------------------------------------- Return ⤵

  return (
    <section>
        {['top'].map((anchor) => (
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

        <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            eventAdd={(event) => handleEventAdd(event)} 
            datesSet={(date) => handleDatesSet(date)}
        />

    </section>

  )
}

export default Calendar