import React from 'react';

export function PlayersTableView({ 
  players, 
  loading, 
  searchQuery, 
  setSearchQuery, 
  onOpenRegistration, 
  onBackToDashboard, 
  onDeletePlayer 
}) {
  const filteredPlayers = players.filter(p => {
    const q = searchQuery.toLowerCase();
    const nameMatch = (p.name || '').toLowerCase().includes(q);
    const villageMatch = (p.village || '').toLowerCase().includes(q);
    const roleMatch = (p.role || '').toLowerCase().includes(q);
    const phoneMatch = (p.phone || '').toLowerCase().includes(q);
    return nameMatch || villageMatch || roleMatch || phoneMatch;
  });

  const getRoleBadgeClass = (role) => {
    if (role === 'Batsman') return 'role-badge-batsman';
    if (role === 'Bowler') return 'role-badge-bowler';
    return 'role-badge-allrounder';
  };

  const getRoleIcon = (role) => {
    if (role === 'Batsman') return '🏏';
    if (role === 'Bowler') return '⚡';
    return '🛡️';
  };

  return (
    <main className="players-page-container anim-entrance">
      <div className="section-header-box">
        <div>
          <div className="season-pill" style={{ marginBottom: '8px' }}>
            <span>Mallinamadugu Panchayath</span>
          </div>
          <h2 className="section-title">🏏 Players Registration</h2>
          <p className="section-subtitle">
            Official tournament player directory for HTPL Season 1.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Button to open the registration form */}
          <button 
            className="btn-htpl-primary"
            onClick={onOpenRegistration}
          >
            <span>+ New Player Registration Form</span>
          </button>
        </div>
      </div>

      {/* PLAYERS LIST IN TABLE FORM */}
      <div className="table-card-wrapper">
        <div className="table-header-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="table-count-badge">
              Registered Players List ({filteredPlayers.length})
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name, village, role, phone..."
              className="table-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="htpl-players-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>Name</th>
                <th>Village</th>
                <th>Status</th>
                <th>Phone Number</th>
                <th style={{ textAlign: 'right', width: '90px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="empty-table-state">
                    Loading players list...
                  </td>
                </tr>
              ) : filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-state">
                    <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏏</div>
                    <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--primary-navy)' }}>
                      No Players Registered Yet
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '20px' }}>
                      Click the button below to open the registration form and add players from Mallinamadugu Panchayath!
                    </p>
                    <button 
                      className="btn-htpl-primary"
                      onClick={onOpenRegistration}
                    >
                      <span>+ Open Registration Form</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((player, idx) => (
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
                        📍 {player.village || '—'}
                      </span>
                    </td>
                    <td>
                      <span className={`role-badge ${getRoleBadgeClass(player.role)}`}>
                        <span>{getRoleIcon(player.role)}</span>
                        <span>{player.role}</span>
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>
                        📞 {player.phone}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="action-btn-del"
                        title="Remove player"
                        onClick={() => onDeletePlayer(player)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
