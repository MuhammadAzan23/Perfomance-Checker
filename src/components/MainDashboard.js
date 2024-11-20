import React, { useState } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';
import Header from './header';
import ResultDisplay from './ResultDisplay';
import Loader from "./Loader";

// Icons for Mobile and Desktop
import { FaMobileAlt, FaDesktop, FaRocket } from 'react-icons/fa';

import './MainDashboard.css'; // Import shared CSS styles

function MainDashboard({ user, setUser }) {
  const [url, setUrl] = useState('');
  const [deviceType, setDeviceType] = useState('mobile'); // Default device type is mobile
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPerformanceData = async (device) => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
        params: {
          url,
          strategy: device,
        },
      });

      const data = response.data.lighthouseResult.categories;
      const performance = data.performance ? data.performance.score * 100 : 0;

      setScores({ performance });
    } catch (error) {
      console.error('Error fetching performance score', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error('Error during sign out:', error));
  };

  return (
    <div className="main-dashboard">
      <Header user={user} handleLogout={handleLogout} />
      <div className="dashboard">
        <h2>
          <FaRocket /> Website Performance Checker
        </h2>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button
            className={`device-button ${deviceType === 'mobile' ? 'active' : ''}`}
            onClick={() => {
              setDeviceType('mobile');
              fetchPerformanceData('mobile');
            }}
          >
            <FaMobileAlt /> Check Mobile
          </button>

          <button
            className={`device-button ${deviceType === 'desktop' ? 'active' : ''}`}
            onClick={() => {
              setDeviceType('desktop');
              fetchPerformanceData('desktop');
            }}
          >
            <FaDesktop /> Check Desktop
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          scores && <ResultDisplay scores={scores} device={deviceType} />
        )}
      </div>
    </div>
  );
}

export default MainDashboard;
