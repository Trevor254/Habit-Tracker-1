import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ habits, performanceScore }) => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="title-badge">
          <span className="title">Habit Tracker</span>
          <div className="badge">{habits.length}</div>
        </div>
      </header>

      {/* Navigation Links */}
      <nav className="dashboard-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/add-habit" className="nav-link">Add Habit</Link>
        <Link to="/view-habits" className="nav-link">View Habits</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </nav>

      {/* Performance Score */}
      <div className="performance-section">
        <h2>Total Performance Score</h2>
        <div className="performance-bar">
          <div
            className="progress"
            style={{ width: `${performanceScore}%`, backgroundColor: "#4caf50" }}
          >
            {performanceScore}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

