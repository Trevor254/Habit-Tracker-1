import React from "react";
import "./Profile.css";

const Profile = ({ user, performanceScore }) => {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <div className="profile-performance">
          <h4>Your Total Performance</h4>
          <div className="performance-score">{performanceScore}%</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


