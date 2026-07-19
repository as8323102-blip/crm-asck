import { activeProvider } from './config';
import { localSprintService } from './local/localSprintService';
import { supabaseSprintService } from './supabase/supabaseSprintService';
import { offlineQueue } from './offlineQueue';

export const sprintService = {
  async getSprints() {
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          const sprints = await supabaseSprintService.getSprints();
          localStorage.setItem('asck_crm_sprints', JSON.stringify(sprints));
          return sprints;
        } catch (err) {
          console.warn("[Sync] Error al leer sprints de Supabase, usando local:", err);
        }
      }
    }
    return localSprintService.getSprints();
  },

  async createSprint(sprint) {
    const local = await localSprintService.createSprint(sprint);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseSprintService.createSprint(sprint);
        } catch (err) {
          console.warn("[Sync] Error guardando sprint en Supabase, encolando offline:", err);
          offlineQueue.add('createSprint', sprint);
        }
      } else {
        offlineQueue.add('createSprint', sprint);
      }
    }
    return local;
  },

  async updateSprint(sprintId, updates) {
    const local = await localSprintService.updateSprint(sprintId, updates);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseSprintService.updateSprint(sprintId, updates);
        } catch (err) {
          console.warn("[Sync] Error actualizando sprint en Supabase, encolando offline:", err);
          offlineQueue.add('updateSprint', { id: sprintId, updates });
        }
      } else {
        offlineQueue.add('updateSprint', { id: sprintId, updates });
      }
    }
    return local;
  }
};
