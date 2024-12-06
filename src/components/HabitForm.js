import React, { useState } from "react";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const HabitForm = ({ addHabit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || selectedDays.length === 0) {
      alert("Please fill all fields and select at least one day.");
      return;
    }
    const newHabit = {
      id: Date.now(),
      name,
      description,
      goal,
      progress: 0,
      timeOfDay,
      days: selectedDays,
    };
    addHabit(newHabit);
    setName("");
    setDescription("");
    setGoal(1);
    setTimeOfDay("Morning");
    setSelectedDays([]);
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>Add a New Habit</h2>
      <input
        type="text"
        placeholder="Habit Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Goal"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
        required
      />
      <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </select>

      <div className="weekday-selector">
        <h4>Select Days</h4>
        {weekdays.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => toggleDay(day)}
            />
            {day}
          </label>
        ))}
      </div>

      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
