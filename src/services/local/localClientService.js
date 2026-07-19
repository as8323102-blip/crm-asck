export const localClientService = {
  async getClients() {
    const local = localStorage.getItem('asck_crm_clients');
    return local ? JSON.parse(local) : [];
  },

  async createClient(client) {
    const clients = await this.getClients();
    const updated = [client, ...clients];
    localStorage.setItem('asck_crm_clients', JSON.stringify(updated));
    return client;
  },

  async updateClient(clientId, updates) {
    const clients = await this.getClients();
    const updated = clients.map(c => c.id === clientId ? { ...c, ...updates } : c);
    localStorage.setItem('asck_crm_clients', JSON.stringify(updated));
    return updated.find(c => c.id === clientId);
  },

  async deleteClient(clientId) {
    const clients = await this.getClients();
    const filtered = clients.filter(c => c.id !== clientId);
    localStorage.setItem('asck_crm_clients', JSON.stringify(filtered));
    return true;
  }
};
