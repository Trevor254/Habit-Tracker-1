import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const API_URL = "http://localhost:3001/habits";

function App() {
  const [habits, setHabits] = useState([]);
  const [theme, setTheme] = useState("light");
  const [performanceScore, setPerformanceScore] = useState(0);
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
  });
  const [userProfile, setUserProfile] = useState({
    name: "Kenya Yetu",
    email: "KenyaYetu@example.com",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/640px-Flag_of_Kenya.svg.png",
  });

  // Load habits from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching habits:", error.message);
        toast.error("Failed to fetch habits.");
      });
  }, []);

  // Calculate Performance Score
  useEffect(() => {
    if (habits.length > 0) {
      const totalGoals = habits.reduce((sum, habit) => sum + habit.goal, 0);
      const totalProgress = habits.reduce((sum, habit) => sum + habit.progress, 0);
      const score = totalGoals > 0 ? Math.round((totalProgress / totalGoals) * 100) : 0;
      setPerformanceScore(score);
    } else {
      setPerformanceScore(0);
    }
  }, [habits]);

  // Add Habit
  const addHabit = (newHabit) => {
    axios
      .post(API_URL, newHabit)
      .then((response) => {
        setHabits((prevHabits) => [...prevHabits, response.data]);
        toast.success("Habit added successfully!");
      })
      .catch((error) => {
        console.error("Error adding habit:", error.message);
        toast.error("Failed to add habit.");
      });
  };

  // Delete Habit
  const deleteHabit = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
        toast.success("Habit deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting habit:", error.message);
        toast.error("Failed to delete habit.");
      });
  };

  // Update Progress
  const updateProgress = (id) => {
    const habitToUpdate = habits.find((habit) => habit.id === id);
    if (habitToUpdate) {
      const updatedHabit = { ...habitToUpdate, progress: habitToUpdate.progress + 1 };
      axios
        .put(`${API_URL}/${id}`, updatedHabit)
        .then((response) => {
          setHabits((prevHabits) =>
            prevHabits.map((habit) => (habit.id === id ? response.data : habit))
          );
          toast.success("Progress updated!");
        })
        .catch((error) => {
          console.error("Error updating progress:", error.message);
          toast.error("Failed to update progress.");
        });
    }
  };

  // Save Profile Picture
  const saveProfilePicture = (newProfilePic) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      avatar: newProfilePic,
    }));
    toast.success("Profile picture updated!");
  };

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings((prevSettings) => ({
      ...prevSettings,
      theme: newTheme,
    }));
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    toast.info(`Switched to ${newTheme} mode!`);
  };

  // Save Settings
  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    setTheme(newSettings.theme);
    document.body.setAttribute("data-theme", newSettings.theme);
    toast.success("Settings saved successfully!");
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                habits={habits}
                performanceScore={performanceScore}
              />
            }
          />
          <Route
            path="/add-habit"
            element={<HabitForm addHabit={addHabit} />}
          />
          <Route
            path="/view-habits"
            element={
              <HabitList
                habits={habits}
                updateProgress={updateProgress}
                deleteHabit={deleteHabit}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                currentSettings={settings}
                saveSettings={saveSettings}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={userProfile}
                performanceScore={performanceScore}
                saveProfilePicture={saveProfilePicture}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
