import React, { useState } from 'react';
import { api } from '../api/client';

const TEAM_CONFIG = {
  'Krishi Knight Riders': {
    color: '#6d28d9',
    lightBg: '#f5f3ff',
    border: '#ddd6fe',
    badge: 'KKR',
    icon: '⚔️',
    logo: '/kkr_logo.webp',
  },
  'Vegetable Titans': {
    color: '#0e7490',
    lightBg: '#ecfeff',
    border: '#a5f3fc',
    badge: 'VT',
    icon: '⚡',
    logo: '/vt_logo.webp',
  },
  'Red Chilli Blasters': {
    color: '#b91c1c',
    lightBg: '#fef2f2',
    border: '#fecaca',
    badge: 'RCB',
    icon: '🔥',
    logo: '/rcb_logo.webp',
  },
  'Silk Rising Heros': {
    color: '#ea580c',
    lightBg: '#fff7ed',
    border: '#fed7aa',
    badge: 'SRH',
    icon: '🦅',
    logo: '/srh_logo.webp',
  },
  'Mango Icons': {
    color: '#1d4ed8',
    lightBg: '#eff6ff',
    border: '#bfdbfe',
    badge: 'MI',
    icon: '🥭',
    logo: '/mango_icons.png',
  },
  'Groundnuts Super Kings': {
    color: '#d97706',
    lightBg: '#fffbeb',
    border: '#fde68a',
    badge: 'GSK',
    icon: '🦁',
    logo: '/gsk_logo.webp',
  },
  // Generic fallbacks if accessed by 'Team 1'..'Team 6'
  'Team 1': { color: '#6d28d9', lightBg: '#f5f3ff', border: '#ddd6fe', badge: 'KKR', icon: '⚔️', logo: '/kkr_logo.webp' },
  'Team 2': { color: '#0e7490', lightBg: '#ecfeff', border: '#a5f3fc', badge: 'VT', icon: '⚡', logo: '/vt_logo.webp' },
  'Team 3': { color: '#b91c1c', lightBg: '#fef2f2', border: '#fecaca', badge: 'RCB', icon: '🔥', logo: '/rcb_logo.webp' },
  'Team 4': { color: '#ea580c', lightBg: '#fff7ed', border: '#fed7aa', badge: 'SRH', icon: '🦅', logo: '/srh_logo.webp' },
  'Team 5': { color: '#1d4ed8', lightBg: '#eff6ff', border: '#bfdbfe', badge: 'MI', icon: '🥭', logo: '/mango_icons.png' },
  'Team 6': { color: '#d97706', lightBg: '#fffbeb', border: '#fde68a', badge: 'GSK', icon: '🦁', logo: '/gsk_logo.webp' },
};

export function ActionAuctionView({
  players,
  teams,
  onBuyPlayer,
  onReleasePlayer,
  onUpdateTeamBudget,
  onOpenRegistration,
}) {
  const [selectedTeamName, setSelectedTeamName] = useState(null);

  // Form states for adding/buying player inside selected team
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [playerAmount, setPlayerAmount] = useState('');
  const [customTotalBudget, setCustomTotalBudget] = useState('');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Format currency in Indian Rupees
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return '₹' + num.toLocaleString('en-IN');
  };

  // Find active team object
  const activeTeamObj =
    teams.find((t) => t.name === selectedTeamName) ||
    (selectedTeamName ? { name: selectedTeamName, total_budget: 100000 } : null);
  const activeTeamConfig = selectedTeamName
    ? TEAM_CONFIG[selectedTeamName] || { color: '#2563eb', lightBg: '#eff6ff', border: '#bfdbfe', badge: 'TM', icon: '🏏', logo: null }
    : null;

  // Calculate team financials
  const getTeamStats = (teamName, teamBudget) => {
    const teamPlayers = players.filter((p) => p.team === teamName);
    const totalSpent = teamPlayers.reduce((sum, p) => sum + (Number(p.bid_amount) || 0), 0);
    const totalAmount = Number(teamBudget) || 100000;
    const remainingBalance = totalAmount - totalSpent;
    const batsmenCount = teamPlayers.filter((p) => p.role === 'Batsman').length;
    const bowlerCount = teamPlayers.filter((p) => p.role === 'Bowler').length;
    const allRounderCount = teamPlayers.filter((p) => p.role === 'All-Rounder').length;

    return {
      totalAmount,
      totalSpent,
      remainingBalance,
      teamPlayers,
      batsmenCount,
      bowlerCount,
      allRounderCount,
      count: teamPlayers.length,
      pctSpent: totalAmount > 0 ? Math.min(100, Math.round((totalSpent / totalAmount) * 100)) : 0,
    };
  };

  // Available players (unassigned or not in current team)
  const availablePlayers = players.filter((p) => {
    const matchesSearch =
      !searchFilter.trim() ||
      (p.name || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.village || '').toLowerCase().includes(searchFilter.toLowerCase());
    const matchesRole = roleFilter === 'all' || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Handle player purchase form submit
  const handleBuySubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlayerId) {
      alert('Please select a player from the list');
      return;
    }

    const amount = Number(playerAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount spent on the player');
      return;
    }

    const stats = getTeamStats(selectedTeamName, activeTeamObj?.total_budget);
    if (amount > stats.remainingBalance) {
      const confirmExceed = window.confirm(
        `Warning: Amount (${formatCurrency(amount)}) exceeds remaining team balance (${formatCurrency(stats.remainingBalance)}). Do you want to proceed anyway?`
      );
      if (!confirmExceed) return;
    }

    // Call parent handler to update SQLite database
    await onBuyPlayer(Number(selectedPlayerId), selectedTeamName, amount);

    // Reset form fields
    setSelectedPlayerId('');
    setPlayerAmount('');
  };

  // Handle total budget change submit
  const handleBudgetUpdate = async (e) => {
    e.preventDefault();
    const newBudget = Number(customTotalBudget);
    if (isNaN(newBudget) || newBudget < 0) {
      alert('Please enter a valid positive number for total amount');
      return;
    }
    if (activeTeamObj) {
      await onUpdateTeamBudget(activeTeamObj.id, newBudget);
      setIsEditingBudget(false);
    }
  };

  // Quick amount buttons
  const addQuickAmount = (val) => {
    const current = Number(playerAmount) || 0;
    setPlayerAmount(String(current + val));
  };

  // Download Team PDF handler
  const handleDownloadTeamPdf = (teamId, teamName) => {
    try {
      api.downloadTeamPdf(teamId, teamName);
    } catch (err) {
      console.error(err);
      const url = teamId ? api.getTeamPdfUrl(teamId) : api.getTeamPdfByNameUrl(teamName);
      window.open(url, '_blank');
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: DEDICATED SINGLE TEAM SECTION
  // -------------------------------------------------------------
  if (selectedTeamName && activeTeamObj) {
    const stats = getTeamStats(selectedTeamName, activeTeamObj.total_budget);
    const selectedPlayerDetails = players.find((p) => String(p.id) === String(selectedPlayerId));
    const projectedRemaining = stats.remainingBalance - (Number(playerAmount) || 0);

    return (
      <main className="team-auction-view-container anim-entrance">
        {/* Top Back Navigation Bar */}
        <div className="auction-nav-bar">
          <button
            type="button"
            className="btn-back-teams"
            onClick={() => {
              setSelectedTeamName(null);
              setSelectedPlayerId('');
              setPlayerAmount('');
              setIsEditingBudget(false);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to All 6 Teams</span>
          </button>

          <div className="team-header-identity">
            <div
              className="team-dedicated-logo-badge"
              style={{
                background: activeTeamConfig.lightBg,
                borderColor: activeTeamConfig.border,
              }}
            >
              {activeTeamConfig.logo ? (
                <img
                  src={activeTeamConfig.logo}
                  alt={`${selectedTeamName} Logo`}
                  className="team-dedicated-logo-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement.querySelector('.dedicated-fallback-icon');
                    if (fallback) fallback.style.display = 'inline-flex';
                  }}
                />
              ) : null}
              <span
                className="dedicated-fallback-icon"
                style={{
                  display: activeTeamConfig.logo ? 'none' : 'inline-flex',
                  color: activeTeamConfig.color,
                  fontWeight: 900,
                  fontSize: '18px',
                }}
              >
                {activeTeamConfig.icon} {activeTeamConfig.badge}
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 className="team-title-heading" style={{ color: activeTeamConfig.color }}>
                  {selectedTeamName}
                </h2>
                <span
                  className="team-badge-tag"
                  style={{
                    background: activeTeamConfig.lightBg,
                    color: activeTeamConfig.color,
                    border: `1.5px solid ${activeTeamConfig.border}`,
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '6px',
                  }}
                >
                  {activeTeamConfig.badge}
                </span>
              </div>
              <span className="team-subtitle">
                HTPL Season 1 • Official Auction Room
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn-download-pdf-main"
            onClick={() => handleDownloadTeamPdf(activeTeamObj.id, selectedTeamName)}
            title={`Download ${selectedTeamName} PDF players roster`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="12" y2="18"/>
              <line x1="15" y1="15" x2="12" y2="18"/>
            </svg>
            <span>📄 Download {selectedTeamName} PDF</span>
          </button>
        </div>

        {/* FINANCIAL OVERVIEW STATS CARDS */}
        <div className="budget-stats-grid">
          {/* Card 1: Total Amount / Purse */}
          <div className="budget-stat-card" style={{ borderTop: `4px solid ${activeTeamConfig.color}` }}>
            <div className="budget-stat-header">
              <span className="budget-stat-label">Total Amount (Purse)</span>
              <button
                type="button"
                className="btn-edit-purse"
                onClick={() => {
                  setCustomTotalBudget(String(stats.totalAmount));
                  setIsEditingBudget(!isEditingBudget);
                }}
              >
                {isEditingBudget ? 'Cancel' : '⚙️ Set Amount'}
              </button>
            </div>

            {isEditingBudget ? (
              <form onSubmit={handleBudgetUpdate} style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    className="budget-input-field"
                    value={customTotalBudget}
                    onChange={(e) => setCustomTotalBudget(e.target.value)}
                    placeholder="Enter total amount"
                    min="0"
                    required
                  />
                  <button type="submit" className="btn-htpl-primary" style={{ padding: '8px 14px', fontSize: '13px' }}>
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="budget-stat-value" style={{ color: '#0f172a' }}>
                {formatCurrency(stats.totalAmount)}
              </div>
            )}
            <span className="budget-stat-hint">Allocated squad auction balance</span>
          </div>

          {/* Card 2: Total Amount Spent */}
          <div className="budget-stat-card" style={{ borderTop: '4px solid #ef4444' }}>
            <span className="budget-stat-label">Amount Spent on Players</span>
            <div className="budget-stat-value" style={{ color: '#dc2626' }}>
              {formatCurrency(stats.totalSpent)}
            </div>
            <span className="budget-stat-hint">
              Subtracted from total across {stats.count} player{stats.count === 1 ? '' : 's'}
            </span>
          </div>

          {/* Card 3: Remaining Balance */}
          <div
            className="budget-stat-card"
            style={{
              borderTop: `4px solid ${stats.remainingBalance >= 0 ? '#10b981' : '#ef4444'}`,
              background: stats.remainingBalance >= 0 ? '#f0fdf4' : '#fef2f2',
            }}
          >
            <span className="budget-stat-label">Remaining Balance</span>
            <div
              className="budget-stat-value"
              style={{ color: stats.remainingBalance >= 0 ? '#059669' : '#dc2626' }}
            >
              {formatCurrency(stats.remainingBalance)}
            </div>
            <span className="budget-stat-hint">
              {stats.remainingBalance >= 0 ? '✓ Available for next bids' : '⚠️ Budget exceeded!'}
            </span>
          </div>

          {/* Card 4: Squad Balance Summary */}
          <div className="budget-stat-card" style={{ borderTop: '4px solid #f59e0b' }}>
            <span className="budget-stat-label">Squad Strength</span>
            <div className="budget-stat-value" style={{ color: '#d97706' }}>
              {stats.count} <span style={{ fontSize: '15px', fontWeight: 600 }}>Players</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ color: '#dc2626' }}>🏏 {stats.batsmenCount} Bat</span>
              <span style={{ color: '#2563eb' }}>⚡ {stats.bowlerCount} Bowl</span>
              <span style={{ color: '#059669' }}>🛡️ {stats.allRounderCount} AR</span>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR FOR BUDGET USAGE */}
        <div className="budget-progress-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
            <span>Purse Utilized: {stats.pctSpent}%</span>
            <span>
              {formatCurrency(stats.totalSpent)} / {formatCurrency(stats.totalAmount)}
            </span>
          </div>
          <div className="budget-progress-track">
            <div
              className="budget-progress-fill"
              style={{
                width: `${stats.pctSpent}%`,
                background: stats.pctSpent > 90 ? '#ef4444' : stats.pctSpent > 70 ? '#f59e0b' : activeTeamConfig.color,
              }}
            ></div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            FORM: BUY PLAYER & SET AMOUNT
            ------------------------------------------------------------- */}
        <div className="buy-player-card">
          <div className="buy-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {activeTeamConfig.logo ? (
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    border: `2px solid ${activeTeamConfig.border}`,
                    background: '#ffffff',
                    padding: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={activeTeamConfig.logo}
                    alt={selectedTeamName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
                  />
                </div>
              ) : (
                <span style={{ fontSize: '26px' }}>🏏</span>
              )}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                  Buy Player for {selectedTeamName}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Select registered player, enter the purchase bid amount, and subtract from {selectedTeamName}'s total balance.
                </p>
              </div>
            </div>

            {/* <button
              type="button"
              className="btn-register-quick"
              onClick={onOpenRegistration}
            >
              + Register New Player
            </button> */}
          </div>

          <form onSubmit={handleBuySubmit} className="buy-form-body">
            <div className="buy-form-grid">
              {/* Field 1: Total Team Amount / Purse selector */}
              <div className="form-group-item">
                <label className="form-label-text">
                  <span>1. Team Total Amount (Purse)</span>
                </label>
                <div className="input-with-action">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    className="styled-form-input"
                    value={activeTeamObj.total_budget}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) {
                        onUpdateTeamBudget(activeTeamObj.id, val);
                      }
                    }}
                    placeholder="Total amount"
                    min="0"
                  />
                  <span className="input-helper-badge">Editable</span>
                </div>
                <span className="field-note">
                  Current total purse for {selectedTeamName}
                </span>
              </div>

              {/* Field 2: Select Player */}
              <div className="form-group-item">
                <label className="form-label-text">
                  <span>2. Select Player to Buy</span>
                  <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  className="styled-form-select"
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Cricketer from Registered Pool --</option>
                  {players.map((p) => {
                    const isAlreadyInThisTeam = p.team === selectedTeamName;
                    const isInOtherTeam = p.team && p.team !== selectedTeamName;
                    const statusText = isAlreadyInThisTeam
                      ? `[In ${selectedTeamName} - ₹${p.bid_amount}]`
                      : isInOtherTeam
                      ? `[In ${p.team}]`
                      : '[Available]';

                    return (
                      <option key={p.id} value={p.id}>
                        {statusText} {p.name} • {p.role} ({p.village || 'Mallinamadugu'})
                      </option>
                    );
                  })}
                </select>
                {selectedPlayerDetails && (
                  <div className="selected-player-preview">
                    <span>
                      Selected: <strong>{selectedPlayerDetails.name}</strong>
                    </span>
                    <span className="role-mini-pill">{selectedPlayerDetails.role}</span>
                    <span>📍 {selectedPlayerDetails.village}</span>
                    {selectedPlayerDetails.team && selectedPlayerDetails.team !== selectedTeamName && (
                      <span style={{ color: '#ef4444', fontWeight: 700 }}>
                        (Will transfer from {selectedPlayerDetails.team})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Field 3: Amount Spent on Player */}
              <div className="form-group-item">
                <label className="form-label-text">
                  <span>3. Amount Spent on this Player</span>
                  <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div className="input-with-action">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    className="styled-form-input"
                    value={playerAmount}
                    onChange={(e) => setPlayerAmount(e.target.value)}
                    placeholder="Enter amount (e.g. 5000)"
                    min="1"
                    required
                  />
                </div>

                {/* Quick Add Amount Buttons */}
                <div className="quick-amount-chips">
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Quick Add:</span>
                  <button type="button" onClick={() => addQuickAmount(1000)}>+1,000</button>
                  <button type="button" onClick={() => addQuickAmount(5000)}>+5,000</button>
                  <button type="button" onClick={() => addQuickAmount(10000)}>+10,000</button>
                  <button type="button" onClick={() => addQuickAmount(25000)}>+25,000</button>
                  <button type="button" onClick={() => setPlayerAmount('')} style={{ color: '#ef4444' }}>Clear</button>
                </div>
              </div>
            </div>

            {/* REAL-TIME CALCULATION STRIP */}
            <div className="calculation-strip">
              <div className="calc-item">
                <span className="calc-label">Total Purse:</span>
                <span className="calc-val">{formatCurrency(stats.totalAmount)}</span>
              </div>
              <span className="calc-operator">−</span>
              <div className="calc-item">
                <span className="calc-label">Already Spent:</span>
                <span className="calc-val" style={{ color: '#dc2626' }}>
                  {formatCurrency(stats.totalSpent)}
                </span>
              </div>
              <span className="calc-operator">−</span>
              <div className="calc-item">
                <span className="calc-label">This Player:</span>
                <span className="calc-val" style={{ color: '#2563eb' }}>
                  {formatCurrency(playerAmount || 0)}
                </span>
              </div>
              <span className="calc-operator">=</span>
              <div className="calc-item">
                <span className="calc-label">Remaining Balance:</span>
                <span
                  className="calc-val"
                  style={{
                    color: projectedRemaining >= 0 ? '#059669' : '#dc2626',
                    fontWeight: 900,
                  }}
                >
                  {formatCurrency(projectedRemaining)}
                </span>
              </div>

              <div style={{ marginLeft: 'auto' }}>
                <button
                  type="submit"
                  className="btn-htpl-primary"
                  style={{ padding: '12px 24px', fontSize: '15px' }}
                >
                  <span>🏏 Buy Player for {selectedTeamName}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* -------------------------------------------------------------
            BOUGHT PLAYERS TABLE
            "it should display that plaer name ,amount spend and role of that player"
            ------------------------------------------------------------- */}
        <div className="team-squad-table-card">
          <div className="squad-table-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {activeTeamConfig.logo && (
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    border: `1.5px solid ${activeTeamConfig.border}`,
                    background: '#ffffff',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={activeTeamConfig.logo}
                    alt={selectedTeamName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '7px' }}
                  />
                </div>
              )}
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a' }}>
                  🛡️ {selectedTeamName} Players ({stats.teamPlayers.length})
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  All players acquired by {selectedTeamName} with player name, amount spent, and player role.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div className="squad-quick-totals">
                <span>Total Spent: <strong>{formatCurrency(stats.totalSpent)}</strong></span>
                <span>Balance: <strong>{formatCurrency(stats.remainingBalance)}</strong></span>
              </div>

              <button
                type="button"
                className="btn-download-pdf-sm"
                onClick={() => handleDownloadTeamPdf(activeTeamObj.id, selectedTeamName)}
                title={`Download ${selectedTeamName} Players List as PDF`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>📄 Download PDF</span>
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="htpl-players-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Player Name</th>
                  <th>Role</th>
                  <th>Amount Spent</th>
                  <th>Village</th>
                  <th>Phone Number</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.teamPlayers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-table-state">
                      <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏏</div>
                      <div style={{ fontWeight: 800, fontSize: '17px', color: '#0f172a' }}>
                        No Players Bought Yet for {selectedTeamName}
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', maxWidth: '420px', margin: '6px auto 0' }}>
                        Use the form above to select a registered cricketer and enter the amount spent to add them to this team's squad.
                      </p>
                    </td>
                  </tr>
                ) : (
                  stats.teamPlayers.map((player, idx) => {
                    const roleBadgeClass =
                      player.role === 'Batsman'
                        ? 'role-badge-batsman'
                        : player.role === 'Bowler'
                        ? 'role-badge-bowler'
                        : 'role-badge-allrounder';

                    const roleIcon =
                      player.role === 'Batsman' ? '🏏' : player.role === 'Bowler' ? '⚡' : '🛡️';

                    return (
                      <tr key={player.id}>
                        <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                        <td>
                          <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>
                            {player.name}
                          </div>
                        </td>
                        <td>
                          <span className={`role-badge ${roleBadgeClass}`}>
                            <span>{roleIcon}</span>
                            <span>{player.role}</span>
                          </span>
                        </td>
                        <td>
                          <div className="amount-spent-badge">
                            {formatCurrency(player.bid_amount)}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: '#475569' }}>
                            📍 {player.village || 'Mallinamadugu'}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>
                            📞 {player.phone}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-release-player"
                            onClick={() => {
                              const confirmRelease = window.confirm(
                                `Release ${player.name} from ${selectedTeamName}? This will refund ${formatCurrency(player.bid_amount)} back to the team purse.`
                              );
                              if (confirmRelease) {
                                onReleasePlayer(player.id);
                              }
                            }}
                            title="Release player back to open pool & refund purse"
                          >
                            Release Player
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* SQUAD ROSTER FOOTER SUMMARY */}
          {stats.teamPlayers.length > 0 && (
            <div className="squad-roster-footer">
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span>
                  Squad Size: <strong>{stats.teamPlayers.length} Players</strong>
                </span>
                <span>•</span>
                <span>
                  Total Amount Spent: <strong style={{ color: '#dc2626' }}>{formatCurrency(stats.totalSpent)}</strong>
                </span>
                <span>•</span>
                <span>
                  Remaining Purse Balance:{' '}
                  <strong style={{ color: '#059669' }}>{formatCurrency(stats.remainingBalance)}</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ALL 6 TEAMS OVERVIEW CARDS
  // -------------------------------------------------------------
  const allTeamNames = ['Krishi Knight Riders', 'Vegetable Titans', 'Red Chilli Blasters', 'Silk Rising Heros', 'Mango Icons', 'Groundnuts Super Kings'];

  return (
    <main className="team-auction-view-container anim-entrance">
      {/* Top Header */}
      <div className="section-header-box">
        <div>
          <div className="season-pill" style={{ marginBottom: '8px' }}>
            <span>HTPL Season 1 • Official Auction</span>
          </div>
          <h2 className="section-title">⚡ Action: 6 Cricket Teams Auction Room</h2>
          <p className="section-subtitle">
            Click on any team to open its dedicated section, set total amount, buy players, and manage real-time purse balance.
          </p>
        </div>

        {/* <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn-htpl-primary" onClick={onOpenRegistration}>
            <span>+ Register New Player</span>
          </button>
        </div> */}
      </div>

      {/* 6 TEAMS GRID */}
      <div className="teams-cards-grid">
        {allTeamNames.map((teamName) => {
          const teamObj = teams.find((t) => t.name === teamName) || { name: teamName, total_budget: 100000 };
          const cfg = TEAM_CONFIG[teamName] || { color: '#2563eb', lightBg: '#eff6ff', border: '#bfdbfe', badge: 'TM', icon: '🏏' };
          const stats = getTeamStats(teamName, teamObj.total_budget);

          return (
            <div
              key={teamName}
              className="team-overview-card"
              onClick={() => setSelectedTeamName(teamName)}
              style={{
                borderTop: `6px solid ${cfg.color}`,
              }}
            >
              {/* Card Header */}
              <div className="team-card-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    className="team-card-emblem"
                    style={{
                      background: cfg.lightBg,
                      borderColor: cfg.border,
                    }}
                  >
                    {cfg.logo ? (
                      <img
                        src={cfg.logo}
                        alt={`${teamName} Logo`}
                        className="team-logo-img"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement.querySelector('.emblem-fallback-icon');
                          if (fallback) fallback.style.display = 'inline';
                        }}
                      />
                    ) : null}
                    <span
                      className="emblem-fallback-icon"
                      style={{
                        display: cfg.logo ? 'none' : 'inline',
                        fontSize: '24px',
                        lineHeight: 1,
                      }}
                    >
                      {cfg.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="team-card-title">{teamName}</h3>
                    <span className="team-badge-tag" style={{ background: cfg.lightBg, color: cfg.color }}>
                      {cfg.badge} • HTPL Franchise
                    </span>
                  </div>
                </div>

                <div className="team-players-count-badge">
                  <span>{stats.count}</span>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase' }}>Players</span>
                </div>
              </div>

              {/* Financial Box */}
              <div className="team-card-financials">
                <div className="financial-row">
                  <span className="fin-label">Total Amount:</span>
                  <span className="fin-val">{formatCurrency(stats.totalAmount)}</span>
                </div>
                <div className="financial-row">
                  <span className="fin-label">Amount Spent:</span>
                  <span className="fin-val" style={{ color: '#dc2626' }}>
                    {formatCurrency(stats.totalSpent)}
                  </span>
                </div>
                <div className="financial-row remaining-row">
                  <span className="fin-label">Remaining Balance:</span>
                  <span
                    className="fin-val"
                    style={{ color: stats.remainingBalance >= 0 ? '#059669' : '#dc2626', fontWeight: 900 }}
                  >
                    {formatCurrency(stats.remainingBalance)}
                  </span>
                </div>
              </div>

              {/* Budget Progress Bar */}
              <div style={{ margin: '14px 0 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                  <span>Purse Spent</span>
                  <span>{stats.pctSpent}%</span>
                </div>
                <div className="budget-progress-track">
                  <div
                    className="budget-progress-fill"
                    style={{
                      width: `${stats.pctSpent}%`,
                      background: stats.pctSpent > 90 ? '#ef4444' : cfg.color,
                    }}
                  ></div>
                </div>
              </div>

              {/* Squad Breakdown Pills */}
              <div className="team-squad-mini-pills">
                <span className="mini-role-pill" style={{ color: '#dc2626', background: '#fef2f2' }}>
                  🏏 {stats.batsmenCount} Batsmen
                </span>
                <span className="mini-role-pill" style={{ color: '#2563eb', background: '#eff6ff' }}>
                  ⚡ {stats.bowlerCount} Bowlers
                </span>
                <span className="mini-role-pill" style={{ color: '#059669', background: '#ecfdf5' }}>
                  🛡️ {stats.allRounderCount} All-Rounders
                </span>
              </div>

              {/* Actions Row */}
              <div className="team-card-actions-row">
                <button
                  type="button"
                  className="btn-card-download-pdf"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadTeamPdf(teamObj.id, teamName);
                  }}
                  title={`Download ${teamName} Players List PDF`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="12" y2="18"/>
                    <line x1="15" y1="15" x2="12" y2="18"/>
                  </svg>
                  <span>Download PDF</span>
                </button>

                <div className="team-card-enter-btn" style={{ color: cfg.color }}>
                  <span>Open {teamName} Section</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
