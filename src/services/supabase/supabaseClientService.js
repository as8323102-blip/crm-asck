import { supabase } from './supabaseClient';
import { mappers } from './mappers';

export const supabaseClientService = {
  async getClients() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(mappers.mapClientFromDb);
  },

  async createClient(client) {
    if (!supabase) return client;
    const dbClient = mappers.mapClientToDb(client);
    const { data, error } = await supabase
      .from('clientes')
      .insert([dbClient])
      .select();

    if (error) throw error;
    return mappers.mapClientFromDb(data[0]);
  },

  async updateClient(clientId, updates) {
    if (!supabase) return null;
    const dbUpdates = mappers.mapClientToDb({ id: clientId, ...updates });
    // Eliminar claves nulas para no pisar campos no actualizados
    Object.keys(dbUpdates).forEach(key => {
      if (updates[key] === undefined && key !== 'id') {
        delete dbUpdates[key];
      }
    });

    const { data, error } = await supabase
      .from('clientes')
      .update(dbUpdates)
      .eq('id', clientId)
      .select();

    if (error) throw error;
    return mappers.mapClientFromDb(data[0]);
  },

  async deleteClient(clientId) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', clientId);

    if (error) throw error;
    return true;
  }
};
