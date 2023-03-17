import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  deleteCoverLetter,
  getCoverLetters,
  getSingleCoverLetter,
  updateCoverLetter,
} from "../managers/CoverLetterManager";
import { getJobs } from "../managers/JobManager";
import { getAllRoles } from "../managers/RoleManager";
import "./JobsList.css";

export const CoverLetterEdit = () => {
  const navigate = useNavigate();

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

  const [currentCoverLetter, setCurrentCoverLetter] = useState({
    id: 0,
    user: 0,
    cover_letter_url: "",
    name: "",
    job: 0,
    finalized: false,
    body: "",
  });

  const [jobList, setJobList] = useState([]);

  const { coverLetterId } = useParams();

  useEffect(() => {
    getSingleCoverLetter(coverLetterId).then((data) =>
      setCurrentCoverLetter(data)
    );
  }, []);

  useEffect(() => {
    getJobs().then((data) => setJobList(data));
  }, []);

  return (
    <form className="jobForm">
      <h2 className="jobForm__title">Edit Cover Letter</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">File Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentCoverLetter.name}
            onChange={(evt) => {
              const copy = { ...currentCoverLetter };
              copy.name = evt.target.value;
              setCurrentCoverLetter(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">File Location URL: </label>
          <input
            type="url"
            name="coverLetter_url"
            required
            autoFocus
            className="form-control"
            value={currentCoverLetter.cover_letter_url}
            onChange={(evt) => {
              const copy = { ...currentCoverLetter };
              copy.cover_letter_url = evt.target.value;
              setCurrentCoverLetter(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="finalized">Finalized: </label>
          <input
            type="checkbox"
            name="finalized"
            className="checkbox"
            value={currentCoverLetter.finalized}
            onChange={(evt) => {
              const copy = { ...currentCoverLetter };
              copy.finalized = evt.target.checked ? true : false;
              setCurrentCoverLetter(copy);
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
            value={currentCoverLetter.body}
            onChange={(evt) => {
              const copy = { ...currentCoverLetter };
              copy.body = evt.target.value;
              setCurrentCoverLetter(copy);
            }}
          />
        </div>
        <label>Job:</label>
        <select
          className="form-group"
          onChange={(evt) => {
            const copy = { ...currentCoverLetter };
            copy.job = evt.target.value;
            setCurrentCoverLetter(copy);
          }}
        >
          <option>{currentCoverLetter.job?.name}</option>
          {jobList.map((option) => (
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

          const coverLetter = {
            id: parseInt(currentCoverLetter.id),
            name: currentCoverLetter.name,
            cover_letter_url: currentCoverLetter.cover_letter_url,
            finalized: currentCoverLetter.finalized,
            body: currentCoverLetter.body,
            job: parseInt(currentCoverLetter.job),
          };

          // Send POST request to your API
          updateCoverLetter(coverLetter).then(() => navigate("/coverletters"));
        }}
      >
        Save
      </button>
      <button
        onClick={(evt) => {
          deleteCoverLetter(currentCoverLetter.id).then(() =>
            navigate("/coverletters")
          );
        }}
      >
        Delete
      </button>
    </form>
  );
};
