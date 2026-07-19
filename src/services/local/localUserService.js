import { INTEGRANTES } from '../../mockData';

export const localUserService = {
  async getAll() {
    return INTEGRANTES;
  },
  async getActive() {
    const saved = localStorage.getItem('asck_crm_current_user');
    return saved ? JSON.parse(saved) : INTEGRANTES[0];
  },
  async setActive(userId) {
    const matched = INTEGRANTES.find(u => u.id === userId);
    if (matched) {
      localStorage.setItem('asck_crm_current_user', JSON.stringify(matched));
      return matched;
    }
    return null;
  }
};
