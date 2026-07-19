import { supabase } from './supabaseClient';
import { mappers } from './mappers';

export const supabaseActivityService = {
  async getActivities() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('actividades')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mappers.mapActivityFromDb);
  },

  async logActivity(activity) {
    if (!supabase) return activity;
    const dbActivity = mappers.mapActivityToDb(activity);
    const { data, error } = await supabase
      .from('actividades')
      .insert([dbActivity])
      .select();

    if (error) throw error;
    return mappers.mapActivityFromDb(data[0]);
  }
};
