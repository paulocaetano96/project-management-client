import React, {useState, useRef, useEffect} from 'react'
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

function Calendar() {

    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [state, setState] = useState({
      top: false,
  });

    //calendar functionality
    const calendarRef = useRef(null)

/*     const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        })
    } */

    const onEventAdded = async (e) => {
      const start = moment(e.start).toDate();
      const end = moment(e.end).toDate();
      const title = e.title;
      const body = { title, start, end };
      try {
        await eventService.createEvent(body)
        setState({ ...state, top: false });
      } catch (error) {
        console.log(error);
      }
    };

/*     const onEventEdited = event => {
      let calendarApi = calendarRef.current.getApi()
      calendarApi.addEvent({
          start: moment(event.start).toDate(),
          end: moment(event.end).toDate(),
          title: event.title
      })
      setSelectedEvent(null);
      setState({ ...state, top: false });
  } */

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

    //-------------------------------------------------------------- Handler functions ⤵
    
    async function handleDatesSet() {
        const response = await eventService.getEvents();
        setEvents(response.data);
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

/*   const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >

      <AddEvent onEventAdded={event => onEventAdded(event)}/>
    </Box>
  ); */

  //-------------------------------------------------------------- useEffect ⤵

  useEffect(() => {
    handleDatesSet();
}, [state])

  //-------------------------------------------------------------- Return ⤵

  return (
    <section>
        {['top'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>Create event</Button>
              <Drawer
                  PaperProps={{ sx: {height: 350}, elevation: 20 }}
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
              >
                  {selectedEvent ? (
                  // render EditEvent component if there is a selectedEvent
                    <EditEvent
                      selectedEvent={selectedEvent}
                      onEventEdited={event => onEventEdited(event)}
                      //onDelete={handleDeleteMessage}
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
                  )}
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

            datesSet={(date) => handleDatesSet(date)}
        />

    </section>

  )
}

export default Calendar

