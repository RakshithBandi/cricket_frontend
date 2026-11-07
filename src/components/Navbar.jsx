import React from 'react';
import { IconPlus, IconDownload, IconSparkles } from './Icons';

export function Navbar({ onOpenRegister, onSeedData, onExportCsv, totalPlayers }) {
  return (
    <header className="app-header">
      <div className="nav-content">
        <div className="brand-badge">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#ef4444" />
              <path d="M5 8 Q12 12 5 16" stroke="#fef08a" strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
              <path d="M19 8 Q12 12 19 16" stroke="#fef08a" strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">HTPL Cricket</h1>
            <div className="brand-tagline">Cricket Player Registration & Roster</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {totalPlayers === 0 && (
            <button className="btn btn-secondary" onClick={onSeedData} title="Load sample cricket squad">
              <IconSparkles size={16} />
              <span>Load Sample Squad</span>
            </button>
          )}

          <a 
            href={onExportCsv()} 
            download="cricket_players_roster.csv" 
            className="btn btn-secondary"
            title="Download complete players CSV"
          >
            <IconDownload size={16} />
            <span>Export CSV</span>
          </a>

          <button className="btn btn-primary" onClick={onOpenRegister}>
            <IconPlus size={18} />
            <span>Register Player</span>
          </button>
        </div>
      </div>
    </header>
  );
}
