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
