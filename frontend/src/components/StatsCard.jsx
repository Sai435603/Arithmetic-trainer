import React from 'react';
import './StatsCard.css';

export default function StatsCard({ icon, label, value }) {
  return (
    <div className="stats-card">
      <div className="icon">{icon}</div>
      <div className="info">
        <div className="value">{value}</div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
}
