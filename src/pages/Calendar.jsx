import React, {useState, useRef, useEffect, useContext} from 'react'
import moment from 'moment';

import eventService from '../services/event.services';
//-------------------------------------------------------------- Fullcalendar imports ⤵
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list'
//-------------------------------------------------------------- MUI imports ⤵
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
//-------------------------------------------------------------- Component imports ⤵
import AddEvent from '../components/AddEvent';
import EditEvent from '../components/EditEvent'
import { AuthContext } from "../context/auth.context";
import EventDetailsView from '../components/EventDetailsView';

//-------------------------------------------------------------- Function ⤵

function Calendar() {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [state, setState] = useState({
      top: false,
  });

    //calendar functionality
    const calendarRef = useRef(null)

    //-------------------------------------------------------------- CRUD ⤵

    const onEventAdded = async (e) => {
      const start = moment(e.start).toDate();
      const end = moment(e.end).toDate();
      const title = e.title;
      const club = e.club;
      const body = { title, start, end, club };
      try {
        await eventService.createEvent(body)
        setState({ ...state, top: false });
      } catch (error) {
        console.log(error);
      }
    };

  const onEventEdited = async (e) => {
    const start = moment(e.start).toDate();
    const end = moment(e.end).toDate();
    const title = e.title;
    const id = e.id;
		const body = { id, title, start, end };
		try {
			await eventService.editEvent(body)
      setSelectedEvent(null);
      setState({ ...state, top: false });
		} catch (error) {
			console.log(error);
		}
	};

  const onEventDeleted = async (e) => {
    try {
        await eventService.deleteEvent(e.id)
        setSelectedEvent(null);
        setState({ ...state, top: false });
    } catch (error) {
        console.log(error)
    }
  }

  const handleDatesSet = async () => {
    try {
      const response = await eventService.getEvents();
      const filteredEvents = response.data.filter(function(event) {
        return event.club === user.club
      })
      setEvents(filteredEvents);
    } catch (error) {
      console.log(error)    
    }
  }

  //------------------------------------------------------------- MUI Drawer functions ⤵

  const toggleDrawer = (anchor, open, calendarEvent) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
    }

    setState({ ...state, [anchor]: open });
  };

  const handleEditDrawer = (event) => {
    setSelectedEvent(event);
    setState({ ...state, top: true });
  };


  //-------------------------------------------------------------- useEffect ⤵

  useEffect(() => {
    handleDatesSet();
}, [user, state])

  //-------------------------------------------------------------- Return ⤵

  return (
    <section>
      { user && (
        <>
        {['top'].map((anchor) => (
            <React.Fragment key={anchor}>
            {user.role === "staff" && (
              <Button onClick={toggleDrawer(anchor, true)}>Create event</Button>
            )}
              <Drawer
                  PaperProps={{ sx: {height: 350}, elevation: 20 }}
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
              >
              {/* check if user is staff or player and act accordingly */}
              {user.role === "staff" ? (selectedEvent ? (
                  // render EditEvent component if there is a selectedEvent
                    <EditEvent
                      selectedEvent={selectedEvent}
                      onEventEdited={event => onEventEdited(event)}
                      onEventDeleted={event => onEventDeleted(event)}
                      onClose={() => {
                        setSelectedEvent(null);
                        setState({ ...state, top: false });
                      }}
                    />
                  ) : (
                    // render CreateMessage component if there isn't a selectedEvent
                    <AddEvent
                      onClose={() => setState({ ...state, [anchor]: false })}
                      onEventAdded={event => onEventAdded(event)}
                    />
                  )) : (
                    <EventDetailsView
                      selectedEvent={selectedEvent}
                      onClose={() => {
                        setSelectedEvent(null);
                        setState({ ...state, top: false });
                      }}
                  />) }

              </Drawer>
            </React.Fragment>
        ))}

          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[ dayGridPlugin, listPlugin ]}
            initialView="dayGridMonth"
            headerToolbar= {{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,listWeek'
            }}
            eventClick={function(arg){
              handleEditDrawer(arg)
            }}

            datesSet={handleDatesSet}
          />
        </>
      )}

    </section>

  )
}

export default Calendar