const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://cricket-backend-9h8r.onrender.com/api'
    : 'http://127.0.0.1:8000/api');

export const api = {
  async getPlayers(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, val);
      }
    });
    const url = `${API_BASE_URL}/players/?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch players: ${res.statusText}`);
    return res.json();
  },

  async getPlayer(id) {
    const res = await fetch(`${API_BASE_URL}/players/${id}/`);
    if (!res.ok) throw new Error(`Failed to fetch player details`);
    return res.json();
  },

  async createPlayer(playerData) {
    const isFormData = playerData instanceof FormData;
    const res = await fetch(`${API_BASE_URL}/players/`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? playerData : JSON.stringify(playerData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(JSON.stringify(err) || `Failed to create player`);
    }
    return res.json();
  },

  async updatePlayer(id, playerData) {
    const isFormData = playerData instanceof FormData;
    const res = await fetch(`${API_BASE_URL}/players/${id}/`, {
      method: 'PATCH',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? playerData : JSON.stringify(playerData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(JSON.stringify(err) || `Failed to update player`);
    }
    return res.json();
  },

  async deletePlayer(id) {
    const res = await fetch(`${API_BASE_URL}/players/${id}/`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete player`);
    return true;
  },

  async getStatistics() {
    const res = await fetch(`${API_BASE_URL}/players/statistics/`);
    if (!res.ok) throw new Error(`Failed to load statistics`);
    return res.json();
  },

  async seedData() {
    const res = await fetch(`${API_BASE_URL}/players/seed_data/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to seed data`);
    return res.json();
  },

  async getTeams() {
    const res = await fetch(`${API_BASE_URL}/teams/`);
    if (!res.ok) throw new Error(`Failed to fetch teams`);
    return res.json();
  },

  async updateTeam(id, teamData) {
    const res = await fetch(`${API_BASE_URL}/teams/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    if (!res.ok) throw new Error(`Failed to update team`);
    return res.json();
  },

  getExportCsvUrl() {
    return `${API_BASE_URL}/players/export_csv/`;
  },

  getTeamPdfUrl(teamId) {
    return `${API_BASE_URL}/teams/${teamId}/export_pdf/`;
  },

  getTeamPdfByNameUrl(teamName) {
    return `${API_BASE_URL}/teams/export_team_pdf/?team=${encodeURIComponent(teamName)}`;
  },

  downloadTeamPdf(teamId, teamName) {
    const url = teamId 
      ? this.getTeamPdfUrl(teamId) 
      : this.getTeamPdfByNameUrl(teamName);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${teamName ? teamName.replace(/\s+/g, '_') : 'Team'}_Players_List.pdf`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
