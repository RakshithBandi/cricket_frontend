import React, { useState } from 'react';

export function PlayerRegistrationModal({ isOpen, onClose, onSubmit, submitting }) {
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    role: 'All-Rounder', // 'Batsman' | 'Bowler' | 'All-Rounder'
    phone: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
      // Callback to reset form on success
      setFormData({
        name: '',
        village: '',
        role: 'All-Rounder',
        phone: '',
      });
    });
  };

  return (
    <div className="modal-backdrop-clean" onClick={onClose}>
      <div className="modal-card-clean" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-clean-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🏏
            </div>
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.2 }}>
                New Player Registration Form
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                HTPL Season 1 • Mallinamadugu Panchayath
              </p>
            </div>
          </div>

          <button 
            className="modal-close-clean"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleFormSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* 1. Name */}
            <div className="reg-field-group">
              <label className="reg-label">
                <span>Player Name *</span>
              </label>
              <input
                type="text"
                name="name"
                required
                autoFocus
                className="reg-input"
                placeholder="Enter player name (e.g. Ramesh Kumar)"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* 2. Village */}
            <div className="reg-field-group">
              <label className="reg-label">
                <span>Village *</span>
              </label>
              <input
                type="text"
                name="village"
                required
                className="reg-input"
                placeholder="Enter village (e.g. Mallinamadugu)"
                value={formData.village}
                onChange={handleChange}
              />
            </div>

            {/* 3. Status / Role: Bowler, Batsman, All-Rounder */}
            <div className="reg-field-group">
              <label className="reg-label">
                <span>Status / Role *</span>
              </label>
              <select
                name="role"
                className="reg-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
              </select>
            </div>

            {/* 4. Phone Number */}
            <div className="reg-field-group">
              <label className="reg-label">
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="reg-input"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: '10px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <button 
                type="button"
                className="btn-htpl-secondary"
                onClick={onClose}
                disabled={submitting}
              >
                <span>Cancel</span>
              </button>

              <button 
                type="submit" 
                className="btn-htpl-primary"
                disabled={submitting}
              >
                <span>{submitting ? 'Registering Player...' : '+ Register Player'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
