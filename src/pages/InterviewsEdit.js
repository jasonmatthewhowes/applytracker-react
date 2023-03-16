import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContacts } from "../managers/ContactManager";

import {
    connectInterview,
  deleteInterview,
  disconnectInterview,
  getInterviews,
  getSingleInterview,
  updateInterview,
} from "../managers/InterviewManager";
import { getJobs } from "../managers/JobManager";
import { getAllRoles } from "../managers/RoleManager";
import "./JobsList.css";

export const InterviewEdit = () => {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [contactOne, setContactOne] = useState({});
  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

  const [currentInterview, setCurrentInterview] = useState({});

  const { interviewId } = useParams();

  useEffect(() => {
    getSingleInterview(interviewId).then((data) => setCurrentInterview(data));
  }, []);

  useEffect(() => {
    getJobs().then((data) => setJobList(data));
  }, []);
  useEffect(() => {
    getContacts().then((data) => setContactList(data));
  }, []);

  return (
    <form className="jobForm">
      <h2 className="jobForm__title">Edit interview</h2>
      <fieldset>
        <label>Job:</label>
        <select
          className="form-group"
          onChange={(evt) => {
            const copy = { ...currentInterview };
            copy.job.id = evt.target.value;
            setCurrentInterview(copy);
          }}
        >
          <option>{currentInterview.job?.name}</option>
          {jobList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}{" "}
        </select>

        <div className="form-group">
          <label htmlFor="name">Interview Date: </label>
          <input
            type="date"
            name="applied"
            required
            autoFocus
            className="form-control"
            value={currentInterview.date}
            onChange={(evt) => {
              const copy = { ...currentInterview };
              copy.date = evt.target.value;
              setCurrentInterview(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Interview Time: </label>
          <input
            type="time"
            name="applied"
            required
            autoFocus
            className="form-control"
            value={currentInterview.time}
            onChange={(evt) => {
              const copy = { ...currentInterview };
              copy.time = evt.target.value;
              setCurrentInterview(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Location: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentInterview.location}
            onChange={(evt) => {
              const copy = { ...currentInterview };
              copy.location = evt.target.value;
              setCurrentInterview(copy);
            }}
          />
        </div>
        <label>Add Contact:</label>
        <select
          className="form-group"
          onChange={(evt) => {
            const copy = { ...contactOne };
            copy.contact = evt.target.value;
            setContactOne(copy);
          }}
        >
          <option>Select a Contact</option>
          {contactList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.full_name}
            </option>
          ))}{" "}
        </select>
        <button onClick={(evt) => {
          const newContact = {
            contact:parseInt(contactOne.contact)
          }
          connectInterview(currentInterview.id,newContact ).then(() =>
          getSingleInterview(interviewId).then((data) => setCurrentInterview(data)));
        }} >Add Contact to Interview</button>
      </fieldset>
     <ul>
   Attending Contacts
   {currentInterview.interviewcontacts?.map((contact) => (
     <li key={contact.id}>{contact.full_name} <button 
     onClick={(evt) => {
        const newContact = {
          contact:parseInt(contact.id)
        }
        disconnectInterview(currentInterview.id,newContact ).then(() =>
        getSingleInterview(interviewId).then((data) => setCurrentInterview(data)));
      }} 
     >Remove</button></li> 
   ))}
 </ul>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const interview = {
            id: parseInt(currentInterview.id),
            date: currentInterview.date,
            time: currentInterview.time,
            location: currentInterview.location,
            job: parseInt(currentInterview.job.id),
          };

          // Send POST request to your API
          updateInterview(interview).then(() => navigate("/interviews"));
        }}
      >
        Save
      </button>
      <button
        onClick={(evt) => {
          deleteInterview(currentInterview.id).then(() =>
            navigate("/interviews")
          );
        }}
      >
        Delete
      </button>
    </form>
  );
};
