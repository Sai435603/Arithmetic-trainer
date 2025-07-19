import React from 'react';
import './GameDisplay.css';

export default function GameDisplay() {
  // placeholder for where the question & input go
  return (
    <div className="game-display">
      {/* Your question, answer input, and live feedback */}
      <p>Question will appear here</p>
      <input type="text" placeholder="Your answer" />
    </div>
  );
}
