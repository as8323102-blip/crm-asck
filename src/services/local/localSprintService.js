export const localSprintService = {
  async getSprints() {
    const local = localStorage.getItem('asck_crm_sprints');
    return local ? JSON.parse(local) : [];
  },

  async createSprint(sprint) {
    const sprints = await this.getSprints();
    const updated = [sprint, ...sprints];
    localStorage.setItem('asck_crm_sprints', JSON.stringify(updated));
    return sprint;
  },

  async updateSprint(sprintId, updates) {
    const sprints = await this.getSprints();
    const updated = sprints.map(s => s.id === sprintId ? { ...s, ...updates } : s);
    localStorage.setItem('asck_crm_sprints', JSON.stringify(updated));
    return updated.find(s => s.id === sprintId);
  }
};
