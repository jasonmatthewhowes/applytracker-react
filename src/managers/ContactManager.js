export const getContacts = () => {
    return fetch("http://localhost:8000/contacts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteContact = (contactId) => {
    fetch(`http://localhost:8000/contacts/${contactId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleContact = (contactId) => {
    return fetch(`http://localhost:8000/contacts/${contactId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateContact = (contact) => {
    return fetch(`http://localhost:8000/contacts/${contact.id}`, 
    { method: "PUT", body: JSON.stringify(contact),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(contact))
}

