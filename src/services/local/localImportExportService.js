export const localImportExportService = {
  async importProspects(file) {
    console.log("Mock import prospects local", file);
    return { success: true };
  },
  async exportProspects(filters) {
    console.log("Mock export prospects local", filters);
    return [];
  },
  async createBackup() {
    // Retorna todos los datos locales en un objeto
    return {
      clients: JSON.parse(localStorage.getItem('asck_crm_clients')) || [],
      tasks: JSON.parse(localStorage.getItem('asck_crm_tasks')) || [],
      notes: JSON.parse(localStorage.getItem('asck_crm_notes')) || [],
      activities: JSON.parse(localStorage.getItem('asck_crm_activities')) || [],
      agendaEvents: JSON.parse(localStorage.getItem('asck_crm_agenda')) || [],
      sprints: JSON.parse(localStorage.getItem('asck_crm_sprints')) || []
    };
  },
  async restoreBackup(backupData) {
    if (!backupData) return false;
    localStorage.setItem('asck_crm_clients', JSON.stringify(backupData.clients || []));
    localStorage.setItem('asck_crm_tasks', JSON.stringify(backupData.tasks || []));
    localStorage.setItem('asck_crm_notes', JSON.stringify(backupData.notes || []));
    localStorage.setItem('asck_crm_activities', JSON.stringify(backupData.activities || []));
    localStorage.setItem('asck_crm_agenda', JSON.stringify(backupData.agendaEvents || []));
    localStorage.setItem('asck_crm_sprints', JSON.stringify(backupData.sprints || []));
    return true;
  }
};
