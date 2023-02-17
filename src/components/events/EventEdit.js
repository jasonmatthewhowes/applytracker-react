import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { convertDateTime, createEvent, formatTimeForEdit, getSingleEvent, removeZ} from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"



export const EventEdit = () => {
    const navigate = useNavigate()
    const [gameList, setGameList] = useState([])
    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        id:0,
        name: "",
        game:1,
        description:"",
        date: ""
    })
    const { eventId } = useParams()
    
    useEffect(() => {
        getSingleEvent(eventId).then(data => setCurrentEvent(data))
    }, [])

    useEffect(() => {
        getGames ().then(data => setGameList(data))
    }, [])
    
    


    /*
    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
    }
    */
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event Name: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.name =evt.target.value
                                setCurrentEvent(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.description =evt.target.value
                                setCurrentEvent(copy)
                            }}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="maker">Date: </label>
                    <input type="datetime-local" name="title" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.date =evt.target.value
                                setCurrentEvent(copy)
                            }}
                    />
                </div>

                <select onChange={
                    (evt) => {
                    const copy= {...currentEvent}
                    copy.game= evt.target.value
                    setCurrentEvent(copy)
            }}>{gameList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
            
                
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                    name: currentEvent.name,
                    game:parseInt(currentEvent.game),
                    description: currentEvent.description,
                    date:currentEvent.date,
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}
