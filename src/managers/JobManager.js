export const getJobs = () => {
    return fetch("http://localhost:8000/jobs", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteJob = (jobId) => {
    fetch(`http://localhost:8000/jobs/${jobId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleJob = (jobId) => {
    return fetch(`http://localhost:8000/jobs/${jobId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateJob = (job) => {
    return fetch(`http://localhost:8000/jobs/${job.id}`, 
    { method: "PUT", body: JSON.stringify(job),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(job))
}

export const createJob = (event) => {
    return fetch('http://localhost:8000/jobs',
        { method: "POST", body: JSON.stringify(event),
        headers: {'Content-Type':'application/json',
        "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
        .then(res => res.json())
        .catch(console.log(event))
}


export const getJobServices = () => {
    return fetch("http://localhost:8000/job_services", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

