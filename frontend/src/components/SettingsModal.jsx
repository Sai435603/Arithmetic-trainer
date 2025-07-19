import React, { useState } from 'react';
import './SettingsModal.css';

export default function SettingsModal({ settings, onSave, onClose }) {
  const [local, setLocal] = useState(settings);

  const handleCheckbox = (op) => {
    setLocal(l => ({
      ...l,
      operations: { ...l.operations, [op]: !l.operations[op] }
    }));
  };

  const handleChange = (group, field, value) => {
    setLocal(l => ({
      ...l,
      [group]: { ...l[group], [field]: Number(value) }
    }));
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>Game Settings</h2>

        <fieldset>
          <legend>Select Operations:</legend>
          {['add','sub','mul','div'].map(op => (
            <label key={op}>
              <input
                type="checkbox"
                checked={local.operations[op]}
                onChange={() => handleCheckbox(op)}
              />
              {op === 'add' ? 'Addition (+)' :
               op === 'sub' ? 'Subtraction (−)' :
               op === 'mul' ? 'Multiplication (×)' :
               'Division (÷)'}
            </label>
          ))}
        </fieldset>

        <div className="ranges">
          <div>
            <h4>Number Range (Addition/Subtraction):</h4>
            <input
              type="number"
              value={local.rangeAddSub.min}
              onChange={e => handleChange('rangeAddSub','min', e.target.value)}
            />
            <input
              type="number"
              value={local.rangeAddSub.max}
              onChange={e => handleChange('rangeAddSub','max', e.target.value)}
            />
          </div>
          <div>
            <h4>Number Range (Multiplication/Division):</h4>
            <input
              type="number"
              value={local.rangeMulDiv.min}
              onChange={e => handleChange('rangeMulDiv','min', e.target.value)}
            />
            <input
              type="number"
              value={local.rangeMulDiv.max}
              onChange={e => handleChange('rangeMulDiv','max', e.target.value)}
            />
          </div>
        </div>

        <div className="durations">
          <h4>Game Duration (seconds):</h4>
          {[60,120,180,300].map(sec => (
            <button
              key={sec}
              className={local.duration === sec ? 'active' : ''}
              onClick={() => setLocal(l => ({ ...l, duration: sec }))}
            >
              {sec/60}m
            </button>
          ))}
        </div>

        <button className="save" onClick={() => onSave(local)}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
