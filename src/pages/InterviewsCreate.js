import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContacts } from "../managers/ContactManager";

import {
  connectInterview,
  createInterview,
  deleteInterview,
  disconnectInterview,
  getInterviews,
  getLastInterviewId,
  getSingleInterview,
  updateInterview,
} from "../managers/InterviewManager";
import { getJobs } from "../managers/JobManager";
import { getAllRoles } from "../managers/RoleManager";
import "./JobsList.css";

export const InterviewCreate = () => {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [contactOne, setContactOne] = useState({});

  const [currentInterview, setCurrentInterview] = useState({
    id: 0,
    user: {},
    date: "",
    time: "",
    location: "",
    job: {
      id: 0,
      name: "",
    },
  });

  const { interviewId } = useParams();

  useEffect(() => {
    getJobs().then((data) => setJobList(data));
  }, []);
  useEffect(() => {
    getContacts().then((data) => setContactList(data));
  }, []);

  return (
    <form className="jobForm">
      <h2 className="jobForm__title">Create interview</h2>
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
      </fieldset>
      <ul>
        {currentInterview.interviewcontacts?.map((contact) => (
          <li key={contact.id}>
            {contact.full_name}{" "}
            <button
              onClick={(evt) => {
                const newContact = {
                  contact: parseInt(contact.id),
                };
                disconnectInterview(currentInterview.id, newContact).then(() =>
                  getSingleInterview(interviewId).then((data) =>
                    setCurrentInterview(data)
                  )
                );
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const interview = {
            date: currentInterview.date,
            time: currentInterview.time,
            location: currentInterview.location,
            job: parseInt(currentInterview.job.id),
          };

          // Send POST request to your API
          createInterview(interview).then(() => navigate("/interviews"));
        }}
      >
        Save
      </button>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const interview = {
            date: currentInterview.date,
            time: currentInterview.time,
            location: currentInterview.location,
            job: parseInt(currentInterview.job.id),
          };

          // Send POST request to your API
          createInterview(interview).then(() => {
            let interviewId = getLastInterviewId().then((interviewId) =>
              navigate(`/interviews/edit/${interviewId}`)
            );
          });
        }}
      >
        Save and Add Contacts
      </button>
      <button
        onClick={(evt) => {
          navigate("/interviews");
        }}
      >
        Cancel
      </button>
    </form>
  );
};
