import { useState } from 'react';
import DigitalIDCard from './DigitalIDCard';
import StudentForm from './StudentForm';
import { downloadIDCard } from '../utils/downloadIDCard';

const THEMES = [
  { id: 'forest', label: 'Forest', color: '#2f7046' },
  { id: 'midnight', label: 'Midnight', color: '#141d17' },
  { id: 'classic', label: 'Classic', color: '#f0f4ef' },
];

const VIEWS = ['Front', 'Back', 'Both'];

export default function StudioSection({ data, onChange, onClear, onLoadSample }) {
  const [theme, setTheme] = useState('forest');
  const [view, setView] = useState('Front');
  const [downloadMessage, setDownloadMessage] = useState('');

  const handleDownload = async () => {
    try {
      await downloadIDCard(data, theme, view.toLowerCase());
      setDownloadMessage('Your card image has been downloaded.');
    } catch {
      setDownloadMessage('The card image could not be created. Please try again.');
    }
  };

  return (
    <div className="builder-grid">
      <section className="preview-panel" aria-labelledby="preview-heading">
        <div className="preview-panel__header">
          <div>
            <p className="panel-kicker">01 / LIVE PREVIEW</p>
            <h2 id="preview-heading">Your digital ID</h2>
          </div>
          <button className="sample-button" type="button" onClick={onLoadSample}>Use sample</button>
        </div>

        <div className="view-switch" role="group" aria-label="Card side to preview">
          {VIEWS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={view === item}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="card-stage" id="student-card">
          <DigitalIDCard data={data} theme={theme} view={view.toLowerCase()} />
        </div>

        <div className="preview-tools">
          <div className="theme-picker" role="group" aria-label="Card color">
            <span className="theme-picker__label">CARD COLOR</span>
            <div className="theme-picker__options">
              {THEMES.map((option) => (
                <button
                  key={option.id}
                  className="theme-option"
                  type="button"
                  aria-label={`${option.label} card color`}
                  aria-pressed={theme === option.id}
                  title={option.label}
                  onClick={() => setTheme(option.id)}
                >
                  <span style={{ backgroundColor: option.color }} />
                  <span className="theme-option__name">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="preview-note">Preview only. Not an issued credential.</p>
        </div>

        <button className="download-button" type="button" onClick={handleDownload}>
          <span className="download-button__icon" aria-hidden="true">&#8595;</span>
          Download ID Card
        </button>
        <p className="download-status" role="status" aria-live="polite">{downloadMessage}</p>
      </section>

      <section className="editor-panel" aria-labelledby="editor-heading">
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">02 / DETAILS</p>
            <h2 id="editor-heading">Student details</h2>
          </div>
        </div>
        <StudentForm data={data} onChange={onChange} onClear={onClear} />
      </section>
    </div>
  );
}
