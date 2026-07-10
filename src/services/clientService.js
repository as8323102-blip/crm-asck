import { activeProvider } from './config';
import { localClientService } from './local/localClientService';
import { supabaseClientService } from './supabase/supabaseClientService';
import { offlineQueue } from './offlineQueue';

export const clientService = {
  async getClients() {
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          const clients = await supabaseClientService.getClients();
          localStorage.setItem('asck_crm_clients', JSON.stringify(clients));
          return clients;
        } catch (err) {
          console.warn("[Sync] Error al leer clientes de Supabase, usando local:", err);
        }
      }
    }
    return localClientService.getClients();
  },

  async createClient(client) {
    const local = await localClientService.createClient(client);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseClientService.createClient(client);
        } catch (err) {
          console.warn("[Sync] Error guardando cliente en Supabase, encolando offline:", err);
          offlineQueue.add('createClient', client);
        }
      } else {
        offlineQueue.add('createClient', client);
      }
    }
    return local;
  },

  async updateClient(clientId, updates) {
    const local = await localClientService.updateClient(clientId, updates);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseClientService.updateClient(clientId, updates);
        } catch (err) {
          console.warn("[Sync] Error actualizando cliente en Supabase, encolando offline:", err);
          offlineQueue.add('updateClient', { id: clientId, updates });
        }
      } else {
        offlineQueue.add('updateClient', { id: clientId, updates });
      }
    }
    return local;
  },

  async deleteClient(clientId) {
    const local = await localClientService.deleteClient(clientId);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseClientService.deleteClient(clientId);
        } catch (err) {
          console.warn("[Sync] Error borrando cliente en Supabase, encolando offline:", err);
          offlineQueue.add('deleteClient', { id: clientId });
        }
      } else {
        offlineQueue.add('deleteClient', { id: clientId });
      }
    }
    return local;
  }
};
