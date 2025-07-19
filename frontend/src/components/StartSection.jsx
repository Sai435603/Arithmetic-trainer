import React from 'react';
import './StartSection.css';

export default function StartSection({ onToggleSettings, onStart }) {
  return (
    <div className="start-section">
      <h2>Ready to Start?</h2>
      <div className="buttons">
        <button onClick={onToggleSettings}>Hide/Show Settings</button>
        <button className="start-btn" onClick={onStart}>Start Game ▶</button>
      </div>
    </div>
  );
}
