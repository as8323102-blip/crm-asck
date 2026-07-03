import React, { useState, useEffect } from 'react';
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

import { 
  INTEGRANTES, 
  CLIENTES_INICIALES, 
  NOTAS_INICIALES, 
  TAREAS_INICIALES,
  ACTIVIDADES_INICIALES,
  AGENDA_INICIAL,
  SPRINTS_INICIALES
} from './mockData';

import { useClients } from './hooks/useClients';
import { useTasks } from './hooks/useTasks';
import { useSprints } from './hooks/useSprints';
import { useCalendar } from './hooks/useCalendar';
import { useActivity } from './hooks/useActivity';
import { useAppView } from './hooks/useAppView';
import { useAuth } from './hooks/useAuth';
import { useSupabaseRealtime } from './hooks/useSupabaseRealtime';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  // Custom hooks para modularizar el CRM v1.8
  const { activeTab, setActiveTab } = useAppView();
  const { currentUser, setCurrentUser } = useAuth();
  const { activities, setActivities, loadActivities, logEvent } = useActivity();
  
  // Helper para logging que inyectamos a los hooks
  const logEventHelper = (actionText, clientId = null) => {
    return logEvent(actionText, currentUser, clientId);
  };

  // useTasks maneja la lista de tareas y operaciones
  const {
    tasks,
    setTasks,
    loadTasks,
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
    loadClientsAndNotes,
    handleMoveClient,
    handleUpdateClient,
    handleCreateClient,
    handleDeleteClient,
    handleAddNote
  } = useClients(currentUser, logEventHelper, tasks, setTasks);

  const {
    sprints,
    setSprints,
    loadSprints,
    handleAddSprint,
    handleUpdateSprint
  } = useSprints(logEventHelper);

  const {
    agendaEvents,
    setAgendaEvents,
    loadCalendarEvents,
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

  // Cargar datos asíncronos (sembrando base si es la primera vez)
  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const seededV18 = localStorage.getItem('asck_crm_seeded_v1_8') === 'true';

        if (!seededV18) {
          // Sembrado inicial v1.8
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
        } else {
          // Carga normal vía servicios locales
          await loadClientsAndNotes();
          await loadTasks();
          await loadActivities();
          await loadCalendarEvents();
          await loadSprints();
        }
      } catch (err) {
        console.error("Error inicializando datos en el CRM:", err);
      } finally {
        setLoading(false);
      }
    }
    initData();
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
              logEvent={logEvent}
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
