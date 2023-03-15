import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getResumes } from "../managers/ResumeManager"
import "./JobsList.css"



const TableHeader = () => (
    
    <thead>
        <tr>
            
            <th>Resume Name</th>
            <th>Role</th>
            <th>Last Edited</th>
            <th>Detail</th>
            
            
        </tr>
    </thead>
   
)

const TableBody = ({ resumes, navigate }) => 

(
    
    <tbody>
        {resumes.map(resume => (
            <tr key={resume.id}>
                
          
                <td><a href={resume?.resume_url} target="_blank">{resume.resume_name}</a></td>
                <td>{resume.role?.name}</td>
                <td>{resume.date_reviewed}</td>
                <td><button onClick={() => navigate(`/resumes/edit/${resume.id}`)}>Detail</button></td>
                
                
            </tr>
        ))}
    </tbody>
)

export const ResumeList = (props) => {
    const [resumes, setResumes ] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getResumes().then(data => setResumes(data))
    }, [])



    console.log(resumes)
    return (
        <>
        <div className="JobsContainer">
        <h2>Resumes</h2>
        <table className="blueTable">
            <TableHeader />
            <TableBody resumes={resumes} navigate={navigate} />
        </table>
        <button onClick={ evt => {
                     navigate("/createresume")
                }}>Add a new resume</button>
        </div>
        </>
    )
}