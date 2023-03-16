export const getInterviews = () => {
    return fetch("http://localhost:8000/interviews", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteInterview = (interviewId) => {
    fetch(`http://localhost:8000/interviews/${interviewId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleInterview = (interviewId) => {
    return fetch(`http://localhost:8000/interviews/${interviewId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateInterview = (Interview) => {
    return fetch(`http://localhost:8000/interviews/${Interview.id}`, 
    { method: "PUT", body: JSON.stringify(Interview),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(Interview))
}

export const createInterview = (event) => {
  return fetch("http://localhost:8000/interviews", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  })
    .then((res) => res.json())
    .catch(console.log(event));
};

export const disconnectInterview = (interviewId, contactObject) => {
  fetch(`http://localhost:8000/interviews/${interviewId}/disconnect`, {
    method: "DELETE",
    body: JSON.stringify(contactObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const connectInterview = (interviewId, contactObject) => {
  fetch(`http://localhost:8000/interviews/${interviewId}/connect`, {
    method: "POST",
    body: JSON.stringify(contactObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};
