import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SurveyList({ onLogout }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const storedSurveys = localStorage.getItem('surveys');
    if (storedSurveys) {
      setSurveys(JSON.parse(storedSurveys));
    }
  }, []);

  return (
    <div>
      <h2>Surveys</h2>
      <button onClick={onLogout}>Logout</button>
      <Link to="/create">Create New Survey</Link>
      <div className="survey-list">
        {surveys.map((survey) => (
          <div key={survey.id} className="survey-item">
            <Link to={`/survey/${survey.id}`}>{survey.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurveyList;
