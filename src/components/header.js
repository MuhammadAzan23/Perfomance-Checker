import React from 'react';
import './header.css'

function Header({ user, handleLogout }) {
  return (
    <div className="header">
      <div className="logo">
        <h1>Website Performance Checker</h1>
      </div>
      {user && (
        <div className="user-info">
          <img src={user.photoURL} alt="Profile" className="profile-pic" />
          <span>Welcome, {user.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Header;
