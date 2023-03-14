export const getAllRoles = () => {
    return fetch("http://localhost:8000/roles", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteRole = (roleId) => {
    fetch(`http://localhost:8000/roles/${roleId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleRole = (roleId) => {
    return fetch(`http://localhost:8000/roles/${roleId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateRole = (role) => {
    return fetch(`http://localhost:8000/roles/${role.id}`, 
    { method: "PUT", body: JSON.stringify(role),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(role))
}

