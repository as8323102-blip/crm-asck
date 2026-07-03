import { activeProvider } from './config';
import { localActivityService } from './local/localActivityService';
import { supabaseActivityService } from './supabase/supabaseActivityService';

export const activityService = {
  async getActivities() {
    return activeProvider === 'supabase'
      ? supabaseActivityService.getActivities()
      : localActivityService.getActivities();
  },

  async logActivity(activity) {
    return activeProvider === 'supabase'
      ? supabaseActivityService.logActivity(activity)
      : localActivityService.logActivity(activity);
  }
};
