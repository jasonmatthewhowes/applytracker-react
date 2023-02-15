export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch('http://localhost:8088/games',
        { method: "POST", body: JSON.stringify(game),
        headers: {'Content-Type':'application/json'}})
        .then(res => res.json())
        .catch(console.log(game))
}

export const getGameTypes = () => {
    return fetch('http://localhost:8000/gametypes',  {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
