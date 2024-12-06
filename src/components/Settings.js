import React, { useState } from "react";
import "./Settings.css";

const Settings = ({ currentSettings = {}, saveSettings }) => {
  const [theme, setTheme] = useState(currentSettings.theme || "light");
  const [notifications, setNotifications] = useState(
    currentSettings.notifications !== undefined
      ? currentSettings.notifications
      : true
  );

  const handleSave = () => {
    const newSettings = { theme, notifications };
    saveSettings(newSettings);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="form-group">
        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable Notifications
        </label>
      </div>
      <button onClick={handleSave} className="save-button">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;

