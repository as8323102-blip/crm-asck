import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  List, 
  CheckSquare,
  Calendar,
  History,
  X, 
  PlusCircle, 
  Moon, 
  Sun, 
  Menu, 
  ChevronDown,
  FileSpreadsheet,
  Settings,
  Briefcase
} from 'lucide-react';
import { INTEGRANTES } from '../mockData';
import GlobalSearch from '../components/GlobalSearch';

export default function MainLayout({ 
  children, 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setCurrentUser, 
  isDark, 
  toggleTheme,
  onNewClientClick,
  clients,
  notes,
  tasks,
  onClientClick,
  onlineStatus = 'Modo local'
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Panel General', icon: LayoutDashboard },
    { id: 'kanban', name: 'Tablero de Ventas', icon: KanbanSquare },
    { id: 'list', name: 'Lista de Clientes', icon: List },
    { id: 'tasks', name: 'Tablero de Tareas', icon: CheckSquare },
    { id: 'delegation', name: 'Delegación de Pendientes', icon: Briefcase },
    { id: 'calendar', name: 'Agenda', icon: Calendar },
    { id: 'activities', name: 'Historial', icon: History },
    { id: 'excel', name: 'Importar / Exportar', icon: FileSpreadsheet },
    { id: 'config', name: 'Configuración', icon: Settings }
  ];

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Resumen General';
      case 'kanban': return 'Tablero de Ventas';
      case 'list': return 'Lista de Clientes';
      case 'tasks': return 'Tablero de Tareas';
      case 'delegation': return 'Delegación de Pendientes (Tareas ASCK)';
      case 'calendar': return 'Agenda de Seguimiento';
      case 'activities': return 'Historial del Equipo';
      case 'excel': return 'Importación y Exportación de Datos';
      case 'config': return 'Panel de Configuración';
      default: return 'CRM ASCK';
    }
  };

  const getStatusColorClass = () => {
    switch (onlineStatus) {
      case 'ASCK Hub Online': return 'bg-emerald-500';
      case 'Sincronizando...': return 'bg-amber-500';
      case 'Error de conexión': return 'bg-rose-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen flex bg-notion-bg-light dark:bg-notion-bg-dark transition-colors duration-200">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-notion-border-light dark:border-notion-border-dark
        bg-[#F7F7F5] dark:bg-[#070a13] flex flex-col justify-between transform transition-transform duration-200 lg:transform-none lg:relative
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo ASCK Software */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-notion-border-light dark:border-notion-border-dark">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 p-0.5 flex-shrink-0 overflow-hidden">
                <img src="/logo_asck.svg" alt="ASCK Logo" className="w-full h-full object-contain dark:invert" />
              </div>
              <div>
                <span className="font-semibold text-sm tracking-wide block text-notion-text-light dark:text-notion-text-dark">ASCK Software</span>
                <span className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-widest font-medium">CRM Interno v1.8</span>
              </div>
            </div>
            <button 
              className="p-1 rounded lg:hidden text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light dark:hover:bg-notion-border-dark"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 space-y-1">
            <button 
              onClick={onNewClientClick}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <PlusCircle size={14} />
              <span>Registrar Prospecto</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors
                    ${isActive 
                      ? 'bg-notion-border-light dark:bg-notion-border-dark text-notion-text-light dark:text-notion-text-dark font-semibold' 
                      : 'text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 hover:text-notion-text-light dark:hover:text-notion-text-dark'}
                  `}
                >
                  <Icon size={15} className={isActive ? 'text-indigo-500' : 'text-notion-text-muted-light dark:text-notion-text-muted-dark'} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Active simulated user + theme switch) */}
        <div className="p-4 border-t border-notion-border-light dark:border-notion-border-dark space-y-3 bg-[#F7F7F5] dark:bg-[#070a13]">
          
          {/* Simulated Active User Selector */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark text-left transition-all hover:bg-notion-border-light/30 dark:hover:bg-notion-border-dark/30"
            >
              <div className="flex items-center gap-2">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.nombre} 
                  className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950" 
                />
                <div>
                  <div className="text-xs font-semibold text-notion-text-light dark:text-notion-text-dark leading-tight">{currentUser.nombre}</div>
                  <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark leading-none">{currentUser.rol}</div>
                </div>
              </div>
              <ChevronDown size={14} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
            </button>

            {userDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                <div className="absolute bottom-full left-0 w-full mb-1 bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-lg shadow-xl overflow-hidden z-20 transition-all">
                  {INTEGRANTES.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setCurrentUser(user);
                        setUserDropdownOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-2 px-3 py-2 text-left text-xs transition-colors
                        ${currentUser.id === user.id 
                          ? 'bg-notion-border-light dark:bg-notion-border-dark font-medium' 
                          : 'hover:bg-notion-border-light/50 dark:hover:bg-notion-border-dark/50'}
                      `}
                    >
                      <img src={user.avatarUrl} alt={user.nombre} className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950" />
                      <div>
                        <div className="text-notion-text-light dark:text-notion-text-dark font-medium">{user.nombre}</div>
                        <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark">{user.rol}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark bg-notion-card-light dark:bg-notion-card-dark transition-all"
          >
            <span className="flex items-center gap-2">
              {isDark ? <Sun size={14} className="text-amber-500" /> : <Moon size={14} className="text-indigo-500" />}
              <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </span>
            <span className="text-[10px] uppercase bg-notion-border-light dark:bg-notion-border-dark px-1.5 py-0.5 rounded text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono">
              {isDark ? 'Dark' : 'Light'}
            </span>
          </button>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark flex items-center justify-between px-6 z-30 transition-colors duration-200">
          <div className="flex items-center gap-4">
            <button 
              className="p-1 rounded lg:hidden text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light dark:hover:bg-notion-border-dark"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-base capitalize text-notion-text-light dark:text-notion-text-dark hidden sm:block">
              {getTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Buscador Global Integrado */}
            <GlobalSearch 
              clients={clients}
              notes={notes}
              tasks={tasks}
              onClientClick={onClientClick}
              setActiveTab={setActiveTab}
            />
            
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark border border-notion-border-light dark:border-notion-border-dark px-2.5 py-1 rounded-full bg-[#fbfbfa]/50 dark:bg-[#191919]/50">
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusColorClass()} animate-pulse`}></span>
              <span>{onlineStatus}</span>
            </div>
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.nombre} 
              className="w-8 h-8 rounded-full border border-indigo-500/20 shadow-sm bg-indigo-50 dark:bg-indigo-950" 
            />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
