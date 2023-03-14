import React from 'react'

function EventDetailsView(props) {
    const {selectedEvent} = props;
    console.log(selectedEvent)
  return (
    <section>
        <h1>{`${selectedEvent.event._def.title}`}</h1>
        <p>{`${selectedEvent.event.start}`}</p>
        {selectedEvent.event.end && (
            <p>{`${selectedEvent.event.end}`}</p>
        )}
    </section>
    
  )
}

export default EventDetailsView