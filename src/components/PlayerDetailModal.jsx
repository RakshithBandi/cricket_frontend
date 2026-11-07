import React from 'react';
import { IconClose, IconEdit, IconTrash, IconBat, IconBall, IconWicket, IconShield } from './Icons';

export function PlayerDetailModal({ player, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !player) return null;

  const initials = `${player.first_name?.[0] || ''}${player.last_name?.[0] || ''}`.toUpperCase();
  const avatarBg = player.avatar_color || '#0ea5e9';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', background: 'linear-gradient(180deg, #131b2e 0%, #0d1220 100%)' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', fontWeight: 700 }}>
              Official Player Profile
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <IconClose size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '32px' }}>
          {/* Header Card Profile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderRadius: '16px',
            background: `radial-gradient(circle at 10% 20%, ${avatarBg}22 0%, rgba(0,0,0,0.5) 100%)`,
            border: `1px solid ${avatarBg}44`,
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              {player.photo_display_url ? (
                <img 
                  src={player.photo_display_url} 
                  alt={player.full_name} 
                  style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${avatarBg}` }} 
                />
              ) : (
                <div style={{ 
                  width: '76px', 
                  height: '76px', 
                  borderRadius: '50%', 
                  background: avatarBg, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#fff',
                  boxShadow: `0 8px 24px ${avatarBg}55`
                }}>
                  {initials}
                </div>
              )}

              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                  {player.first_name} {player.last_name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span className="style-tag" style={{ background: `${avatarBg}25`, borderColor: `${avatarBg}55`, color: '#fff', fontWeight: 700 }}>
                    {player.primary_role}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    📍 {player.city}, {player.state}
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${avatarBg} 0%, #000 100%)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <span style={{ fontSize: '26px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff', lineHeight: 1 }}>
                {player.jersey_number || '–'}
              </span>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
                JERSEY
              </span>
            </div>
          </div>

          {/* Key Cricket Attributes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Batting Style</div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>🏏 {player.batting_style}</div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Bowling Style</div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>⚡ {player.bowling_style}</div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Experience Level</div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>🏆 {player.experience_level}</div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Batting Position</div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>🎯 {player.preferred_batting_pos || 'Flexible'}</div>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            padding: '18px',
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.07)',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                {player.matches_played || 0}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Matches</div>
            </div>

            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#f87171' }}>
                {player.total_runs || 0}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Runs</div>
            </div>

            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fbbf24' }}>
                {player.highest_score || '0'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>High Score</div>
            </div>

            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#60a5fa' }}>
                {player.wickets_taken || 0}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Wickets (BB: {player.best_bowling || '–'})</div>
            </div>
          </div>

          {/* Bio */}
          {player.bio && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
                Scouting Notes & Bio
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '10px' }}>
                {player.bio}
              </p>
            </div>
          )}

          {/* Contact Details */}
          <div style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '18px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '24px'
          }}>
            <div>📧 <strong style={{ color: '#fff' }}>{player.email}</strong></div>
            <div>📞 <strong style={{ color: '#fff' }}>{player.phone}</strong></div>
            {player.date_of_birth && <div>🎂 DOB: <strong style={{ color: '#fff' }}>{player.date_of_birth}</strong></div>}
            <div>🛡️ Status: <span style={{ color: '#10b981', fontWeight: 700 }}>{player.status || 'Active'}</span></div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  onClose();
                  onEdit(player);
                }}
              >
                <IconEdit size={16} />
                <span>Edit Profile</span>
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => {
                  onClose();
                  onDelete(player);
                }}
              >
                <IconTrash size={16} />
                <span>Delete</span>
              </button>
            </div>

            <button className="btn btn-primary" onClick={handlePrint}>
              <span>Print / Save Player Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
