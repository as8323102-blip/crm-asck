import { activeProvider } from './config';
import { localTaskService } from './local/localTaskService';
import { supabaseTaskService } from './supabase/supabaseTaskService';
import { offlineQueue } from './offlineQueue';

export const taskService = {
  async getTasks() {
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          const tasks = await supabaseTaskService.getTasks();
          localStorage.setItem('asck_crm_tasks', JSON.stringify(tasks));
          return tasks;
        } catch (err) {
          console.warn("[Sync] Error al leer tareas de Supabase, usando local:", err);
        }
      }
    }
    return localTaskService.getTasks();
  },

  async createTask(task) {
    const local = await localTaskService.createTask(task);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseTaskService.createTask(task);
        } catch (err) {
          console.warn("[Sync] Error guardando tarea en Supabase, encolando offline:", err);
          offlineQueue.add('createTask', task);
        }
      } else {
        offlineQueue.add('createTask', task);
      }
    }
    return local;
  },

  async updateTask(taskId, updates) {
    const local = await localTaskService.updateTask(taskId, updates);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseTaskService.updateTask(taskId, updates);
        } catch (err) {
          console.warn("[Sync] Error actualizando tarea en Supabase, encolando offline:", err);
          offlineQueue.add('updateTask', { id: taskId, updates });
        }
      } else {
        offlineQueue.add('updateTask', { id: taskId, updates });
      }
    }
    return local;
  },

  async deleteTask(taskId) {
    const local = await localTaskService.deleteTask(taskId);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseTaskService.deleteTask(taskId);
        } catch (err) {
          console.warn("[Sync] Error borrando tarea en Supabase, encolando offline:", err);
          offlineQueue.add('deleteTask', { id: taskId });
        }
      } else {
        offlineQueue.add('deleteTask', { id: taskId });
      }
    }
    return local;
  }
};
