import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getCompanies } from "../managers/CompanyManager"
import { getContacts } from "../managers/ContactManager"
import { getCoverLetters } from "../managers/CoverLetterManager"
import { getJobs, createJob, getSingleJob } from "../managers/JobManager"
import { getResumes } from "../managers/ResumeManager"



export const JobEdit = () => {
    const navigate = useNavigate()
    const [jobList, setJobList] = useState([])
    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */


    const [currentJob, setCurrentJob] = useState({
        id:0,
        user:0,
        name: "",
        jobPostLink:"",
        resumeId:0,
        coverLetterId: 0,
        applied: "",
        dueDate:"",
        description:"",
        jobService: 0,
        role: 0,
        timestamp:"",
        companyJobs: 0,
        contactId: 0,
        temperature: 0 
    })

    const [companyList, setCompanyList] = useState([])
    const [resumeList, setResumeList] = useState ([])
    const [coverLetterList, setCoverLetterList] = useState([])
    const [contactList, setContactList] = useState([])



    const { JobId } = useParams()
    
    useEffect(() => {
        getSingleJob(JobId).then(data => setCurrentJob(data))
    }, [])

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
    
    


    /*
    const changejobState = (domJob) => {
        // TODO: Complete the onChange function
    }
    */
    return (
        <form className="jobForm">
            <h2 className="jobForm__title">Edit Job</h2>
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
                    <input type="text" name="job_post_link" required autoFocus className="form-control"
                        value={currentJob.jobPostLink}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.jobPostLink =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Application Sent: </label>
                    <input type="datetime-local" name="applied" required autoFocus className="form-control"
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
                    <label htmlFor="name">Job Name: </label>
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
                    <input type="datetime-local" name="title" required autoFocus className="form-control"
                        value={currentJob.dueDate}
                        onChange={
                            (evt) => {
                                const copy = {...currentJob}
                                copy.dueDate =evt.target.value
                                setCurrentJob(copy)
                            }}
                    />
                </div>

                <select onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job= evt.target.value
                    setCurrentJob(copy)
            }}>{jobList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <select onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job= evt.target.value
                    setCurrentJob(copy)
            }}>{jobList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <select onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job= evt.target.value
                    setCurrentJob(copy)
            }}>{jobList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <select onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job= evt.target.value
                    setCurrentJob(copy)
            }}>{jobList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <select onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job= evt.target.value
                    setCurrentJob(copy)
            }}>{jobList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
                <select onChange={
                    (evt) => {
                    const copy= {...currentJob}
                    copy.job= evt.target.value
                    setCurrentJob(copy)
            }}>{jobList.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))} </select>
            
                
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // PrJob form from being submitted
                    evt.prJobDefault()

                    const Job = {
                    name: currentJob.name,
                    job:parseInt(currentJob.job),
                    description: currentJob.description,
                    date:currentJob.date,
                    }

                    // Send POST request to your API
                    createJob(Job)
                        .then(() => navigate("/Jobs"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}
