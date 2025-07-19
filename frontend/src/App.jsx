import React, { useState } from 'react';
import SettingsModal from './components/SettingsModal';
import GameDisplay from './components/GameDisplay';
import StatsCard from './components/StatsCard';
import StartSection from './components/StartSection';

function App() {
  const [settingsVisible, setSettingsVisible] = useState(true);
  const [gameSettings, setGameSettings] = useState({
    operations: { add: true, sub: true, mul: true, div: true },
    rangeAddSub: { min: 1, max: 50 },
    rangeMulDiv: { min: 1, max: 15 },
    duration: 120
  });
  const [gameState, setGameState] = useState({
    score: 0,
    timeLeft: gameSettings.duration,
    accuracy: 0,
    streak: 0
  });

  const toggleSettings = () => setSettingsVisible(v => !v);
  const handleSettingsSave = (newSettings) => {
    setGameSettings(newSettings);
    setGameState(s => ({ ...s, timeLeft: newSettings.duration }));
    setSettingsVisible(false);
  };

  return (
    <div className="app">
      <header>
        <h1>Arithmetic Trainer</h1>
        <p>Master your mental math skills</p>
      </header>

      {settingsVisible && (
        <SettingsModal
          settings={gameSettings}
          onSave={handleSettingsSave}
          onClose={toggleSettings}
        />
      )}

      <div className="stats-panel">
        <StatsCard icon="🏆" label="Score" value={gameState.score} />
        <StatsCard icon="⏱️" label="Time Left" value={`${gameState.timeLeft}s`} />
        <StatsCard icon="🎯" label="Accuracy" value={`${gameState.accuracy}%`} />
        <StatsCard icon="🔥" label="Streak" value={gameState.streak} />
      </div>

      <StartSection
        onToggleSettings={toggleSettings}
        onStart={() => alert('Start Game! (hook up your logic here)')}
      />
      
      <GameDisplay />
    </div>
  );
}

export default App;
