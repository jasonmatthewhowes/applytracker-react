import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { deleteJob, getJobs } from "../managers/JobManager"
import "./JobsList.css"



const TableHeader = () => (
    
    <thead>
        <tr>
            <th>Applied</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Cover Letter</th>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Job Service</th>
            <th>Resume</th>
            <th>Role</th>
            <th>Temperature</th>
            <th>Detail</th>
            
            
        </tr>
    </thead>
   
)

const TableBody = ({ jobs }) => (
    
    <tbody>
        {jobs.map(job => (
            <tr key={job.id}>
                <td>{job.applied}</td>
                <td>{job.companyjobs.name}</td>
                <td>{job.contact.full_name}</td>
          <td><a href={job.cover_letter.cover_letter_url} target="_blank">{job.cover_letter.name}</a></td>
                <td>{job.name}</td>
                <td>{job.description}</td>
                <td>{job.due_date}</td>
                <td><a href={job.job_post_link} target="_blank">{job.job_service.name}</a></td>
                <td>{job.resume.resume_name}</td>
                <td>{job.role.name}</td>
                <td>{job.temperature}</td>
                <td><button>Detail</button></td>
                
                
            </tr>
        ))}
    </tbody>
)

export const JobList = (props) => {
    const [ jobs, setJobs ] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getJobs().then(data => setJobs(data))
    }, [])

    const handleDelete = (id) => {
        deleteJob(id).then(() => {
            const updatedJobs = jobs.filter(job => job.id !== id)
            setJobs(updatedJobs)
        })
    }

    console.log(jobs)
    return (
        <>
        <div className="JobsContainer">
        <h2>Jobs List</h2>
        <table className="blueTable">
            <TableHeader />
            <TableBody jobs={jobs} />
        </table>
        <button>Add Job Opportunity</button>
        </div>
        </>
    )
}