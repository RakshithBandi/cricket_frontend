import React from 'react';

export function DashboardView({ playersCount, onOpenRegistration, onViewPlayers, onViewPlayersList, onViewAction }) {
  return (
    <main className="hero-section anim-entrance">
      <div className="season-pill">
        <span className="season-pulse-dot"></span>
        <span>HTPL Season 1 (2026) • Official Tournament Portal</span>
      </div>

      <h1 className="hero-main-title">
        Welcome to <span className="gradient-title-text">HTPL Season 1</span> Cricket League
      </h1>

      <p className="hero-description" style={{ fontSize: '18px', fontWeight: 600, color: '#334155', maxWidth: '820px' }}>
        Welcome H.T.Halli, Mallinamadugu, Jerrgepalli, Kalvepalli, and VaddaraHatti cricket players! Presenting an ultimate cricket entertainment league: HTPL Season 1.
      </p>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
        <button className="btn-htpl-primary" onClick={onOpenRegistration}>
          <span>🏏 Open Player Registration Form</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <button className="btn-htpl-secondary" onClick={onViewPlayers}>
          <span>Registration Table ({playersCount})</span>
        </button>

        <button className="btn-htpl-secondary" onClick={onViewAction} style={{ borderColor: '#f59e0b', color: '#b45309' }}>
          <span>⚡ Action (6 Teams)</span>
        </button>
      </div>

      {/* Tournament Highlights Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🏆
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className="stat-num">Season 1</div>
            <div className="stat-text">Premier Edition 2026</div>
          </div>
        </div>

        <div className="stat-item">
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🏏
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className="stat-num">{playersCount} Players</div>
            <div className="stat-text">Total Registered</div>
          </div>
        </div>

        <div className="stat-item">
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            ⚡
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className="stat-num">Mallinamadugu</div>
            <div className="stat-text">Panchayath League</div>
          </div>
        </div>

        {/* <div className="stat-item">
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#fffbeb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🛡️
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className="stat-num">Verified</div>
            <div className="stat-text">Official Tournament Portal</div>
          </div>
        </div> */}
      </div>

      {/* Animated Dashboard Cards */}
      <div className="cards-container">
        {/* Card 1: Player Registration */}
        <div className="dashboard-card anim-card-1" onClick={onOpenRegistration}>
          <div>
            <div className="card-top-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <h3 className="card-title">New Player Registration Form</h3>
            <p className="card-subtitle">
              Click to open the registration form and add cricketers with Name, Village, Role, and Phone number.
            </p>
          </div>
          <div className="card-action-link">
            <span>Click to Open Form</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        {/* Card 2: Registration Roster Table */}
        <div className="dashboard-card anim-card-2" onClick={onViewPlayers}>
          <div>
            <div className="card-top-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="card-title">Registration Table</h3>
            <p className="card-subtitle">
              Browse all registered players in the master table, search by name or village, and manage records.
            </p>
          </div>
          <div className="card-action-link" style={{ color: '#dc2626' }}>
            <span>View Registration Table</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        {/* Card 3: Players List (Role-Wise Pool) */}
        <div className="dashboard-card anim-card-3" onClick={onViewPlayersList} style={{ cursor: 'pointer' }}>
          <div>
            <div className="card-top-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
            </div>
            <h3 className="card-title">Players List (Role Pools)</h3>
            <p className="card-subtitle">
              View registered players categorized into Batsmen, Bowlers, and All-Rounders pools.
            </p>
          </div>
          <div className="card-action-link" style={{ color: '#10b981' }}>
            <span>Explore Players List</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        {/* Card 4: Action (6 Teams Auction) */}
        <div className="dashboard-card anim-card-4" onClick={onViewAction} style={{ cursor: 'pointer' }}>
          <div>
            <div className="card-top-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/>
                <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/>
                <path d="M4 3h16v6a7 7 0 0 1-14 0V3z"/>
                <path d="M12 16v5"/>
                <path d="M8 21h8"/>
              </svg>
            </div>
            <h3 className="card-title">Action (6 Teams Auction)</h3>
            <p className="card-subtitle">
              Display Team 1 to Team 6, open team section, set total amount, and buy players with amount subtractions.
            </p>
          </div>
          <div className="card-action-link" style={{ color: '#d97706' }}>
            <span>Open Action & Teams</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
