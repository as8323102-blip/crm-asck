import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './hooks/useTheme';
import MainLayout from './layouts/MainLayout';
import DashboardSummary from './components/DashboardSummary';
import KanbanBoard from './components/KanbanBoard';
import ClientList from './components/ClientList';
import ClientDetail from './components/ClientDetail';
import NewClientModal from './components/NewClientModal';
import TaskManagerTudu from './components/TaskManagerTudu';
import CalendarAgenda from './components/CalendarAgenda';
import ActivityFeed from './components/ActivityFeed';
import ExcelImportExport from './components/ExcelImportExport';
import ConfigPanel from './components/ConfigPanel';
import { cloudSyncService } from './services/cloudSyncService';
import { offlineQueue } from './services/offlineQueue';

import { 
  CLIENTES_INICIALES, 
  NOTAS_INICIALES, 
  TAREAS_INICIALES,
  ACTIVIDADES_INICIALES,
  AGENDA_INICIAL,
  SPRINTS_INICIALES
} from './mockData';
import importedTasks from './data/imported_tasks.json';

import { useClients } from './hooks/useClients';
import { useTasks } from './hooks/useTasks';
import { useSprints } from './hooks/useSprints';
import { useCalendar } from './hooks/useCalendar';
import { useActivity } from './hooks/useActivity';
import { useAppView } from './hooks/useAppView';
import { useAuth } from './hooks/useAuth';
import { useSupabaseRealtime } from './hooks/useSupabaseRealtime';

export default function App() {
  const { toggleTheme, isDark } = useTheme();
  
  // Custom hooks para modularizar el CRM v1.8
  const { activeTab, setActiveTab } = useAppView();
  const { currentUser, setCurrentUser } = useAuth();
  const { activities, setActivities, logEvent } = useActivity();
  
  // Helper para logging que inyectamos a los hooks
  const logEventHelper = (actionText, clientId = null) => {
    return logEvent(actionText, currentUser, clientId);
  };

  // useTasks maneja la lista de tareas y operaciones
  const {
    tasks,
    setTasks,
    handleAddTask,
    handleUpdateTask,
    handleToggleTask,
    handleDeleteTask
  } = useTasks(logEventHelper);

  // useClients maneja clientes y notas comerciales (y recibe tasks/setTasks para cascada)
  const {
    clients,
    setClients,
    notes,
    setNotes,
    selectedClient,
    setSelectedClient,
    newClientModalOpen,
    setNewClientModalOpen,
    handleMoveClient,
    handleUpdateClient,
    handleCreateClient,
    handleDeleteClient,
    handleAddNote
  } = useClients(currentUser, logEventHelper, tasks, setTasks);

  const {
    sprints,
    setSprints,
    handleAddSprint,
    handleUpdateSprint
  } = useSprints(logEventHelper);

  const {
    agendaEvents,
    setAgendaEvents,
    handleAddAgendaEvent
  } = useCalendar(logEventHelper);

  // useSupabaseRealtime activa el canal de sincronización en tiempo real si provider es supabase
  const { onlineStatus } = useSupabaseRealtime({
    setClients,
    setTasks,
    setSprints,
    setAgendaEvents,
    setNotes,
    setActivities
  });
  const [loading, setLoading] = useState(true);

  const [syncRoomId, setSyncRoomId] = useState(() => {
    const saved = localStorage.getItem('asck_crm_sync_room_id');
    if (saved === null) {
      localStorage.setItem('asck_crm_sync_room_id', 'ASCK-MASTER-SYNC');
      return 'ASCK-MASTER-SYNC';
    }
    return saved === 'local' ? '' : saved;
  });
  const [syncing, setSyncing] = useState(false);
  const isSyncingRef = useRef(false);

  // Sincronización completa (Pull & Push)
  const handleStartSync = async (roomId) => {
    if (!roomId) return;
    try {
      setSyncing(true);
      isSyncingRef.current = true;

      const localPayload = {
        clients: JSON.parse(localStorage.getItem('asck_crm_clients')) || [],
        tasks: JSON.parse(localStorage.getItem('asck_crm_tasks')) || [],
        notes: JSON.parse(localStorage.getItem('asck_crm_notes')) || [],
        activities: JSON.parse(localStorage.getItem('asck_crm_activities')) || [],
        agendaEvents: JSON.parse(localStorage.getItem('asck_crm_agenda')) || [],
        sprints: JSON.parse(localStorage.getItem('asck_crm_sprints')) || [],
        updatedAt: localStorage.getItem('asck_crm_updated_at') || new Date(0).toISOString()
      };

      const result = await cloudSyncService.sync(roomId, localPayload);

      if (result) {
        // Guardar resultado en localStorage
        localStorage.setItem('asck_crm_clients', JSON.stringify(result.clients || []));
        localStorage.setItem('asck_crm_tasks', JSON.stringify(result.tasks || []));
        localStorage.setItem('asck_crm_notes', JSON.stringify(result.notes || []));
        localStorage.setItem('asck_crm_activities', JSON.stringify(result.activities || []));
        localStorage.setItem('asck_crm_agenda', JSON.stringify(result.agendaEvents || []));
        localStorage.setItem('asck_crm_sprints', JSON.stringify(result.sprints || []));
        localStorage.setItem('asck_crm_updated_at', result.updatedAt || new Date().toISOString());
        localStorage.setItem('asck_crm_sync_room_id', roomId);
        localStorage.setItem('asck_crm_seeded_v1_8', 'true');

        // Actualizar estados reactivos
        setClients(result.clients || []);
        setTasks(result.tasks || []);
        setNotes(result.notes || []);
        setActivities(result.activities || []);
        setAgendaEvents(result.agendaEvents || []);
        setSprints(result.sprints || []);
        setSyncRoomId(roomId);
      }
    } catch (e) {
      console.error("[CloudSync] Error sincronizando:", e);
    } finally {
      isSyncingRef.current = false;
      setSyncing(false);
    }
  };

  const handleUnlinkSync = () => {
    localStorage.setItem('asck_crm_sync_room_id', 'local');
    setSyncRoomId('');
  };

  // Monitorear cambios locales para marcar que los datos cambiaron y deben subirse
  useEffect(() => {
    if (loading) return;
    if (isSyncingRef.current) return;

    const newTime = new Date().toISOString();
    localStorage.setItem('asck_crm_updated_at', newTime);

    // Si hay una sala activa, intentamos subir los cambios de inmediato
    if (syncRoomId && navigator.onLine) {
      const localPayload = {
        clients,
        tasks,
        notes,
        activities,
        agendaEvents,
        sprints,
        updatedAt: newTime
      };
      cloudSyncService.uploadToCloud(syncRoomId, localPayload).catch(e => {
        console.error("[CloudSync] Error al subir cambio local:", e);
      });
    }
  }, [clients, tasks, notes, activities, agendaEvents, sprints]);

  // Sincronización periódica automática (cada 15s) y al volver a estar online
  useEffect(() => {
    if (!syncRoomId) return;

    handleStartSync(syncRoomId);

    const interval = setInterval(() => {
      if (navigator.onLine) {
        handleStartSync(syncRoomId);
      }
    }, 15000);

    const handleOnline = () => {
      handleStartSync(syncRoomId);
    };
    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
    };
  }, [syncRoomId]);

  const handleSeedDemoData = () => {
    localStorage.setItem('asck_crm_seeded_v1_8', 'true');
    localStorage.setItem('asck_crm_clients', JSON.stringify(CLIENTES_INICIALES));
    localStorage.setItem('asck_crm_notes', JSON.stringify(NOTAS_INICIALES));
    localStorage.setItem('asck_crm_tasks', JSON.stringify(TAREAS_INICIALES));
    localStorage.setItem('asck_crm_activities', JSON.stringify(ACTIVIDADES_INICIALES));
    localStorage.setItem('asck_crm_agenda', JSON.stringify(AGENDA_INICIAL));
    localStorage.setItem('asck_crm_sprints', JSON.stringify(SPRINTS_INICIALES));

    setClients(CLIENTES_INICIALES);
    setNotes(NOTAS_INICIALES);
    setTasks(TAREAS_INICIALES);
    setActivities(ACTIVIDADES_INICIALES);
    setAgendaEvents(AGENDA_INICIAL);
    setSprints(SPRINTS_INICIALES);
  };

  // Cargar datos asíncronos (sembrando base si es la primera vez)
  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const seededV18 = localStorage.getItem('asck_crm_seeded_v1_8') === 'true';

        let initialClients = [];
        let initialNotes = [];
        let initialTasks = [];
        let initialActivities = [];
        let initialAgenda = [];
        let initialSprints = [];

        if (seededV18) {
          initialClients = JSON.parse(localStorage.getItem('asck_crm_clients')) || [];
          initialNotes = JSON.parse(localStorage.getItem('asck_crm_notes')) || [];
          initialTasks = JSON.parse(localStorage.getItem('asck_crm_tasks')) || [];
          initialActivities = JSON.parse(localStorage.getItem('asck_crm_activities')) || [];
          initialAgenda = JSON.parse(localStorage.getItem('asck_crm_agenda')) || [];
          initialSprints = JSON.parse(localStorage.getItem('asck_crm_sprints')) || [];
        }

        // Si hay una sala de sincronización activa y hay red, hacer sync inicial para evitar parpadeos
        const currentRoomId = localStorage.getItem('asck_crm_sync_room_id') || 'ASCK-MASTER-SYNC';
        if (currentRoomId && currentRoomId !== 'local' && navigator.onLine) {
          try {
            const localPayload = {
              clients: initialClients,
              tasks: initialTasks,
              notes: initialNotes,
              activities: initialActivities,
              agendaEvents: initialAgenda,
              sprints: initialSprints,
              updatedAt: localStorage.getItem('asck_crm_updated_at') || new Date(0).toISOString()
            };
            const result = await cloudSyncService.sync(currentRoomId, localPayload);
            if (result) {
              localStorage.setItem('asck_crm_clients', JSON.stringify(result.clients || []));
              localStorage.setItem('asck_crm_notes', JSON.stringify(result.notes || []));
              localStorage.setItem('asck_crm_tasks', JSON.stringify(result.tasks || []));
              localStorage.setItem('asck_crm_activities', JSON.stringify(result.activities || []));
              localStorage.setItem('asck_crm_agenda', JSON.stringify(result.agendaEvents || []));
              localStorage.setItem('asck_crm_sprints', JSON.stringify(result.sprints || []));
              localStorage.setItem('asck_crm_updated_at', result.updatedAt || new Date().toISOString());
              localStorage.setItem('asck_crm_seeded_v1_8', 'true');

              setClients(result.clients || []);
              setNotes(result.notes || []);
              setTasks(result.tasks || []);
              setActivities(result.activities || []);
              setAgendaEvents(result.agendaEvents || []);
              setSprints(result.sprints || []);
              setLoading(false);
              return;
            }
          } catch (syncErr) {
            console.warn("[CloudSync] Fallo en sincronización inicial, usando datos locales:", syncErr);
          }
        }

        // Fallback local
        if (!seededV18) {
          localStorage.setItem('asck_crm_seeded_v1_8', 'true');
          localStorage.setItem('asck_crm_clients', JSON.stringify([]));
          localStorage.setItem('asck_crm_notes', JSON.stringify([]));
          localStorage.setItem('asck_crm_tasks', JSON.stringify(importedTasks || []));
          localStorage.setItem('asck_crm_activities', JSON.stringify([]));
          localStorage.setItem('asck_crm_agenda', JSON.stringify([]));
          localStorage.setItem('asck_crm_sprints', JSON.stringify([]));

          setClients([]);
          setNotes([]);
          setTasks(importedTasks || []);
          setActivities([]);
          setAgendaEvents([]);
          setSprints([]);
        } else {
          setClients(initialClients);
          setNotes(initialNotes);
          setTasks(initialTasks);
          setActivities(initialActivities);
          setAgendaEvents(initialAgenda);
          setSprints(initialSprints);
        }
      } catch (err) {
        console.error("Error inicializando datos en el CRM:", err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // Sincronizar cola de cambios offline con Supabase cuando cambia el estado de conexión
  useEffect(() => {
    const handleOnline = () => {
      offlineQueue.processQueue();
    };
    window.addEventListener('online', handleOnline);
    
    // Procesar cambios pendientes inmediatamente al arrancar
    offlineQueue.processQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      isDark={isDark}
      toggleTheme={toggleTheme}
      onNewClientClick={() => setNewClientModalOpen(true)}
      clients={clients}
      notes={notes}
      tasks={tasks}
      onClientClick={(c) => setSelectedClient(c)}
      onlineStatus={onlineStatus}
      syncRoomId={syncRoomId}
      syncing={syncing}
      onStartSync={handleStartSync}
    >
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark">Cargando el espacio de trabajo...</p>
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && (
            <DashboardSummary
              clients={clients}
              tasks={tasks}
              activities={activities}
              currentUser={currentUser}
              toggleTask={handleToggleTask}
              addTask={handleAddTask}
              onClientClick={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'kanban' && (
            <KanbanBoard
              clients={clients}
              onMoveClient={handleMoveClient}
              onClientClick={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'list' && (
            <ClientList
              clients={clients}
              onClientClick={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'tasks' && (
            <TaskManagerTudu
              tasks={tasks}
              clients={clients}
              sprints={sprints}
              currentUser={currentUser}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onAddSprint={handleAddSprint}
              onUpdateSprint={handleUpdateSprint}
              onClientClick={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarAgenda
              clients={clients}
              tasks={tasks}
              agendaEvents={agendaEvents}
              currentUser={currentUser}
              onAddAgendaEvent={handleAddAgendaEvent}
              onToggleTask={handleToggleTask}
              onClientClick={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'activities' && (
            <ActivityFeed
              activities={activities}
              clients={clients}
              onClientClick={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'excel' && (
            <ExcelImportExport
              clients={clients}
              sprints={sprints}
              setClients={setClients}
              logEvent={logEventHelper}
            />
          )}

          {activeTab === 'config' && (
            <ConfigPanel
              clients={clients}
              tasks={tasks}
              notes={notes}
              activities={activities}
              agendaEvents={agendaEvents}
              sprints={sprints}
              setClients={setClients}
              setTasks={setTasks}
              setNotes={setNotes}
              setActivities={setActivities}
              setAgendaEvents={setAgendaEvents}
              setSprints={setSprints}
              isDark={isDark}
              toggleTheme={toggleTheme}
              onSeedDemoData={handleSeedDemoData}
              syncRoomId={syncRoomId}
              syncing={syncing}
              onStartSync={handleStartSync}
              onUnlinkSync={handleUnlinkSync}
            />
          )}
        </>
      )}

      {/* Drawer Detalle de Cliente (Notion style modal centrado) */}
      {selectedClient && (
        <ClientDetail
          client={selectedClient}
          notes={notes}
          tasks={tasks}
          activities={activities}
          currentUser={currentUser}
          onClose={() => setSelectedClient(null)}
          onUpdateClient={handleUpdateClient}
          onAddNote={handleAddNote}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteClient={handleDeleteClient}
        />
      )}

      {/* Modal para Nuevo Cliente */}
      {newClientModalOpen && (
        <NewClientModal
          currentUser={currentUser}
          onClose={() => setNewClientModalOpen(false)}
          onCreateClient={handleCreateClient}
        />
      )}

    </MainLayout>
  );
}
