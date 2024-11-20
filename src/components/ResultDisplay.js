import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaTachometerAlt } from 'react-icons/fa';

import './MainDashboard.css'; // Import shared CSS styles

function ResultDisplay({ scores }) {
  const formatScore = (score) => {
    return score ? score.toFixed(0) : '0';
  };

  return (
    <div className="result-display">
      <div className="score-section">
        <h3>
          <FaTachometerAlt /> Performance Score
        </h3>
        <CircularProgressbar
          value={scores.performance}
          text={`${formatScore(scores.performance)}%`}
          styles={buildStyles({
            pathColor: scores.performance > 75 ? '#00C49A' : '#FF6347',
            textColor: '#333',
          })}
        />
      </div>
    </div>
  );
}

export default ResultDisplay;
