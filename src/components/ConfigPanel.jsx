import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  Trash2, 
  Moon, 
  Sun, 
  Coins, 
  RefreshCw, 
  CheckCircle,
  AlertTriangle,
  X,
  Link2,
  Unlink,
  Copy,
  Share2
} from 'lucide-react';
import { cloudSyncService } from '../services/cloudSyncService';

import { activeProvider } from '../services/config';
import DataMigrationPanel from './Settings/DataMigrationPanel';

export default function ConfigPanel({ 
  clients, 
  tasks, 
  notes, 
  activities, 
  agendaEvents, 
  sprints,
  setClients,
  setTasks,
  setNotes,
  setActivities,
  setAgendaEvents,
  setSprints,
  isDark,
  toggleTheme,
  onSeedDemoData,
  syncRoomId,
  syncing,
  onStartSync,
  onUnlinkSync
}) {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [inputRoomId, setInputRoomId] = useState('');

  // 1. RESPALDAR DATOS (Exportar JSON)
  const handleBackup = () => {
    const backupData = {
      clients: JSON.parse(localStorage.getItem('asck_crm_clients')) || clients,
      tasks: JSON.parse(localStorage.getItem('asck_crm_tasks')) || tasks,
      notes: JSON.parse(localStorage.getItem('asck_crm_notes')) || notes,
      activities: JSON.parse(localStorage.getItem('asck_crm_activities')) || activities,
      agendaEvents: JSON.parse(localStorage.getItem('asck_crm_agenda')) || agendaEvents,
      sprints: JSON.parse(localStorage.getItem('asck_crm_sprints')) || sprints,
      backupVersion: '1.8',
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASCK_CRM_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMsg('Respaldo generado y descargado correctamente.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // 2. RESTAURAR RESPALDO (Importar JSON)
  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        
        // Validación mínima de estructura
        if (!imported.clients || !imported.tasks || !imported.sprints) {
          setErrorMsg('El archivo no parece ser un respaldo válido de ASCK CRM.');
          setTimeout(() => setErrorMsg(''), 4000);
          return;
        }

        // Guardar en localStorage
        localStorage.setItem('asck_crm_clients', JSON.stringify(imported.clients));
        localStorage.setItem('asck_crm_tasks', JSON.stringify(imported.tasks));
        localStorage.setItem('asck_crm_notes', JSON.stringify(imported.notes || []));
        localStorage.setItem('asck_crm_activities', JSON.stringify(imported.activities || []));
        localStorage.setItem('asck_crm_agenda', JSON.stringify(imported.agendaEvents || []));
        localStorage.setItem('asck_crm_sprints', JSON.stringify(imported.sprints || []));

        // Actualizar estados reactivos
        setClients(imported.clients);
        setTasks(imported.tasks);
        setNotes(imported.notes || []);
        setActivities(imported.activities || []);
        setAgendaEvents(imported.agendaEvents || []);
        setSprints(imported.sprints || []);

        setSuccessMsg('Base de datos restaurada correctamente desde el respaldo.');
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch {
        setErrorMsg('Error al parsear el archivo JSON de respaldo.');
        setTimeout(() => setErrorMsg(''), 4000);
      }
    };
    reader.readAsText(file);
  };

  // 3. VACIAR BASE LOCAL
  const handleClearDatabase = async () => {
    try {
      localStorage.setItem('asck_crm_clients', JSON.stringify([]));
      localStorage.setItem('asck_crm_tasks', JSON.stringify([]));
      localStorage.setItem('asck_crm_notes', JSON.stringify([]));
      localStorage.setItem('asck_crm_activities', JSON.stringify([]));
      localStorage.setItem('asck_crm_agenda', JSON.stringify([]));
      localStorage.setItem('asck_crm_sprints', JSON.stringify([]));
      localStorage.setItem('asck_crm_seeded_v1_8', 'true');

      setClients([]);
      setTasks([]);
      setNotes([]);
      setActivities([]);
      setAgendaEvents([]);
      setSprints([]);

      setSuccessMsg('Base de datos local vaciada con éxito. Ahora todas tus métricas están en cero.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmClearOpen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans text-left view-fade">

      {/* Mensajes de feedback */}
      {successMsg && (
        <div role="status" className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg border border-emerald-200 dark:border-emerald-900 flex items-center gap-2">
          <CheckCircle size={14} aria-hidden="true" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div role="alert" className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs rounded-lg border border-rose-200 dark:border-rose-900 flex items-center gap-2">
          <X size={14} aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TARJETA 1: RESPALDOS */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex items-center gap-2 border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <Database size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">Copias de Seguridad (JSON)</h2>
        </div>

        <p className="text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
          Descarga un respaldo completo con todos tus datos locales actuales en un único archivo comprimido. Puedes restaurar el archivo en cualquier momento.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleBackup}
            className="btn-primary px-4 py-2 font-bold"
          >
            <Download size={14} />
            <span>Generar Respaldo</span>
          </button>

          <label className="btn-ghost px-4 py-2 font-bold cursor-pointer">
            <Upload size={14} />
            <span>Cargar Respaldo</span>
            <input 
              type="file" 
              accept=".json" 
              onChange={handleRestore} 
              className="hidden" 
            />
          </label>
        </div>
      </div>

      {/* TARJETA DE DATOS DEMOSTRATIVOS */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex items-center gap-2 border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <RefreshCw size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">Datos de Demostración (Semilla)</h2>
        </div>

        <p className="text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
          Si deseas rellenar el CRM con prospectos, tareas operativas, actividades y eventos de ejemplo de la versión 1.8 para realizar demostraciones rápidas o pruebas de flujo.
        </p>

        <button
          onClick={() => {
            onSeedDemoData();
            setSuccessMsg('Datos demostrativos de prueba cargados con éxito.');
            setTimeout(() => setSuccessMsg(''), 4000);
          }}
          className="btn-primary px-4 py-2 font-bold w-fit"
        >
          <RefreshCw size={14} />
          <span>Cargar Datos de Ejemplo</span>
        </button>
      </div>

      {/* TARJETA 2: CONFIGURACIÓN GENERAL */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex items-center gap-2 border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <Coins size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">Configuración General</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Alternar Tema */}
          <div className="p-3.5 rounded-lg border border-notion-border-light/50 dark:border-notion-border-dark/50 bg-[#fbfbfa]/30 dark:bg-[#1c1c1c]/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-notion-text-light dark:text-notion-text-dark">Apariencia visual</div>
              <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark mt-0.5">Alterna el tema de colores</div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark hover:bg-notion-border-light/10 text-notion-text-light dark:text-notion-text-dark"
            >
              {isDark ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} className="text-indigo-500" />}
            </button>
          </div>

          {/* Estado de Supabase */}
          <div className="p-3.5 rounded-lg border border-notion-border-light/50 dark:border-notion-border-dark/50 bg-[#fbfbfa]/30 dark:bg-[#1c1c1c]/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-notion-text-light dark:text-notion-text-dark">Motor de Persistencia</div>
              <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark mt-0.5">Modo de almacenamiento activo</div>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
              activeProvider === 'supabase'
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
            }`}>
              {activeProvider === 'supabase' ? 'Nube (Supabase)' : 'Local (localStorage)'}
            </span>
          </div>
        </div>
      </div>

      {/* PANEL DE MIGRACIÓN */}
      <DataMigrationPanel />

      {/* TARJETA: SINCRONIZACIÓN EN LA NUBE */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
        <div className="flex items-center gap-2 border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <Share2 size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-notion-text-light dark:text-notion-text-dark">Sincronización en la Nube (Multi-Dispositivo)</h2>
        </div>

        <p className="text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
          Sincroniza tus datos de forma segura entre tu computadora y tu teléfono usando una sala cifrada de extremo a extremo sin configuraciones complejas.
        </p>

        {syncRoomId ? (
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  Vinculado y Sincronizando
                </span>
              </div>
              <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark">
                Último sync: {localStorage.getItem('asck_crm_updated_at') ? new Date(localStorage.getItem('asck_crm_updated_at')).toLocaleTimeString() : 'Pendiente'}
              </div>
            </div>

            <div className="p-3 bg-notion-bg-light dark:bg-notion-bg-dark rounded border border-notion-border-light dark:border-notion-border-dark flex items-center justify-between gap-3">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-notion-text-muted-light dark:text-notion-text-muted-dark font-semibold">Clave de la Sala</div>
                <div className="text-sm font-mono font-bold text-notion-text-light dark:text-notion-text-dark mt-0.5">{syncRoomId}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(syncRoomId);
                    setSuccessMsg('Clave de sala copiada al portapapeles.');
                    setTimeout(() => setSuccessMsg(''), 3000);
                  }}
                  className="p-1.5 rounded hover:bg-notion-border-light/20 text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-indigo-500 transition-colors"
                  title="Copiar Clave"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <p className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
              <strong>¿Cómo verlos en tu celular?</strong> Abre el CRM en tu celular, ve a esta sección de Configuración, introduce la clave <strong>{syncRoomId}</strong> y haz clic en Vincular. Los cambios se actualizarán de forma segura al instante en ambos dispositivos.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-500/10">
              <button
                onClick={async () => {
                  await onStartSync(syncRoomId);
                  setSuccessMsg('Sincronización manual completada con éxito.');
                  setTimeout(() => setSuccessMsg(''), 3000);
                }}
                disabled={syncing}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition-all text-xs"
              >
                <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
                <span>{syncing ? "Sincronizando..." : "Sincronizar Ahora"}</span>
              </button>

              <button
                onClick={() => {
                  onUnlinkSync();
                  setSuccessMsg('Dispositivo desvinculado. Ahora los datos son puramente locales.');
                  setTimeout(() => setSuccessMsg(''), 3000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-500/20 text-rose-500 hover:bg-rose-500/5 font-bold rounded-lg transition-all text-xs"
              >
                <Unlink size={13} />
                <span>Desvincular Sala</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-400"></span>
              <span className="text-xs font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wide">
                Modo Local Independiente
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-bold text-notion-text-light dark:text-notion-text-dark">
                Vincular a una Sala Existente
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Introduce la clave de sala (ej. ASCK-XXXXXX)"
                  value={inputRoomId}
                  onChange={(e) => setInputRoomId(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:border-indigo-500 transition-colors uppercase font-mono"
                />
                <button
                  onClick={async () => {
                    if (!inputRoomId.trim()) {
                      setErrorMsg('Por favor introduce una clave de sala válida.');
                      setTimeout(() => setErrorMsg(''), 3000);
                      return;
                    }
                    await onStartSync(inputRoomId);
                    setInputRoomId('');
                    setSuccessMsg('¡Dispositivo vinculado con éxito a la sala!');
                    setTimeout(() => setSuccessMsg(''), 4000);
                  }}
                  disabled={syncing}
                  className="btn-primary px-4 py-1.5 font-bold text-xs"
                >
                  <Link2 size={13} />
                  <span>Vincular</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-notion-border-light dark:border-notion-border-dark flex items-center justify-between gap-3">
              <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark leading-snug">
                ¿No tienes una sala? Crea una nueva sesión compartida en la nube para este equipo comercial.
              </div>
              <button
                onClick={async () => {
                  const newId = await cloudSyncService.generateRoomId();
                  await onStartSync(newId);
                  setSuccessMsg(`Nueva sala creada: ${newId}`);
                  setTimeout(() => setSuccessMsg(''), 4000);
                }}
                disabled={syncing}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-indigo-500/20 text-indigo-500 hover:bg-indigo-500/5 font-bold rounded-lg text-xs transition-all flex-shrink-0"
              >
                <Share2 size={13} />
                <span>Crear Nueva Sala</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TARJETA 3: ACCIONES CRÍTICAS */}
      <div className="p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-4">
        <div className="flex items-center gap-2 border-b border-rose-500/10 pb-3">
          <AlertTriangle size={16} className="text-rose-500" />
          <h2 className="text-sm font-bold text-rose-500">Zona de Riesgo</h2>
        </div>

        <p className="text-notion-text-muted-light dark:text-notion-text-muted-dark leading-relaxed">
          Las siguientes acciones son irreversibles y eliminarán permanentemente todos los datos de tu navegador.
        </p>

        <button
          onClick={() => setConfirmClearOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-sm transition-all w-fit"
        >
          <Trash2 size={14} />
          <span>Vaciar Base de Datos Local</span>
        </button>
      </div>

      {/* CONFIRMACIÓN MODAL DE VACIADO */}
      {confirmClearOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]" onClick={() => setConfirmClearOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-[151] p-5 space-y-4 text-center">
            <AlertTriangle size={32} className="text-rose-500 mx-auto" />
            <div>
              <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">¿Estás absolutamente seguro?</h3>
              <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark mt-1.5 leading-relaxed">
                Esta acción borrará de forma irreversible todos los prospectos, sprints, bitácoras de actividades y tareas. La base de datos volverá a su estado inicial.
              </p>
            </div>

            <div className="flex justify-center gap-2.5 pt-2">
              <button
                onClick={() => setConfirmClearOpen(false)}
                className="px-3.5 py-1.5 border border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/20 rounded-lg font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearDatabase}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold shadow"
              >
                Sí, vaciar base local
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
