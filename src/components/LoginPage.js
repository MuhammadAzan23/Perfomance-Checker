import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from '../auth/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import "./LoginPage.css"
function LoginPage({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      // Sign in with Google using Popup
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      setError('Error during Google Sign-In. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Your Account</h2>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {!user ? (
          <div className="login-form">
            <button
              disabled={loading}
              className={`google-login-btn ${loading ? 'loading' : ''}`}
              onClick={loading ? () => {} : handleLogin}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <FcGoogle className="google-icon" />
              )}
              {loading ? 'Logging in...' : 'Login with Google'}
            </button>
          </div>
        ) : (
          <div>
            <p>You are already logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
