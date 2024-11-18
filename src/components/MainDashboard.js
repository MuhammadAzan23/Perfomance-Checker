import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';
import Header from './header';
import ResultDisplay from './ResultDisplay';
import Loader from "./Loader"; // Import the Loader component

// Icons for Mobile and Desktop
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';

function MainDashboard({ user, setUser }) {
  const [url, setUrl] = useState('');
  const [deviceType, setDeviceType] = useState('mobile'); // Default device type is mobile
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading

  // Function to fetch performance score for a specific device type
  const fetchPerformanceData = async (device) => {
    setLoading(true); // Set loading to true before starting the request

    try {
      const response = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
        params: {
          url,
          strategy: device, // 'mobile' or 'desktop'
          key: 'AIzaSyB0ummJkbxS-zDAKVgaq78Rv5iP_haPGTo', // Replace with your actual API key
        },
      });

      // Extracting scores from the API response
      const data = response.data.lighthouseResult.categories;
      const performance = data.performance ? data.performance.score * 100 : 0;
   console.log("perk",performance)
      // Store the scores in state
      setScores({ performance });
    } catch (error) {
      console.error('Error fetching performance score', error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Effect to fetch mobile performance data by default on load
  // useEffect(() => {
  //   if (url) {
  //     fetchPerformanceData(deviceType); // Fetch performance for the default device type (mobile)
  //   }
  // }, [url, deviceType]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error('Error during sign out:', error));
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div className="dashboard">
        <h2>Website Performance Checker</h2>
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="button-group">
          {/* Mobile Button */}
          <button onClick={() => { setDeviceType('mobile'); fetchPerformanceData('mobile'); }}>
            <FaMobileAlt /> Check Mobile
          </button>

          {/* Desktop Button */}
          <button onClick={() => { setDeviceType('desktop'); fetchPerformanceData('desktop'); }}>
            <FaDesktop /> Check Desktop
          </button>
        </div>

        {/* Show loader when data is being fetched */}
        {loading ? (
          <Loader /> // Show the loader while fetching data
        ) : (
          // Display results based on the selected device (mobile or desktop)
          scores && <ResultDisplay scores={scores} device={deviceType} />
        )}
      </div>
    </div>
  );
}

export default MainDashboard;
