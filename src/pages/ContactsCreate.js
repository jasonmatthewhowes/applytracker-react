
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'

import { createContact, deleteContact, getContacts, getSingleContact, updateContact } from "../managers/ContactManager"
import { getAllCompanies, getCompanies } from "../managers/CompanyManager"
import "./JobsList.css"


export const ContactCreate = () => {
    const navigate = useNavigate()
    const [jobList, setJobList] = useState([])
    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
       

    const [currentContact, setCurrentContact] = useState({
        id:0,
        first_name:"",
        last_name:"",
        email: "",
        linkedin_url:"",
        title:"",
        phone:"",
        company: {
            id:0,
            name:""
        }
    })


    const [companyList, setCompanyList] = useState([])


    const { contactId } = useParams()
    
    useEffect(() => {
        getSingleContact(contactId).then(data => setCurrentContact(data))
    }, [])

    useEffect(() => {
        getCompanies().then(data => setCompanyList(data))
    }, [])

    return (
        <form className="jobForm">
            <h2 className="jobForm__title">Create New Contact</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">First Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentContact.first_name}
                        onChange={
                            (evt) => {
                                const copy = {...currentContact}
                                copy.first_name =evt.target.value
                                setCurrentContact(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentContact.last_name}
                        onChange={
                            (evt) => {
                                const copy = {...currentContact}
                                copy.last_name =evt.target.value
                                setCurrentContact(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">LinkedIn URL: </label>
                    <input type="url" name="contact_url" required autoFocus className="form-control"
                        value={currentContact.linkedin_url}
                        onChange={
                            (evt) => {
                                const copy = {...currentContact}
                                copy.linkedin_url =evt.target.value
                                setCurrentContact(copy)
                            }}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentContact.title}
                        onChange={
                            (evt) => {
                                const copy = {...currentContact}
                                copy.title =evt.target.value
                                setCurrentContact(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Phone: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentContact.phone}
                        onChange={
                            (evt) => {
                                const copy = {...currentContact}
                                copy.phone =evt.target.value
                                setCurrentContact(copy)
                            }}
                    />
                </div>
                
<label>Company:</label>
                <select className="form-group" onChange={
                    (evt) => {
                    const copy= {...currentContact}
                    copy.company.id= evt.target.value
                    setCurrentContact(copy)
            }} defaultValue={currentContact.company.name}>
                <option>{currentContact.company.name}</option>
                {companyList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                
            </fieldset>        

            <button type="submit"
                onClick={evt => {
                 
                    evt.preventDefault()

                    const contact = {
                    id: parseInt(currentContact.id),
                    first_name: currentContact.first_name,
                    last_name:currentContact.last_name,
                    title: currentContact.title,
                    phone: currentContact.phone,
                    email: currentContact.email,
                    linkedin_url: currentContact.linkedin_url,
                    company: parseInt(currentContact.company.id)
                    }

                    // Send POST request to your API
                    createContact(contact)
                        .then(() => navigate("/contacts"))
                }}
                >Save</button>
                <button onClick={ evt => {
                    deleteContact(currentContact.id)
                    .then(() => navigate("/contacts"))
                }}>Delete</button>
        </form>
    )
}
