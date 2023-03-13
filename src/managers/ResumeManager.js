export const getResumes = () => {
    return fetch("http://localhost:8000/resumes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteResume = (resumeId) => {
    fetch(`http://localhost:8000/resumes/${resumeId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleResume = (resumeId) => {
    return fetch(`http://localhost:8000/resumes/${resumeId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateResume = (resume) => {
    return fetch(`http://localhost:8000/resumes/${resume.id}`, 
    { method: "PUT", body: JSON.stringify(resume),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(resume))
}

