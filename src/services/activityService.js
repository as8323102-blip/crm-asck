import { activeProvider } from './config';
import { localActivityService } from './local/localActivityService';
import { supabaseActivityService } from './supabase/supabaseActivityService';
import { offlineQueue } from './offlineQueue';

export const activityService = {
  async getActivities() {
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          const activities = await supabaseActivityService.getActivities();
          localStorage.setItem('asck_crm_activities', JSON.stringify(activities));
          return activities;
        } catch (err) {
          console.warn("[Sync] Error al leer actividades de Supabase, usando local:", err);
        }
      }
    }
    return localActivityService.getActivities();
  },

  async logActivity(activity) {
    const local = await localActivityService.logActivity(activity);
    if (activeProvider === 'supabase') {
      if (navigator.onLine) {
        try {
          return await supabaseActivityService.logActivity(activity);
        } catch (err) {
          console.warn("[Sync] Error guardando actividad en Supabase, encolando offline:", err);
          offlineQueue.add('logActivity', activity);
        }
      } else {
        offlineQueue.add('logActivity', activity);
      }
    }
    return local;
  }
};
