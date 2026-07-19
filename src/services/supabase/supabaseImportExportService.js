import { supabase } from './supabaseClient';

export const supabaseImportExportService = {
  async registrarImportaciones(importJob) {
    if (!supabase) return importJob;
    const { data, error } = await supabase
      .from('importaciones')
      .insert([{
        id: importJob.id,
        filename: importJob.filename,
        total_filas: importJob.totalFilas,
        nuevos_creados: importJob.nuevosCreados,
        actualizados: importJob.actualizados,
        duplicados_omitidos: importJob.duplicadosOmitidos,
        errores: importJob.errores
      }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async obtenerHistorialDeImportaciones() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('importaciones')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};
