import React from 'react';
import { IconUsers, IconBat, IconBall, IconWicket, IconTrophy } from './Icons';

export function DashboardStats({ stats }) {
  if (!stats) return null;

  const roleDist = stats.role_distribution || {};
  const battersCount = (roleDist['Top-order Batter'] || 0) + (roleDist['Middle-order Batter'] || 0);
  const bowlersCount = (roleDist['Fast Bowler'] || 0) + (roleDist['Spin Bowler'] || 0);
  const allroundersCount = (roleDist['Batting All-Rounder'] || 0) + (roleDist['Bowling All-Rounder'] || 0);
  const keepersCount = roleDist['Wicketkeeper Batter'] || 0;

  const topBatter = stats.top_run_scorers && stats.top_run_scorers[0];
  const topBowler = stats.top_wicket_takers && stats.top_wicket_takers[0];

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
          <IconUsers size={26} />
        </div>
        <div>
          <div className="stat-value">{stats.total_players || 0}</div>
          <div className="stat-label">Registered Players</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
          <IconBat size={26} />
        </div>
        <div>
          <div className="stat-value">{stats.total_runs_scored ? stats.total_runs_scored.toLocaleString() : '0'}</div>
          <div className="stat-label">
            Runs Scored {topBatter ? `(Top: ${topBatter.first_name} - ${topBatter.total_runs})` : ''}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
          <IconBall size={26} />
        </div>
        <div>
          <div className="stat-value">{stats.total_wickets_taken ? stats.total_wickets_taken.toLocaleString() : '0'}</div>
          <div className="stat-label">
            Wickets Taken {topBowler ? `(Top: ${topBowler.first_name} - ${topBowler.wickets_taken}w)` : ''}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
          <IconTrophy size={26} />
        </div>
        <div>
          <div className="stat-value" style={{ fontSize: '20px' }}>
            {battersCount} Bat · {bowlersCount} Bowl
          </div>
          <div className="stat-label">
            {allroundersCount} All-Rounders · {keepersCount} WK
          </div>
        </div>
      </div>
    </div>
  );
}
