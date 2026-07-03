import { activeProvider } from './config';
import { localSprintService } from './local/localSprintService';
import { supabaseSprintService } from './supabase/supabaseSprintService';

export const sprintService = {
  async getSprints() {
    return activeProvider === 'supabase'
      ? supabaseSprintService.getSprints()
      : localSprintService.getSprints();
  },

  async createSprint(sprint) {
    return activeProvider === 'supabase'
      ? supabaseSprintService.createSprint(sprint)
      : localSprintService.createSprint(sprint);
  },

  async updateSprint(sprintId, updates) {
    return activeProvider === 'supabase'
      ? supabaseSprintService.updateSprint(sprintId, updates)
      : localSprintService.updateSprint(sprintId, updates);
  }
};
