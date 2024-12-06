import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HabitList = ({ habits, deleteHabit, updateProgress }) => {
  const [timeOfDayFilter, setTimeOfDayFilter] = useState("All");
  const [dayFilter, setDayFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter habits based on selected time of day, day, and search term
  const filteredHabits = habits.filter((habit) => {
    const matchesTime =
      timeOfDayFilter === "All" || habit.timeOfDay === timeOfDayFilter;
    const matchesDay =
      dayFilter === "All" || habit.days.includes(dayFilter);
    const matchesSearch =
      habit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      habit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTime && matchesDay && matchesSearch;
  });

  return (
    <div className="habit-list">
      <h2>View Habits</h2>

      {/* Filters Section */}
      <div className="filters">
        <select
          value={timeOfDayFilter}
          onChange={(e) => setTimeOfDayFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Times</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Days</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <input
          type="text"
          placeholder="Search habits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Habit Cards Section */}
      <div className="habit-container">
        {filteredHabits.map((habit) => {
          const chartData = {
            labels: ["Progress", "Remaining"],
            datasets: [
              {
                label: "Habit Progress",
                data: [habit.progress, habit.goal - habit.progress],
                backgroundColor: ["#4caf50", "#f44336"],
                borderWidth: 1,
              },
            ],
          };

          return (
            <div key={habit.id} className="habit-card">
              <h3>{habit.name}</h3>
              <p>{habit.description}</p>
              <p>
                Progress: {habit.progress}/{habit.goal}
              </p>
              <p>
                Days: {habit.days.join(", ")}
              </p>
              <div className="chart-container">
                <Pie data={chartData} />
              </div>
              <button
                className="update-btn"
                onClick={() => updateProgress(habit.id)}
              >
                Update Progress
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteHabit(habit.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitList;


