import { supabase } from './supabaseClient';
import { mappers } from './mappers';

export const supabaseTaskService = {
  async getTasks() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mappers.mapTaskFromDb);
  },

  async createTask(task) {
    if (!supabase) return task;
    const dbTask = mappers.mapTaskToDb(task);
    const { data, error } = await supabase
      .from('tareas')
      .insert([dbTask])
      .select();

    if (error) throw error;
    return mappers.mapTaskFromDb(data[0]);
  },

  async updateTask(taskId, updates) {
    if (!supabase) return null;
    const dbUpdates = mappers.mapTaskToDb({ id: taskId, ...updates });
    // Borrar campos indefinidos
    Object.keys(dbUpdates).forEach(key => {
      if (updates[key] === undefined && key !== 'id') {
        delete dbUpdates[key];
      }
    });

    const { data, error } = await supabase
      .from('tareas')
      .update(dbUpdates)
      .eq('id', taskId)
      .select();

    if (error) throw error;
    return mappers.mapTaskFromDb(data[0]);
  },

  async deleteTask(taskId) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('tareas')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
    return true;
  }
};
