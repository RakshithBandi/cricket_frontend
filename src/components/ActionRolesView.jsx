import React, { useState } from 'react';

export function ActionRolesView({ players, onOpenRegistration, onBackToDashboard }) {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'Batsman' | 'Bowler' | 'All-Rounder'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter players by role based on registration
  const batsmen = players.filter(p => p.role === 'Batsman');
  const bowlers = players.filter(p => p.role === 'Bowler');
  const allrounders = players.filter(p => p.role === 'All-Rounder');

  const filterBySearch = (list) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(p => 
      (p.name || '').toLowerCase().includes(q) ||
      (p.village || '').toLowerCase().includes(q) ||
      (p.phone || '').toLowerCase().includes(q)
    );
  };

  const filteredBatsmen = filterBySearch(batsmen);
  const filteredBowlers = filterBySearch(bowlers);
  const filteredAllrounders = filterBySearch(allrounders);

  const renderPlayerTable = (playerList, roleTitle, roleIcon, emptyMessage, themeColor, badgeClass) => (
    <div className="role-category-card anim-card-1">
      <div className="role-card-header" style={{ borderLeft: `6px solid ${themeColor}` }}>
        <div className="role-title-group">
          <span style={{ fontSize: '24px' }}>{roleIcon}</span>
          <div>
            <h3 className="role-title-text">{roleTitle}</h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Players registered with role: <strong>{roleTitle.replace(' Category', '')}</strong>
            </span>
          </div>
        </div>

        <span className={`role-badge ${badgeClass}`}>
          <span>{roleIcon}</span>
          <span>{playerList.length} Registered</span>
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="htpl-players-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>#</th>
              <th>Player Name</th>
              <th>Village</th>
              <th>Registered Status</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {playerList.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table-state">
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{roleIcon}</div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--primary-navy)' }}>
                    No {roleTitle} Yet
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {emptyMessage}
                  </p>
                </td>
              </tr>
            ) : (
              playerList.map((player, idx) => (
                <tr key={player.id}>
                  <td style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {idx + 1}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '15px' }}>
                      {player.name}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#475569' }}>
                      📍 {player.village || 'Mallinamadugu'}
                    </span>
                  </td>
                  <td>
                    <span className={`role-badge ${badgeClass}`}>
                      <span>{roleIcon}</span>
                      <span>{player.role}</span>
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>
                      📞 {player.phone}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="roles-section-container anim-entrance">
      {/* Top Header */}
      <div className="section-header-box">
        <div>
          <div className="season-pill" style={{ marginBottom: '8px' }}>
            <span>HTPL Season 1 • Players List</span>
          </div>
          <h2 className="section-title">⚡ Players List: Role-Wise Players Pool</h2>
          <p className="section-subtitle">
            Players automatically organized by registration role: Batsmen, Bowlers, and All-Rounders.
          </p>
        </div>

        {/* <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            className="btn-htpl-primary"
            onClick={onOpenRegistration}
          >
            <span>+ Register New Player</span>
          </button>
        </div> */}
      </div>

      {/* 3 Role Summary Cards */}
      <div className="role-summary-grid">
        {/* Batsmen Summary */}
        <div 
          className={`role-summary-card ${selectedCategory === 'Batsman' ? 'active-role' : ''}`}
          onClick={() => setSelectedCategory(selectedCategory === 'Batsman' ? 'all' : 'Batsman')}
        >
          <div className="role-icon-avatar" style={{ background: '#fef2f2', color: '#dc2626' }}>
            🏏
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#dc2626' }}>
              Batsmen Pool
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 900, color: 'var(--primary-navy)' }}>
              {batsmen.length} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Players</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {selectedCategory === 'Batsman' ? 'Showing Batsmen only' : 'Click to filter'}
            </div>
          </div>
        </div>

        {/* Bowlers Summary */}
        <div 
          className={`role-summary-card ${selectedCategory === 'Bowler' ? 'active-role' : ''}`}
          onClick={() => setSelectedCategory(selectedCategory === 'Bowler' ? 'all' : 'Bowler')}
        >
          <div className="role-icon-avatar" style={{ background: '#eff6ff', color: '#2563eb' }}>
            ⚡
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb' }}>
              Bowlers Pool
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 900, color: 'var(--primary-navy)' }}>
              {bowlers.length} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Players</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {selectedCategory === 'Bowler' ? 'Showing Bowlers only' : 'Click to filter'}
            </div>
          </div>
        </div>

        {/* All-Rounders Summary */}
        <div 
          className={`role-summary-card ${selectedCategory === 'All-Rounder' ? 'active-role' : ''}`}
          onClick={() => setSelectedCategory(selectedCategory === 'All-Rounder' ? 'all' : 'All-Rounder')}
        >
          <div className="role-icon-avatar" style={{ background: '#ecfdf5', color: '#059669' }}>
            🛡️
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669' }}>
              All-Rounders Pool
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 900, color: 'var(--primary-navy)' }}>
              {allrounders.length} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Players</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {selectedCategory === 'All-Rounder' ? 'Showing All-Rounders only' : 'Click to filter'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        padding: '16px 20px',
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`view-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Roles ({players.length})
          </button>
          <button
            type="button"
            className={`view-tab ${selectedCategory === 'Batsman' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Batsman')}
          >
            🏏 Batsmen ({batsmen.length})
          </button>
          <button
            type="button"
            className={`view-tab ${selectedCategory === 'Bowler' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Bowler')}
          >
            ⚡ Bowlers ({bowlers.length})
          </button>
          <button
            type="button"
            className={`view-tab ${selectedCategory === 'All-Rounder' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All-Rounder')}
          >
            🛡️ All-Rounders ({allrounders.length})
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search within roles..."
            className="table-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY 1: BATSMEN */}
      {(selectedCategory === 'all' || selectedCategory === 'Batsman') && (
        renderPlayerTable(
          filteredBatsmen,
          'Batsmen Category',
          '🏏',
          'When a player is registered with role "Batsman", they will automatically appear here.',
          '#dc2626',
          'role-badge-batsman'
        )
      )}

      {/* CATEGORY 2: BOWLERS */}
      {(selectedCategory === 'all' || selectedCategory === 'Bowler') && (
        renderPlayerTable(
          filteredBowlers,
          'Bowlers Category',
          '⚡',
          'When a player is registered with role "Bowler", they will automatically appear here.',
          '#2563eb',
          'role-badge-bowler'
        )
      )}

      {/* CATEGORY 3: ALL-ROUNDERS */}
      {(selectedCategory === 'all' || selectedCategory === 'All-Rounder') && (
        renderPlayerTable(
          filteredAllrounders,
          'All-Rounders Category',
          '🛡️',
          'When a player is registered with role "All-Rounder", they will automatically appear here.',
          '#059669',
          'role-badge-allrounder'
        )
      )}
    </main>
  );
}
