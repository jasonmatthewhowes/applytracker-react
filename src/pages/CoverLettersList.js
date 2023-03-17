import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCoverLetters } from "../managers/CoverLetterManager";
import "./JobsList.css";

const TableHeader = () => (
  <thead>
    <tr>
      <th>File Name</th>
      <th>Verified</th>
      <th>Detail</th>
    </tr>
  </thead>
);

const TableBody = ({ coverLetters, navigate }) => (
  <tbody>
    {coverLetters.map((coverLetter) => (
      <tr key={coverLetter.id}>
        <td>
          <a href={coverLetter?.cover_letter_url} target="_blank">
            {coverLetter.name}
          </a>
        </td>
        <td>
          <input type="checkbox" checked={coverLetter.finalized} readOnly />
        </td>
        <td>
          <button
            onClick={() => navigate(`/coverletters/edit/${coverLetter.id}`)}
          >
            Detail
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);

export const CoverLetterList = (props) => {
  const [coverLetters, setCoverLetters] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getCoverLetters().then((data) => setCoverLetters(data));
  }, []);

  console.log(coverLetters);
  return (
    <>
      <div className="JobsContainer">
        <h2>Cover Letters</h2>
        <table className="blueTable">
          <TableHeader />
          <TableBody coverLetters={coverLetters} navigate={navigate} />
        </table>
        <button
          onClick={(evt) => {
            navigate("/createcoverletter");
          }}
        >
          Add a New Cover Letter
        </button>
      </div>
    </>
  );
};
