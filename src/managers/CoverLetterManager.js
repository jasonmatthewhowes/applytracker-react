export const getCoverLetters = () => {
    return fetch("http://localhost:8000/cover_letters", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteCoverLetter = (cover_letterId) => {
    fetch(`http://localhost:8000/cover_letters/${cover_letterId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleCoverLetter = (cover_letterId) => {
    return fetch(`http://localhost:8000/cover_letters/${cover_letterId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateCoverLetter = (cover_letter) => {
    return fetch(`http://localhost:8000/cover_letters/${cover_letter.id}`, 
    { method: "PUT", body: JSON.stringify(cover_letter),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(cover_letter))
}

