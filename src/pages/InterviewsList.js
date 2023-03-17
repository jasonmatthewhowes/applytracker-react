import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInterviews } from "../managers/InterviewManager";

import "./JobsList.css";

const TableHeader = () => (
  <thead>
    <tr>
      <th>Job</th>
      <th>Date</th>
      <th>Time</th>
      <th>Location</th>
      <th>Detail</th>
    </tr>
  </thead>
);

const TableBody = ({ interviews, navigate }) => (
  <tbody>
    {interviews.map((interview) => (
      <tr key={interview.id}>
        <td>{interview.job?.name}</td>
        <td>{interview.date}</td>
        <td>{interview.time}</td>
        <td>{interview.location}</td>
        <td>
          <button onClick={() => navigate(`/interviews/edit/${interview.id}`)}>
            Detail
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);

export const InterviewList = (props) => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getInterviews().then((data) => setInterviews(data));
  }, []);

  console.log(interviews);
  return (
    <>
      <div className="JobsContainer">
        <h2>Interviews</h2>
        <table className="blueTable">
          <TableHeader />
          <TableBody interviews={interviews} navigate={navigate} />
        </table>
        <button
          onClick={(evt) => {
            navigate("/createinterview");
          }}
        >
          Add a New Interview
        </button>
      </div>
    </>
  );
};
