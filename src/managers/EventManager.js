export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const createEvent = (event) => {
    return fetch('http://localhost:8000/events',
        { method: "POST", body: JSON.stringify(event),
        headers: {'Content-Type':'application/json',
        "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
        .then(res => res.json())
        .catch(console.log(event))
}


export const convertDateTime = (dateTime)  => {
    const dateTimeParts = dateTime.split('T');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');
    const month = dateParts[1];
    const day = dateParts[2];
    const year = dateParts[0];
    const hour = timeParts[0];
    const minute = timeParts[1];
    let amPm = 'AM';
    let hour12 = hour;
    if (hour > 12) {
      amPm = 'PM';
      hour12 = hour - 12;
    }
    return `${month}/${day}/${year} ${hour12}:${minute} ${amPm}`;
  }

