export const getCompanies = () => {
    return fetch("http://localhost:8000/companies", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const deleteCompany = (companyId) => {
    fetch(`http://localhost:8000/companies/${companyId}`,{
                    method:"DELETE", headers: {'Content-Type':'application/json',
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }})
}

export const getSingleCompany = (companyId) => {
    return fetch(`http://localhost:8000/companies/${companyId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateCompany = (company) => {
    return fetch(`http://localhost:8000/companies/${company.id}`, 
    { method: "PUT", body: JSON.stringify(company),
    headers: {'Content-Type':'application/json',
    "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
    .then(res => res.json())
    .catch(err => console.log(company))
}

export const createCompany = (event) => {
    return fetch('http://localhost:8000/companies',
        { method: "POST", body: JSON.stringify(event),
        headers: {'Content-Type':'application/json',
        "Authorization": `Token ${localStorage.getItem("lu_token")}`}})
        .then(res => res.json())
        .catch(console.log(event))
}

export const getLastCompanyId = () => {
const companies = getCompanies();
const lastCompanyId = companies.slice(-1)[0].id;
return lastCompanyId
}