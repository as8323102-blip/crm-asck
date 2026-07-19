export const localTaskService = {
  async getTasks() {
    const local = localStorage.getItem('asck_crm_tasks');
    return local ? JSON.parse(local) : [];
  },

  async createTask(task) {
    const tasks = await this.getTasks();
    const updated = [task, ...tasks];
    localStorage.setItem('asck_crm_tasks', JSON.stringify(updated));
    return task;
  },

  async updateTask(taskId, updates) {
    const tasks = await this.getTasks();
    const updated = tasks.map(t => t.id === taskId ? { ...t, ...updates } : t);
    localStorage.setItem('asck_crm_tasks', JSON.stringify(updated));
    return updated.find(t => t.id === taskId);
  },

  async deleteTask(taskId) {
    const tasks = await this.getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('asck_crm_tasks', JSON.stringify(filtered));
    return true;
  }
};
