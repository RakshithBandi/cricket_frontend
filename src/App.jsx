import React, { useState, useEffect, useCallback } from 'react';
import { api } from './api/client';
import { HeaderNavbar } from './components/HeaderNavbar';
import { LiveTicker } from './components/LiveTicker';
import { DashboardView } from './components/DashboardView';
import { PlayersTableView } from './components/PlayersTableView';
import { PlayerRegistrationModal } from './components/PlayerRegistrationModal';
import { ActionRolesView } from './components/ActionRolesView';
import { ActionAuctionView } from './components/ActionAuctionView';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getPlayers();
      setPlayers(data);
    } catch (err) {
      console.error(err);
      showToast('Could not fetch players from backend', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeams = useCallback(async () => {
    try {
      const data = await api.getTeams();
      setTeams(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, [fetchPlayers, fetchTeams]);

  const handleOpenRegistration = () => {
    setActiveTab('players');
    setIsFormModalOpen(true);
  };

  const handleCreatePlayer = async (formData, resetCallback) => {
    if (!formData.name.trim()) {
      showToast('Please enter the player name', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Please enter the phone number', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.createPlayer({
        name: formData.name.trim(),
        village: formData.village.trim() || 'Mallinamadugu',
        role: formData.role,
        phone: formData.phone.trim(),
      });
      showToast(`🏏 Player ${formData.name} registered successfully!`);
      if (resetCallback) resetCallback();
      setIsFormModalOpen(false);
      fetchPlayers();
    } catch (err) {
      console.error(err);
      showToast('Failed to register player', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePlayer = async (player) => {
    const confirmDel = window.confirm(`Remove ${player.name} from the registered players list?`);
    if (!confirmDel) return;

    try {
      await api.deletePlayer(player.id);
      showToast(`Removed ${player.name}`);
      fetchPlayers();
    } catch (err) {
      showToast('Failed to delete player', 'error');
    }
  };

  const handleBuyPlayer = async (playerId, teamName, amountSpent) => {
    try {
      await api.updatePlayer(playerId, {
        team: teamName,
        bid_amount: amountSpent,
      });
      showToast(`🏏 Player acquired by ${teamName} for ₹${amountSpent.toLocaleString('en-IN')}!`);
      fetchPlayers();
      fetchTeams();
    } catch (err) {
      console.error(err);
      showToast('Failed to complete player purchase', 'error');
    }
  };

  const handleReleasePlayer = async (playerId) => {
    try {
      await api.updatePlayer(playerId, {
        team: '',
        bid_amount: 0,
      });
      showToast('Player released back to pool and purse refunded!');
      fetchPlayers();
      fetchTeams();
    } catch (err) {
      console.error(err);
      showToast('Failed to release player', 'error');
    }
  };

  const handleUpdateTeamBudget = async (teamId, newBudget) => {
    try {
      await api.updateTeam(teamId, { total_budget: newBudget });
      showToast(`Updated team purse to ₹${newBudget.toLocaleString('en-IN')}`);
      fetchTeams();
    } catch (err) {
      console.error(err);
      showToast('Failed to update team total budget', 'error');
    }
  };

  return (
    <div className="white-canvas">
      {/* Toast Alert Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: toast.type === 'error' ? '#ef4444' : '#10b981',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeInScale 0.25s ease-out'
        }}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. Header Navigation Bar */}
      <HeaderNavbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        playersCount={players.length}
        onOpenRegistration={handleOpenRegistration}
      />

      {/* 2. Live Animated Announcement Ticker */}
      <LiveTicker />

      {/* 3. Dashboard View */}
      {activeTab === 'dashboard' && (
        <DashboardView 
          playersCount={players.length}
          onOpenRegistration={handleOpenRegistration}
          onViewPlayers={() => setActiveTab('players')}
          onViewPlayersList={() => setActiveTab('roles')}
          onViewAction={() => setActiveTab('action')}
        />
      )}

      {/* 4. Registration Table View */}
      {activeTab === 'players' && (
        <PlayersTableView 
          players={players}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenRegistration={() => setIsFormModalOpen(true)}
          onDeletePlayer={handleDeletePlayer}
        />
      )}

      {/* 5. Players List View: Role-wise Players Pool (Batsmen, Bowlers, All-Rounders) */}
      {activeTab === 'roles' && (
        <ActionRolesView 
          players={players}
          onOpenRegistration={() => setIsFormModalOpen(true)}
        />
      )}

      {/* 6. Action Tab: 6 Cricket Teams Auction Room & Section View */}
      {activeTab === 'action' && (
        <ActionAuctionView 
          players={players}
          teams={teams}
          onBuyPlayer={handleBuyPlayer}
          onReleasePlayer={handleReleasePlayer}
          onUpdateTeamBudget={handleUpdateTeamBudget}
          onOpenRegistration={() => setIsFormModalOpen(true)}
        />
      )}

      {/* 7. New Player Registration Form Modal Dialog */}
      <PlayerRegistrationModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleCreatePlayer}
        submitting={submitting}
      />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
