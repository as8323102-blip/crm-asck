import { activeProvider } from './config';
import { localImportExportService } from './local/localImportExportService';
import { supabaseImportExportService } from './supabase/supabaseImportExportService';

export const importExportService = {
  async importProspects(file) {
    return activeProvider === 'supabase'
      ? supabaseImportExportService.registrarImportaciones(file)
      : localImportExportService.importProspects(file);
  },
  async exportProspects(filters) {
    return activeProvider === 'supabase'
      ? supabaseImportExportService.obtenerHistorialDeImportaciones()
      : localImportExportService.exportProspects(filters);
  },
  async createBackup() {
    return localImportExportService.createBackup();
  },
  async restoreBackup(file) {
    return localImportExportService.restoreBackup(file);
  }
};
