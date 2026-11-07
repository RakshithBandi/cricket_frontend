import React from 'react';
import { IconEdit, IconTrash, IconBat, IconBall, IconWicket, IconShield } from './Icons';

export function PlayerCard({ player, onSelect, onEdit, onDelete }) {
  const getRoleClass = (role) => {
    if (!role) return 'role-batter';
    if (role.includes('Batter')) return 'role-batter';
    if (role.includes('Bowler')) return 'role-bowler';
    if (role.includes('All-Rounder')) return 'role-allrounder';
    if (role.includes('Wicketkeeper')) return 'role-keeper';
    return 'role-batter';
  };

  const getRoleIcon = (role) => {
    if (!role) return <IconBat size={14} />;
    if (role.includes('Batter')) return <IconBat size={14} />;
    if (role.includes('Bowler')) return <IconBall size={14} />;
    if (role.includes('All-Rounder')) return <IconWicket size={14} />;
    if (role.includes('Wicketkeeper')) return <IconShield size={14} />;
    return <IconBat size={14} />;
  };

  const initials = `${player.first_name?.[0] || ''}${player.last_name?.[0] || ''}`.toUpperCase();
  const avatarBg = player.avatar_color || '#0ea5e9';

  return (
    <div className="player-card" onClick={() => onSelect(player)}>
      <div className="player-card-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {player.photo_display_url ? (
            <img 
              src={player.photo_display_url} 
              alt={player.full_name} 
              className="player-avatar"
            />
          ) : (
            <div className="player-avatar" style={{ background: avatarBg }}>
              {initials}
            </div>
          )}

          <div className="player-info-meta">
            <h3 className="player-name">{player.first_name} {player.last_name}</h3>
            <div className={`player-role-pill ${getRoleClass(player.primary_role)}`}>
              {getRoleIcon(player.primary_role)}
              <span>{player.primary_role}</span>
            </div>
          </div>
        </div>

        <div className="jersey-badge" style={{ background: `linear-gradient(135deg, ${avatarBg} 0%, #0f172a 100%)` }}>
          <span>{player.jersey_number || '–'}</span>
          <span className="jersey-label">No.</span>
        </div>
      </div>

      <div className="player-stats-bar">
        <div className="mini-stat">
          <div className="mini-stat-value">{player.matches_played || 0}</div>
          <div className="mini-stat-label">Matches</div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-value" style={{ color: '#f87171' }}>{player.total_runs || 0}</div>
          <div className="mini-stat-label">Runs (HS: {player.highest_score || '0'})</div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-value" style={{ color: '#60a5fa' }}>{player.wickets_taken || 0}</div>
          <div className="mini-stat-label">Wickets (B: {player.best_bowling || '0/0'})</div>
        </div>
      </div>

      <div className="player-card-body">
        <div className="player-styles-row">
          <span className="style-tag">🏏 {player.batting_style}</span>
          {player.bowling_style !== 'None / Non-bowler' && player.bowling_style !== 'Non-bowler' && (
            <span className="style-tag">⚡ {player.bowling_style}</span>
          )}
          <span className="style-tag">📍 {player.city || 'Local'}</span>
        </div>

        {player.bio && (
          <p className="player-bio-snippet">{player.bio}</p>
        )}
      </div>

      <div className="player-card-actions" onClick={(e) => e.stopPropagation()}>
        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
          {player.experience_level || 'Club'}
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-secondary btn-icon" 
            title="Edit Player Profile"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(player);
            }}
          >
            <IconEdit size={16} />
          </button>
          <button 
            className="btn btn-danger btn-icon" 
            title="Delete Registration"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(player);
            }}
          >
            <IconTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
