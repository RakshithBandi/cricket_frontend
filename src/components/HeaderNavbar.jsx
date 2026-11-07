import React, { useState } from 'react';

export function HeaderNavbar({ activeTab, setActiveTab, playersCount, onOpenRegistration }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="htpl-navbar anim-nav">
      <div className="htpl-brand" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
        <div className="htpl-logo-badge anim-float">
          {!logoError ? (
            <img 
              src="/logo_new.png" 
              alt="HTPL Logo" 
              onError={() => setLogoError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px', padding: '3px' }}
            />
          ) : (
            <svg className="anim-ball-spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#dc2626" />
              <path d="M5 8 Q12 12 5 16" stroke="#fef08a" strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
              <path d="M19 8 Q12 12 19 16" stroke="#fef08a" strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
            </svg>
          )}
        </div>
        <div className="htpl-title-group">
          <h2>HTPL LEAGUE</h2>
          <span>• Season 1</span>
        </div>
      </div>

      <nav className="htpl-nav-links">
        <button 
          className={`htpl-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`htpl-nav-item ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          Registration ({playersCount})
        </button>
        <button 
          className={`htpl-nav-item ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          Players List
        </button>
        <button 
          className={`htpl-nav-item ${activeTab === 'action' ? 'active' : ''}`}
          onClick={() => setActiveTab('action')}
        >
          Action
        </button>
      </nav>

      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          className="btn-htpl-primary"
          onClick={onOpenRegistration}
        >
          <span>+ Register Player</span>
        </button>
      </div> */}
    </header>
  );
}
