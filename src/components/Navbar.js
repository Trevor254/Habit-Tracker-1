import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <nav className="navbar">
      <h2>Habit Tracker</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/add-habit">Add Habit</Link>
        <Link to="/view-habits">View Habits</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/profile">Profile</Link> 
      </div>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
