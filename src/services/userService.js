import { activeProvider } from './config';
import { localUserService } from './local/localUserService';
import { supabaseUserService } from './supabase/supabaseUserService';

export const userService = {
  async getAll() {
    return activeProvider === 'supabase'
      ? supabaseUserService.getAll()
      : localUserService.getAll();
  },
  async getActive() {
    return activeProvider === 'supabase'
      ? supabaseUserService.getCurrentProfile()
      : localUserService.getActive();
  },
  async setActive(userId) {
    if (activeProvider === 'local') {
      return localUserService.setActive(userId);
    }
    return null; // En Supabase se maneja por sesión de Auth
  }
};
