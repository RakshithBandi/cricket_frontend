import React, { useState, useEffect } from 'react';
import { IconClose, IconCheck } from './Icons';

export function PlayerFormModal({ isOpen, onClose, onSubmit, initialPlayer }) {
  const isEditing = Boolean(initialPlayer && initialPlayer.id);

  const defaultFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    city: '',
    state: '',
    jersey_number: '',
    primary_role: 'Top-order Batter',
    batting_style: 'Right-hand bat',
    bowling_style: 'Right-arm medium',
    experience_level: 'Club / Turf',
    preferred_batting_pos: 'Middle Order (4-5)',
    matches_played: 0,
    total_runs: 0,
    highest_score: '0',
    wickets_taken: 0,
    best_bowling: '0/0',
    strike_rate: 0,
    economy_rate: 0,
    avatar_color: '#0ea5e9',
    photo_data: '',
    bio: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialPlayer) {
      setFormData({
        ...defaultFormData,
        ...initialPlayer,
        date_of_birth: initialPlayer.date_of_birth || '',
        jersey_number: initialPlayer.jersey_number !== null ? initialPlayer.jersey_number : '',
      });
      setPhotoPreview(initialPlayer.photo_display_url || initialPlayer.photo_data || null);
    } else {
      setFormData(defaultFormData);
      setPhotoPreview(null);
      setPhotoFile(null);
    }
    setErrorMessage('');
  }, [initialPlayer, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let payload;
      if (photoFile) {
        payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            payload.append(key, val);
          }
        });
        payload.append('photo', photoFile);
      } else {
        payload = { ...formData };
        if (payload.jersey_number === '') delete payload.jersey_number;
        if (!payload.date_of_birth) delete payload.date_of_birth;
      }

      await onSubmit(payload, initialPlayer?.id);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Error saving player registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const COLOR_PALETTE = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? `Edit Registration: ${formData.first_name} ${formData.last_name}` : '🏏 New Player Registration'}
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <IconClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {errorMessage && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              fontSize: '13px',
              marginBottom: '18px'
            }}>
              {errorMessage}
            </div>
          )}

          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '14px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            1. Personal Details
          </h4>
          <div className="form-grid" style={{ marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="first_name"
                className="form-input"
                required
                value={formData.first_name}
                onChange={handleChange}
                placeholder="e.g. Virat"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="last_name"
                className="form-input"
                required
                value={formData.last_name}
                onChange={handleChange}
                placeholder="e.g. Kohli"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="player@cricket.org"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                name="city"
                className="form-input"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
              />
            </div>

            <div className="form-group">
              <label className="form-label">State / Region *</label>
              <input
                type="text"
                name="state"
                className="form-input"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Jersey #</label>
              <input
                type="number"
                name="jersey_number"
                className="form-input"
                value={formData.jersey_number}
                onChange={handleChange}
                placeholder="e.g. 18"
                min="0"
                max="999"
              />
            </div>
          </div>

          <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '14px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            2. Cricket Role & Style
          </h4>
          <div className="form-grid" style={{ marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label">Primary Role *</label>
              <select name="primary_role" className="form-select" value={formData.primary_role} onChange={handleChange}>
                <option value="Top-order Batter">Top-order Batter</option>
                <option value="Middle-order Batter">Middle-order Batter</option>
                <option value="Wicketkeeper Batter">Wicketkeeper Batter</option>
                <option value="Batting All-Rounder">Batting All-Rounder</option>
                <option value="Bowling All-Rounder">Bowling All-Rounder</option>
                <option value="Fast Bowler">Fast Bowler</option>
                <option value="Spin Bowler">Spin Bowler</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Batting Style *</label>
              <select name="batting_style" className="form-select" value={formData.batting_style} onChange={handleChange}>
                <option value="Right-hand bat">Right-hand bat</option>
                <option value="Left-hand bat">Left-hand bat</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Bowling Style *</label>
              <select name="bowling_style" className="form-select" value={formData.bowling_style} onChange={handleChange}>
                <option value="Right-arm fast">Right-arm fast</option>
                <option value="Right-arm medium">Right-arm medium</option>
                <option value="Right-arm off-spin">Right-arm off-spin</option>
                <option value="Right-arm leg-spin">Right-arm leg-spin</option>
                <option value="Left-arm fast">Left-arm fast</option>
                <option value="Left-arm orthodox spin">Left-arm orthodox spin</option>
                <option value="Left-arm chinaman">Left-arm chinaman (unorthodox)</option>
                <option value="Non-bowler">None / Non-bowler</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Level *</label>
              <select name="experience_level" className="form-select" value={formData.experience_level} onChange={handleChange}>
                <option value="Gully / Street Cricket">Gully / Street Cricket</option>
                <option value="School / College">School / College</option>
                <option value="Club / Turf">Club / Turf</option>
                <option value="District Level">District Level</option>
                <option value="State / Professional">State / Professional</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Batting Slot</label>
              <select name="preferred_batting_pos" className="form-select" value={formData.preferred_batting_pos} onChange={handleChange}>
                <option value="Opener (1-2)">Opener (1-2)</option>
                <option value="Top Order (3)">Top Order (3)</option>
                <option value="Middle Order (4-5)">Middle Order (4-5)</option>
                <option value="Finisher (6-7)">Finisher (6-7)</option>
                <option value="Tailender (8-11)">Tailender (8-11)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Player Theme Color</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                {COLOR_PALETTE.map(color => (
                  <button
                    key={color}
                    type="button"
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: color,
                      border: formData.avatar_color === color ? '2px solid white' : 'none',
                      cursor: 'pointer',
                      transform: formData.avatar_color === color ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.15s ease'
                    }}
                    onClick={() => setFormData(prev => ({ ...prev, avatar_color: color }))}
                  />
                ))}
              </div>
            </div>
          </div>

          <h4 style={{ color: 'var(--accent-emerald)', marginBottom: '14px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            3. Career Statistics & Profile Photo
          </h4>
          <div className="form-grid" style={{ marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label">Matches Played</label>
              <input
                type="number"
                name="matches_played"
                className="form-input"
                value={formData.matches_played}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Runs Scored</label>
              <input
                type="number"
                name="total_runs"
                className="form-input"
                value={formData.total_runs}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Highest Score</label>
              <input
                type="text"
                name="highest_score"
                className="form-input"
                value={formData.highest_score}
                onChange={handleChange}
                placeholder="e.g. 102*"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Wickets Taken</label>
              <input
                type="number"
                name="wickets_taken"
                className="form-input"
                value={formData.wickets_taken}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Best Bowling Figures</label>
              <input
                type="text"
                name="best_bowling"
                className="form-input"
                value={formData.best_bowling}
                onChange={handleChange}
                placeholder="e.g. 4/18"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                className="form-input"
                style={{ padding: '8px' }}
                onChange={handlePhotoUpload}
              />
              {photoPreview && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <span style={{ fontSize: '12px', color: '#10b981' }}>Photo selected</span>
                </div>
              )}
            </div>

            <div className="form-group form-full">
              <label className="form-label">Player Bio / Key Strengths</label>
              <textarea
                name="bio"
                className="form-textarea"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Describe batting technique, special bowling variations, team leadership, tournament achievements..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <IconCheck size={18} />
              <span>{isSubmitting ? 'Submitting...' : (isEditing ? 'Save Changes' : 'Confirm Registration')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
