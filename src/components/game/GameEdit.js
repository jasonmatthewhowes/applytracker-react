import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getSingleGame, updateGame } from '../../managers/GameManager.js'


export const GameEdit = () => {
    const navigate = useNavigate()
    const [gameTypesList, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        id:0,
        name: "",
        game_type:1,
        gamer:0,
        description:"",
        maker:"",
        skill_level: "easy",
        number_of_players: 0,
    })

    const [newGameType, setNewGameType] = useState({
        id:0
    })
    
    
    const difficultyLevel = [{id: 1,name:"Easy"},{id:2,name:"Medium"}, {id:3,name:"Hard"}]
    const { gameId } = useParams()

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])
    useEffect(() => {
        getSingleGame(gameId).then(data => setCurrentGame(data))
    }, [])

    /*const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
    }
    */
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.name =evt.target.value
                                setCurrentGame(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.description =evt.target.value
                                setCurrentGame(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Game Maker: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.maker =evt.target.value
                                setCurrentGame(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Total Number of players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.number_of_players =evt.target.value
                                setCurrentGame(copy)
                            }}
                    />
                </div>
                <select onChange={
                    (evt) => {
                    const copy= {...currentGame}
                    copy.skill_level= evt.target.value
                    setCurrentGame(copy)
            }}>{difficultyLevel.map(option => (
                    <option key={option.id} value={option.name}>{option.name}</option>
                ))} </select>
                <br></br>
                <select onChange={
                    (evt) => {
                    const copy= {...currentGame}
                    copy.game_type= evt.target.value
                    setCurrentGame(copy)
            }}>{gameTypesList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                    id: currentGame.id,
                    name: currentGame.name,
                    game_type:parseInt(currentGame.game_type),
                    gamer:currentGame.gamer,
                    description: currentGame.description,
                    maker:currentGame.maker,
                    skill_level: currentGame.skill_level,
                    number_of_players: parseInt(currentGame.number_of_players),
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}
