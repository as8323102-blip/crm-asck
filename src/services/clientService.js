import { activeProvider } from './config';
import { localClientService } from './local/localClientService';
import { supabaseClientService } from './supabase/supabaseClientService';

export const clientService = {
  async getClients() {
    return activeProvider === 'supabase'
      ? supabaseClientService.getClients()
      : localClientService.getClients();
  },

  async createClient(client) {
    return activeProvider === 'supabase'
      ? supabaseClientService.createClient(client)
      : localClientService.createClient(client);
  },

  async updateClient(clientId, updates) {
    return activeProvider === 'supabase'
      ? supabaseClientService.updateClient(clientId, updates)
      : localClientService.updateClient(clientId, updates);
  },

  async deleteClient(clientId) {
    return activeProvider === 'supabase'
      ? supabaseClientService.deleteClient(clientId)
      : localClientService.deleteClient(clientId);
  }
};
