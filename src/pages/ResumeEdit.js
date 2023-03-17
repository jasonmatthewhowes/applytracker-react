import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  deleteResume,
  getResumes,
  getSingleResume,
  updateResume,
} from "../managers/ResumeManager";
import { getAllRoles } from "../managers/RoleManager";
import "./JobsList.css";

export const ResumeEdit = () => {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

  const [currentResume, setCurrentResume] = useState({
    id: 0,
    user: 0,
    resume_url: "",
    resume_name: "",
    date_reviewed: "",
    body: "",
    role: {
      id: 0,
      name: "",
    },
  });

  const [roleList, setRoleList] = useState([]);

  const { resumeId } = useParams();

  useEffect(() => {
    getSingleResume(resumeId).then((data) => setCurrentResume(data));
  }, []);

  useEffect(() => {
    getAllRoles().then((data) => setRoleList(data));
  }, []);

  return (
    <form className="jobForm">
      <h2 className="jobForm__title">Edit Resume</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Resume Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentResume.resume_name}
            onChange={(evt) => {
              const copy = { ...currentResume };
              copy.resume_name = evt.target.value;
              setCurrentResume(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">File Location URL: </label>
          <input
            type="url"
            name="resume_url"
            required
            autoFocus
            className="form-control"
            value={currentResume.resume_url}
            onChange={(evt) => {
              const copy = { ...currentResume };
              copy.resume_url = evt.target.value;
              setCurrentResume(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Date Reviewed: </label>
          <input
            type="date"
            name="applied"
            required
            autoFocus
            className="form-control"
            value={currentResume.date_reviewed}
            onChange={(evt) => {
              const copy = { ...currentResume };
              copy.date_reviewed = evt.target.value;
              setCurrentResume(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Body Text <em>Copy and Paste from Doc</em>:{" "}
          </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentResume.body}
            onChange={(evt) => {
              const copy = { ...currentResume };
              copy.body = evt.target.value;
              setCurrentResume(copy);
            }}
          />
        </div>
        <label>Role:</label>
        <select
          className="form-group"
          onChange={(evt) => {
            const copy = { ...currentResume };
            copy.role.id = evt.target.value;
            setCurrentResume(copy);
          }}
        >
          <option>{currentResume.role?.name}</option>
          {roleList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}{" "}
        </select>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const resume = {
            id: parseInt(currentResume.id),
            resume_name: currentResume.resume_name,
            resume_url: currentResume.resume_url,
            date_reviewed: currentResume.date_reviewed,
            body: currentResume.body,
            role: parseInt(currentResume.role.id),
          };

          // Send POST request to your API
          updateResume(resume).then(() => navigate("/resumes"));
        }}
      >
        Save
      </button>
      <button
        onClick={(evt) => {
          deleteResume(currentResume.id).then(() => navigate("/resumes"));
        }}
      >
        Delete
      </button>
    </form>
  );
};
