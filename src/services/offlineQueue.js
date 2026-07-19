import { supabaseTaskService } from './supabase/supabaseTaskService';
import { supabaseClientService } from './supabase/supabaseClientService';
import { supabaseSprintService } from './supabase/supabaseSprintService';
import { supabaseCalendarService } from './supabase/supabaseCalendarService';
import { supabaseNoteService } from './supabase/supabaseNoteService';
import { supabaseActivityService } from './supabase/supabaseActivityService';

export const offlineQueue = {
  getQueue() {
    try {
      const q = localStorage.getItem('asck_crm_offline_queue');
      return q ? JSON.parse(q) : [];
    } catch {
      return [];
    }
  },
  
  add(action, payload) {
    const queue = this.getQueue();
    queue.push({ action, payload, timestamp: Date.now() });
    localStorage.setItem('asck_crm_offline_queue', JSON.stringify(queue));
    console.log(`[OfflineQueue] Acción encolada offline: ${action}`);
  },
  
  clear() {
    localStorage.setItem('asck_crm_offline_queue', JSON.stringify([]));
  },
  
  async processQueue() {
    if (!navigator.onLine) return;
    const queue = this.getQueue();
    if (queue.length === 0) return;
    
    console.log(`[OfflineQueue] Sincronizando ${queue.length} acciones pendientes con Supabase...`);
    
    for (const item of queue) {
      const { action, payload } = item;
      try {
        if (action === 'createTask') {
          await supabaseTaskService.createTask(payload);
        } else if (action === 'updateTask') {
          await supabaseTaskService.updateTask(payload.id, payload.updates);
        } else if (action === 'deleteTask') {
          await supabaseTaskService.deleteTask(payload.id);
        } else if (action === 'createClient') {
          await supabaseClientService.createClient(payload);
        } else if (action === 'updateClient') {
          await supabaseClientService.updateClient(payload.id, payload.updates);
        } else if (action === 'deleteClient') {
          await supabaseClientService.deleteClient(payload.id);
        } else if (action === 'createSprint') {
          await supabaseSprintService.createSprint(payload);
        } else if (action === 'updateSprint') {
          await supabaseSprintService.updateSprint(payload.id, payload.updates);
        } else if (action === 'createEvent') {
          await supabaseCalendarService.createEvent(payload);
        } else if (action === 'createNote') {
          await supabaseNoteService.createNote(payload);
        } else if (action === 'logActivity') {
          await supabaseActivityService.logActivity(payload);
        }
      } catch (err) {
        console.error(`[OfflineQueue] Error sincronizando ${action}:`, err);
        // Continuamos con las demás por si el error es de restricción SQL única
      }
    }
    
    this.clear();
    console.log("[OfflineQueue] Cola offline procesada completamente.");
  }
};
