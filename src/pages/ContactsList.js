import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getContacts } from "../managers/ContactManager"

import "./JobsList.css"



const TableHeader = () => (
    
    <thead>
        <tr>
            
            
            <th>Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Company</th>
            <th>Detail</th>
            
            
            
        </tr>
    </thead>
   
)

const TableBody = ({ contacts, navigate }) => 

(
    
    <tbody>
        {contacts.map(contact => (
            <tr key={contact.id}>
                
          
                
                <td>{contact.full_name}</td>
                <td>{contact.email}</td>
                <td>{contact.title}</td>
                <td>{contact.company?.name}</td>
                <td><button onClick={() => navigate(`/contacts/edit/${contact.id}`)}>Detail</button></td>
                
                
            </tr>
        ))}
    </tbody>
)

export const ContactList = (props) => {
    const [contacts, setContacts ] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getContacts().then(data => setContacts(data))
    }, [])



    console.log(contacts)
    return (
        <>
        <div className="JobsContainer">
        <h2>Contacts</h2>
        <table className="blueTable">
            <TableHeader />
            <TableBody contacts={contacts} navigate={navigate} />
        </table>
        <button onClick={ evt => {
                     navigate("/createcontact")
                }}>Add a New Contact</button>
        </div>
        </>
    )
}