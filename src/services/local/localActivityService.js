export const localActivityService = {
  async getActivities() {
    const local = localStorage.getItem('asck_crm_activities');
    return local ? JSON.parse(local) : [];
  },

  async logActivity(activity) {
    const activities = await this.getActivities();
    const updated = [activity, ...activities];
    localStorage.setItem('asck_crm_activities', JSON.stringify(updated));
    return activity;
  }
};
