import React, { useState, useEffect } from 'react';
import { localToSupabaseMigration } from '../../services/migration/localToSupabaseMigration';
import { isSupabaseConfigured } from '../../services/supabase/supabaseClient';

export default function DataMigrationPanel() {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    async function loadCounts() {
      const c = await localToSupabaseMigration.previewLocalData();
      setCounts(c);
    }
    loadCounts();
  }, []);

  const handleBackup = () => {
    // Generar respaldo JSON de todas las claves
    const backup = {};
    const keys = ['asck_crm_clients', 'asck_crm_notes', 'asck_crm_tasks', 'asck_crm_activities', 'asck_crm_agenda', 'asck_crm_sprints'];
    keys.forEach(k => {
      backup[k] = localStorage.getItem(k);
    });

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `asck_crm_local_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleMigrate = async () => {
    if (!isSupabaseConfigured) {
      alert("Supabase no está configurado en las variables de entorno (.env). No se puede migrar.");
      return;
    }

    const confirmMigrate = window.confirm("¿Estás seguro de migrar los datos locales a Supabase? Se recomienda descargar un respaldo JSON primero.");
    if (!confirmMigrate) return;

    try {
      setLoading(true);
      const res = await localToSupabaseMigration.migrateAll();
      setReport(res);
      // Recargar contadores locales
      const c = await localToSupabaseMigration.previewLocalData();
      setCounts(c);
    } catch (e) {
      alert("Error al migrar datos: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-notion-sidebar-dark rounded-xl border border-gray-100 dark:border-notion-border-dark p-6 space-y-6">
      <div>
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Migración de Datos Local ➜ Nube</h3>
        <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark mt-1">
          Transfiere tu base de datos de localStorage directamente a Supabase sin perder tus prospectos, tareas y agenda.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-xs rounded-lg border border-amber-200 dark:border-amber-900">
          ⚠️ <strong>Advertencia:</strong> Supabase no está configurado en tu archivo `.env`. El panel operará en modo de previsualización.
        </div>
      )}

      {counts && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 dark:bg-notion-bg-dark p-4 rounded-lg">
          <div className="text-center py-2">
            <span className="block text-xl font-bold text-indigo-600 dark:text-indigo-400">{counts.clientes}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Prospectos</span>
          </div>
          <div className="text-center py-2">
            <span className="block text-xl font-bold text-indigo-600 dark:text-indigo-400">{counts.tareas}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Tareas</span>
          </div>
          <div className="text-center py-2">
            <span className="block text-xl font-bold text-indigo-600 dark:text-indigo-400">{counts.agenda_eventos}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Eventos</span>
          </div>
          <div className="text-center py-2">
            <span className="block text-xl font-bold text-indigo-600 dark:text-indigo-400">{counts.notas_clientes}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Notas</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-notion-border-dark">
        <button
          onClick={handleBackup}
          className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-notion-bg-dark dark:hover:bg-notion-border-dark hover:bg-gray-200 text-gray-800 dark:text-gray-200 rounded-lg transition"
        >
          📥 Descargar Respaldo JSON
        </button>

        <button
          onClick={() => setPreviewOpen(!previewOpen)}
          className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-notion-bg-dark dark:hover:bg-notion-border-dark hover:bg-gray-200 text-gray-800 dark:text-gray-200 rounded-lg transition"
        >
          👁️ {previewOpen ? 'Ocultar Detalle' : 'Previsualizar Datos'}
        </button>

        <button
          onClick={handleMigrate}
          disabled={loading || !isSupabaseConfigured}
          className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg transition font-medium"
        >
          🚀 {loading ? 'Migrando...' : 'Migrar a Supabase'}
        </button>
      </div>

      {previewOpen && counts && (
        <div className="text-xs space-y-2 bg-gray-50 dark:bg-notion-bg-dark p-4 rounded-lg border border-gray-100 dark:border-notion-border-dark font-mono text-gray-700 dark:text-gray-300">
          <h4 className="font-bold border-b pb-1 mb-2">Esquema Local Detectado:</h4>
          <div>• Integrantes a registrar: {counts.integrantes} (Semilla)</div>
          <div>• Clientes / Prospectos a subir: {counts.clientes}</div>
          <div>• Sprints de trabajo: {counts.sprints}</div>
          <div>• Tareas pendientes y completadas: {counts.tareas}</div>
          <div>• Eventos de agenda horaria: {counts.agenda_eventos}</div>
          <div>• Notas de seguimiento históricas: {counts.notas_clientes}</div>
          <div>• Actividades operativas del equipo: {counts.actividades}</div>
        </div>
      )}

      {report && (
        <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-xs">
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-400 border-b pb-1 mb-2">Reporte de Sincronización:</h4>
          <ul className="space-y-1 text-gray-600 dark:text-gray-300">
            <li>👥 Integrantes: {report.integrantes.success} exitosos / {report.integrantes.failed} fallidos</li>
            <li>💼 Clientes: {report.clientes.success} exitosos / {report.clientes.failed} fallidos</li>
            <li>🔄 Sprints: {report.sprints.success} exitosos / {report.sprints.failed} fallidos</li>
            <li>📝 Tareas: {report.tareas.success} exitosos / {report.tareas.failed} fallidos</li>
            <li>📅 Eventos: {report.agenda_eventos.success} exitosos / {report.agenda_eventos.failed} fallidos</li>
            <li>💬 Notas: {report.notas_clientes.success} exitosos / {report.notas_clientes.failed} fallidos</li>
            <li>📊 Actividades: {report.actividades.success} exitosos / {report.actividades.failed} fallidos</li>
          </ul>
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-2 font-semibold">✓ Migración completada con éxito. Los duplicados se omitieron de forma segura.</p>
        </div>
      )}
    </div>
  );
}
