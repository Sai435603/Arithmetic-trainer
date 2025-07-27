import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import './Game.css';

export default function Game() {
  const { user, isSignedIn } = useUser();

  const inputRef = useRef(null);

  const [mode, setMode] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState({});
  const [input, setInput] = useState('');
  const [playTime, setPlayTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());
  const [startTime, setStartTime] = useState(Date.now());

  // Customization
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(10);
  const [operations, setOperations] = useState(['+']);
  const [timeLimit, setTimeLimit] = useState(60);

  // Generate a new problem
  const generateProblem = () => {
    const a = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    const b = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    const op = operations[Math.floor(Math.random() * operations.length)];
    let ans = op === '+' ? a + b
             : op === '-' ? a - b
             : op === '×' ? a * b
             : a / b;
    setProblem({ q: `${a} ${op} ${b}`, ans });
    setInput('');
  };

  // Initialize when mode or settings change
  useEffect(() => {
    if (!mode || mode === 'versus') return;
    setScore(0);
    setLevel(1);
    setLives(mode === 'progressive' ? 1 : 3);
    setTimeLeft(timeLimit);
    setPlayTime(0);
    const now = Date.now();
    setStartTime(now);
    setLastTick(now);
    generateProblem();

    // focus input on start
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [mode, minRange, maxRange, operations, timeLimit]);

  // Timer effect for timed, survival & progressive modes
  useEffect(() => {
    if (!mode || !['timed', 'survival', 'progressive'].includes(mode)) return;
    if (mode === 'timed' && timeLeft <= 0) return;
    if ((mode === 'survival' || mode === 'progressive') && lives <= 0) return;
    const id = setTimeout(() => {
      setTimeLeft(t => t - 1);
      const now = Date.now();
      setPlayTime(pt => pt + Math.floor((now - lastTick) / 1000));
      setLastTick(now);
    }, 1000);
    return () => clearTimeout(id);
  }, [timeLeft, mode, lives, lastTick]);

  const handleSubmit = () => {
    if (parseFloat(input) === problem.ans) {
      setScore(s => s + 1);
      if (mode === 'progressive') setLevel(l => l + 1);
      generateProblem();
    } else if (mode === 'survival' || mode === 'progressive') {
      setLives(l => {
        const newLives = l - 1;
        if (newLives > 0) generateProblem();
        return newLives;
      });
    }
    // always refocus input
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const resetGame = () => setMode(null);

  // Mode selection screen
  if (!mode) {
    return (
      <div className="game-container mode-select">
        <h2>Select Game Mode</h2>
        <button className="btn" onClick={() => setMode('timed')}>🕐 Timed Mode</button>
        <button className="btn" onClick={() => setMode('survival')}>🎯 Survival Mode</button>
        <button className="btn" onClick={() => setMode('progressive')}>📈 Progressive Mode</button>
        <button className="btn" onClick={() => setMode('versus')}>👥 Versus Mode</button>
        <div className="customization">
          <h3>Customize</h3>
          <label>Min Range: <input type="number" value={minRange} onChange={e => setMinRange(+e.target.value)} min={1}/></label>
          <label>Max Range: <input type="number" value={maxRange} onChange={e => setMaxRange(+e.target.value)} min={1}/></label>
          <div className="select-options">
            {['+', '-', '×', '÷'].map(op => (
              <label key={op}>
                <input type="checkbox" value={op} checked={operations.includes(op)}
                  onChange={e => {
                    const v = e.target.value;
                    setOperations(ops => ops.includes(v) ? ops.filter(x => x !== v) : [...ops, v]);
                  }} />
                {op}
              </label>
            ))}
          </div>
          <label>Time Limit: <input type="number" value={timeLimit} min={1}
            onChange={e => setTimeLimit(+e.target.value)} /></label>
        </div>
      </div>
    );
  }

  // Versus placeholder
  if (mode === 'versus') {
    return (
      <div className="game-container">
        <h2>👥 Versus Mode</h2>
        <p>Multiplayer mode coming soon!</p>
        <button className="btn" onClick={resetGame}>Back</button>
      </div>
    );
  }

  // Game Over screen
  if ((mode === 'timed' && timeLeft <= 0) || ((mode === 'survival' || mode === 'progressive') && lives <= 0)) {
    return (
      <div className="game-container">
        <h2>Game Over!</h2>
        <p>Score: {score}</p>
        {mode !== 'timed' && <p>Time: {playTime}s</p>}
        <button className="btn" onClick={resetGame}>Play Again</button>
      </div>
    );
  }

  // In-Game UI
  return (
    <div className="game-container">
      <h2 className="status">
        {mode === 'timed' && `⏱️ ${timeLeft}s`}
        {mode === 'survival' && `⏱️ ${timeLeft}s   ❤️ ${lives}`}
        {mode === 'progressive' && `📶 Level ${level}`}
      </h2>
      <h3>Score: {score}</h3>
      <p className="question">Solve: <strong>{problem.q}</strong></p>
      <input
        ref={inputRef}
        className="answer-input"
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="btn-group">
        <button className="btn" onClick={handleSubmit}>Submit</button>
        <button className="btn secondary" onClick={resetGame}>Quit</button>
      </div>
    </div>
  );
}
