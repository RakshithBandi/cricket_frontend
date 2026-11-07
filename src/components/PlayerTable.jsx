import React from 'react';
import { IconEdit, IconTrash } from './Icons';

export function PlayerTable({ players, onSelect, onEdit, onDelete }) {
  return (
    <div className="glass-panel table-responsive">
      <table className="players-table">
        <thead>
          <tr>
            <th>Jersey #</th>
            <th>Player Name</th>
            <th>Role</th>
            <th>Batting Style</th>
            <th>Bowling Style</th>
            <th>Experience</th>
            <th>Matches</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(p => (
            <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(p)}>
              <td>
                <span style={{ 
                  fontWeight: 800, 
                  fontFamily: 'var(--font-heading)', 
                  color: p.avatar_color || '#38bdf8' 
                }}>
                  #{p.jersey_number || '–'}
                </span>
              </td>
              <td>
                <div style={{ fontWeight: 600 }}>{p.first_name} {p.last_name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{p.email}</div>
              </td>
              <td>
                <span className="style-tag" style={{ color: '#f1f5f9' }}>{p.primary_role}</span>
              </td>
              <td>{p.batting_style}</td>
              <td>{p.bowling_style}</td>
              <td>{p.experience_level}</td>
              <td style={{ fontWeight: 600 }}>{p.matches_played}</td>
              <td style={{ fontWeight: 700, color: '#f87171' }}>{p.total_runs}</td>
              <td style={{ fontWeight: 700, color: '#60a5fa' }}>{p.wickets_taken}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    className="btn btn-secondary btn-icon" 
                    style={{ width: '30px', height: '30px' }}
                    title="Edit"
                    onClick={() => onEdit(p)}
                  >
                    <IconEdit size={14} />
                  </button>
                  <button 
                    className="btn btn-danger btn-icon" 
                    style={{ width: '30px', height: '30px' }}
                    title="Delete"
                    onClick={() => onDelete(p)}
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
