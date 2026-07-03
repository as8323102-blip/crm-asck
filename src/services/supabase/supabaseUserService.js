import { supabase } from './supabaseClient';

export const supabaseUserService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('integrantes')
      .select('*')
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data || [];
  },
  async getCurrentProfile() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('integrantes')
      .select('*')
      .eq('id', user.id)
      .single();
    if (error) return null;
    return data;
  },
  async updateProfile(userId, updates) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('integrantes')
      .update(updates)
      .eq('id', userId)
      .select();
    if (error) throw error;
    return data[0];
  }
};
