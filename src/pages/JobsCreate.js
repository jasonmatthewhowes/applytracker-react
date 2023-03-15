
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createCompany, getCompanies } from "../managers/CompanyManager"
import { getContacts } from "../managers/ContactManager"
import { getCoverLetters } from "../managers/CoverLetterManager"
import { getJobs, createJob, getSingleJob, updateJob, deleteJob, getJobServices, getLastJobId } from "../managers/JobManager"
import { getResumes } from "../managers/ResumeManager"
import { getAllRoles } from "../managers/RoleManager"
import "./JobsList.css"



export const JobCreate = (props) => {
    const navigate = useNavigate()
    const [jobList, setJobList] = useState([])
    

       

    const [currentJob, setCurrentJob] = useState({
        id:0,
        // user:0,
        name: "",
        job_post_link:"",
        resume:{
            id:0,
            resume_name:"",
            resume_url:""
        },
        cover_letter: {
            id:0,
            name:"",
            cover_letter_url:"",
            finalized:false
        },
        applied: "",
        dueDate:"",
        description:"",
        job_service: {
            id:0,
            name:""
        },
        role: {
            id:0,
            name:""
        },
        timestamp:"",
        company: {
            id:null,
            name:""
        },
        contact: {
            id:0,
            full_name:"",
            email:""
        },
        temperature: 5 
    })

    const [companyList, setCompanyList] = useState([])
    const [resumeList, setResumeList] = useState ([])
    const [coverLetterList, setCoverLetterList] = useState([])
    const [contactList, setContactList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [jobServiceList, setJobServiceList] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [companyName, setCompanyName] = useState("")


    useEffect(() => {
        getJobs().then(data => setJobList(data))
    }, [])
    useEffect(() => {
        getCompanies().then(data => setCompanyList(data))
    }, [])
    useEffect(() => {
        getResumes().then(data => setResumeList(data))
    }, [])
    useEffect(() => {
        getCoverLetters().then(data => setCoverLetterList(data))
    }, [])
    useEffect(() => {
        getContacts().then(data => setContactList(data))
    }, [])
    useEffect(() => {
        getAllRoles().then(data => setRoleList(data))
    }, [])
    useEffect(() => {
        getJobServices().then(data => setJobServiceList(data))
    }, [])


    /*
    const changejobState = (domJob) => {
        // TODO: Complete the onChange function
    }
    */
    return (
        <form className="jobForm">
            <h2 className="jobForm__title">Create a Job Opportunity</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Job Name: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentJob.name}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.name =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Posting URL Link: </label>
                    <input type="url" name="job_post_link" required autoFocus className="form-control"
                        value={currentJob.job_post_link}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.job_post_link =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Application Sent: </label>
                    <input type="date" name="applied" required autoFocus className="form-control"
                        value={currentJob.applied}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.applied =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Temperature (<em>Choose a number 1-10 where 1 is cold and 10 is hot</em>)</label>
                    <input type="number" name="temperature" required autoFocus className="form-control"
                        value={currentJob.temperature}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.temperature =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentJob.description}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.description =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="maker">Due Date: </label>
                    <input type="date" name="title" required autoFocus className="form-control"
                        value={currentJob.due_date}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.due_date =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                <label>Company:</label>
                <select className="form-group" onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.company.id= evt.target.value
                    setCurrentJob(copy)
            }}>
                
           <option value="">Select a company</option>
 {companyList.map(option => (
         <option key={option.id} value={option.id}>{option.name}</option>
     ))} </select> 
     <label>
         <input type="checkbox" onChange={() => setShowInput(!showInput)} /> Enter new Company Name
     </label>
     {showInput && <input type="text" onChange={(e) => setCompanyName(e.target.value)} />}
     {showInput && <button onClick={() => {
         let newCompany = {name: companyName};
         createCompany(newCompany).then(() => {
             getCompanies().then(data => setCompanyList(data)).then(() => setShowInput(false));
         });
     }}>Submit</button>}
                <br></br>
                <label>Resume:</label>
               <select className="form-group" onChange={
         (evt) => {
         const copy= {...currentJob}
         copy.resume.id= evt.target.value
         setCurrentJob(copy)
 }}>
 <option value="">Select a resume</option>
 {resumeList.map(option => (
         <option key={option.id} value={option.id}>{option.resume_name}</option>
     ))} </select>
                <label>Cover Letter:</label>
                <select className="form-group" onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.cover_letter.id= evt.target.value
                    setCurrentJob(copy)
            }}>
            <option value="">Select a cover letter</option>
            {coverLetterList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <label>Contact:</label>
                <select className="form-group" onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.contact.id= evt.target.value
                    setCurrentJob(copy)
            }}>
            <option value="">Select a contact</option>
            {contactList.map(option => (
                    <option key={option.id} value={option.id}>{option.full_name}</option>
                ))} </select>
                <label>Role:</label>
                <select className="form-group" onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.role.id= evt.target.value
                    setCurrentJob(copy)
            }}>
            <option value="">Select a job role</option>
            {roleList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <label>Job Listing Service:</label>
                <select className="form-group" onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job_service.id= evt.target.value
                    setCurrentJob(copy)
            }}>
            <option value="">Select a listing service</option>
            {jobServiceList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                
                
            </fieldset>

            

            <button type="submit"
                onClick={evt => {
                 
                    evt.preventDefault()
                    
                    let job = {
                    id: parseInt(currentJob.id),
                    name: currentJob.name,
                    job_post_link:currentJob.job_post_link,
                    resume: parseInt(currentJob.resume.id),
                    cover_letter: parseInt(currentJob.cover_letter.id),
                    applied: currentJob.applied,
                    due_date: currentJob.due_date,
                    description: currentJob.description,
                    job_service: parseInt(currentJob.job_service.id),
                    role: parseInt(currentJob.role.id),
                    contact: parseInt(currentJob.contact.id),
                    temperature: parseInt(currentJob.temperature),
                    company: parseInt(currentJob.company.id)
                    }
                    

                    // Send POST request to your API
                    createJob(job)
                    
                    
                        .then(() => {
                            
                            navigate("/jobs")
                        })
                }}
                >Create</button>
                <button onClick={ evt => {
                     navigate("/jobs")
                }}>Cancel</button>
        </form>
    )
}
