import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ResultDisplay({ scores }) {
  const formatScore = (score) => {
    return score ? score.toFixed(0) : '0';
  };
  return (
    <div className="result-display">
      <div className="score-section">
        <h3>Performance</h3>
        <CircularProgressbar
          value={scores.performance}
          text={`${formatScore(scores.performance)}%`}
          styles={buildStyles({
            pathColor: '#00C49A',
            textColor: '#00C49A',
          })}
        />
      </div>
      
 
    </div>
  );
}

export default ResultDisplay;
