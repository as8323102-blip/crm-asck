import { activeProvider } from './config';
import { localTaskService } from './local/localTaskService';
import { supabaseTaskService } from './supabase/supabaseTaskService';

export const taskService = {
  async getTasks() {
    return activeProvider === 'supabase'
      ? supabaseTaskService.getTasks()
      : localTaskService.getTasks();
  },

  async createTask(task) {
    return activeProvider === 'supabase'
      ? supabaseTaskService.createTask(task)
      : localTaskService.createTask(task);
  },

  async updateTask(taskId, updates) {
    return activeProvider === 'supabase'
      ? supabaseTaskService.updateTask(taskId, updates)
      : localTaskService.updateTask(taskId, updates);
  },

  async deleteTask(taskId) {
    return activeProvider === 'supabase'
      ? supabaseTaskService.deleteTask(taskId)
      : localTaskService.deleteTask(taskId);
  }
};
