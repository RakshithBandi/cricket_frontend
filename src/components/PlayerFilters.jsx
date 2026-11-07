import React from 'react';
import { IconSearch } from './Icons';

export function PlayerFilters({ filters, setFilters, viewMode, setViewMode }) {
  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="glass-panel controls-bar">
      <div className="search-input-wrapper">
        <IconSearch size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by player name, email, city, jersey #..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <select 
          className="filter-select"
          value={filters.role || ''}
          onChange={(e) => handleChange('role', e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Top-order Batter">Top-order Batter</option>
          <option value="Middle-order Batter">Middle-order Batter</option>
          <option value="Wicketkeeper Batter">Wicketkeeper Batter</option>
          <option value="Batting All-Rounder">Batting All-Rounder</option>
          <option value="Bowling All-Rounder">Bowling All-Rounder</option>
          <option value="Fast Bowler">Fast Bowler</option>
          <option value="Spin Bowler">Spin Bowler</option>
        </select>

        <select 
          className="filter-select"
          value={filters.batting_style || ''}
          onChange={(e) => handleChange('batting_style', e.target.value)}
        >
          <option value="">Batting Style</option>
          <option value="Right-hand bat">Right-hand bat</option>
          <option value="Left-hand bat">Left-hand bat</option>
        </select>

        <select 
          className="filter-select"
          value={filters.experience || ''}
          onChange={(e) => handleChange('experience', e.target.value)}
        >
          <option value="">Experience Level</option>
          <option value="Gully / Street Cricket">Gully / Street Cricket</option>
          <option value="School / College">School / College</option>
          <option value="Club / Turf">Club / Turf</option>
          <option value="District Level">District Level</option>
          <option value="State / Professional">State / Professional</option>
        </select>

        <select 
          className="filter-select"
          value={filters.sort_by || '-created_at'}
          onChange={(e) => handleChange('sort_by', e.target.value)}
        >
          <option value="-created_at">Recently Registered</option>
          <option value="-total_runs">Highest Runs</option>
          <option value="-wickets_taken">Most Wickets</option>
          <option value="-matches_played">Most Matches</option>
          <option value="jersey_number">Jersey Number (Asc)</option>
          <option value="first_name">Player Name (A-Z)</option>
        </select>

        <div className="view-tabs">
          <button 
            type="button" 
            className={`view-tab ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            type="button" 
            className={`view-tab ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
        </div>
      </div>
    </div>
  );
}
