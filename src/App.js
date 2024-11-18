import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.js';
import MainDashboard from './components/MainDashboard.js';
import './App.css';
import { auth } from './auth/firebaseConfig.js';


function App() {
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  console.log("USER: ", user)
  console.log("loading: ", loading)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false)
      } else {
        setUser(null);
        setLoading(false)
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!loading && (!user ? <LoginPage user={user} setUser={setUser} /> : <Navigate to={"/dashboard"} />)} />
          <Route path="/dashboard" element={!loading && (user ? <MainDashboard user={user} setLoading={setLoading} setUser={setUser}loading={loading}  /> : <Navigate to={"/"} />)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
