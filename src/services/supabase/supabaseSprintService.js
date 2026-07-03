import { supabase } from './supabaseClient';
import { mappers } from './mappers';

export const supabaseSprintService = {
  async getSprints() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mappers.mapSprintFromDb);
  },

  async createSprint(sprint) {
    if (!supabase) return sprint;
    const dbSprint = mappers.mapSprintToDb(sprint);
    const { data, error } = await supabase
      .from('sprints')
      .insert([dbSprint])
      .select();

    if (error) throw error;
    return mappers.mapSprintFromDb(data[0]);
  },

  async updateSprint(sprintId, updates) {
    if (!supabase) return null;
    const dbUpdates = mappers.mapSprintToDb({ id: sprintId, ...updates });
    Object.keys(dbUpdates).forEach(key => {
      if (updates[key] === undefined && key !== 'id') {
        delete dbUpdates[key];
      }
    });

    const { data, error } = await supabase
      .from('sprints')
      .update(dbUpdates)
      .eq('id', sprintId)
      .select();

    if (error) throw error;
    return mappers.mapSprintFromDb(data[0]);
  }
};
