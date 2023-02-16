import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { Navigate, useNavigate } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])
    const navigate = useNavigate()

    return (
        
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/games/new" })
    }}
>Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="edit" onClick={()=> navigate(`/games/edit/${game.id}`)}>Edit</button>
                    </section>
                })
            }
        </article>
    )
}
