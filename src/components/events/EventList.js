import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { convertDateTime, deleteEvent, getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])


    
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])
    const navigate = useNavigate()
    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/events/new" })
    }}
>Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.name}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{convertDateTime(event.date)}</div>
                        <button className="edit" onClick={()=> navigate(`/events/edit/${event.id}`)}>Edit</button>
                        <button className="delete" onClick={(evt)=> {
                            deleteEvent(event.id)
                            getEvents().then(data => {
                                setEvents(data)
                                window.location.reload(false);
                            })
                        }}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}