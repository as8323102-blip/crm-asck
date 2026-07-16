import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Calendar,
  History,
  TrendingUp,
  ArrowRightLeft,
  Calculator
} from 'lucide-react';
import { INTEGRANTES } from '../mockData';
import { formatMXN, convertCurrency, TASA_CAMBIO_FIJA } from '../utils/currency';

export default function DashboardSummary({ 
  clients, 
  tasks, 
  activities = [],
  toggleTask, 
  addTask,
  currentUser,
  onClientClick
}) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskClient, setNewTaskClient] = useState('');

  // Estados del Conversor de Divisas
  const [convAmount, setConvAmount] = useState('100');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('MXN');

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Estadísticas básicas (en MXN)
  const totalClients = clients.length;
  const activePipelineValue = clients
    .filter(c => c.estado !== 'Perdido / pausado' && c.estado !== 'Cerrado')
    .reduce((sum, c) => sum + (c.valorEstimado || 0), 0);

  const wonClients = clients.filter(c => c.estado === 'Cerrado').length;
  
  const userTasks = tasks.filter(t => t.asignadoA === currentUser.id);
  const pendingUserTasks = userTasks.filter(t => !t.completada);

  // 2. Valores por etapa
  const stages = ['Prospecto', 'Contactado', 'Negociación', 'Cerrado', 'Perdido / pausado'];
  const valueByStage = stages.reduce((acc, stage) => {
    acc[stage] = clients
      .filter(c => c.estado === stage)
      .reduce((sum, c) => sum + (c.valorEstimado || 0), 0);
    return acc;
  }, {});

  // 3. Conversión del conversor
  const convertedResult = convertCurrency(Number(convAmount) || 0, fromCurr, toCurr);

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask({
      titulo: newTaskTitle,
      clienteId: newTaskClient || null,
      asignadoA: currentUser.id,
      completada: false,
      estado: "Pendiente",
      prioridad: "Media",
      fechaLimite: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      horaLimite: "12:00"
    });
    
    setNewTaskTitle('');
    setNewTaskClient('');
  };

  return (
    <div className="space-y-6">
      
      {/* Fila de Métricas Principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-3.5 sm:p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow hover-glow flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider truncate">Clientes Totales</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
              <Users size={14} className="sm:size-[16px]" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-1 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold text-notion-text-light dark:text-notion-text-dark tracking-tight">{totalClients}</span>
            <span className="text-[8px] sm:text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">Registrados</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow hover-glow flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider truncate">Pipeline Activo</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-500 flex-shrink-0">
              <DollarSign size={14} className="sm:size-[16px]" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex flex-col justify-end">
            <span className="text-base sm:text-xl font-extrabold text-notion-text-light dark:text-notion-text-dark tracking-tight truncate">
              {formatMXN(activePipelineValue)}
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow hover-glow flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider truncate">Tus Pendientes</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Clock size={14} className="sm:size-[16px]" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-1 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold text-notion-text-light dark:text-notion-text-dark tracking-tight">{pendingUserTasks.length}</span>
            <span className="text-[8px] sm:text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider">Tareas</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow hover-glow flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider truncate">Cierres Exitosos</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <CheckCircle size={14} className="sm:size-[16px]" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-1 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold text-notion-text-light dark:text-notion-text-dark tracking-tight">{wonClients}</span>
            <span className="text-[8px] sm:text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">Ganados</span>
          </div>
        </div>

      </div>

      {/* Grid Intermedio: Pipeline por Etapas + Conversor de Moneda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pipeline por Etapa */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-4">
          <div className="flex items-center gap-2 text-indigo-500">
            <TrendingUp size={16} />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-notion-text-light dark:text-notion-text-dark">Distribución del Embudo (MXN)</h3>
          </div>
          <div className="space-y-3.5">
            {stages.map(stage => {
              const val = valueByStage[stage] || 0;
              const maxVal = Math.max(...Object.values(valueByStage), 1);
              const pct = (val / maxVal) * 100;
              return (
                <div key={stage} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-notion-text-light dark:text-notion-text-dark">{stage}</span>
                    <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark">{formatMXN(val)}</span>
                  </div>
                  <div className="w-full bg-[#EBEBE9] dark:bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        stage === 'Prospecto' ? 'bg-blue-500' :
                        stage === 'Contactado' ? 'bg-amber-500' :
                        stage === 'Negociación' ? 'bg-purple-500' :
                        stage === 'Cerrado' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversor de Moneda Interno (MXN/USD) */}
        <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-500">
              <Calculator size={16} />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-notion-text-light dark:text-notion-text-dark">Conversor de Divisas</h3>
            </div>
            <p className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark leading-snug">
              Tasa fija del sistema: 1 USD = {TASA_CAMBIO_FIJA} MXN
            </p>
          </div>

          <div className="space-y-3 text-xs flex-1">
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Monto a convertir</label>
              <input
                type="number"
                value={convAmount}
                onChange={(e) => setConvAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">De:</label>
                <select
                  value={fromCurr}
                  onChange={(e) => {
                    setFromCurr(e.target.value);
                    setToCurr(e.target.value === 'USD' ? 'MXN' : 'USD');
                  }}
                  className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 text-notion-text-light dark:text-notion-text-dark"
                >
                  <option value="USD">USD ($)</option>
                  <option value="MXN">MXN (Mex$)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">A:</label>
                <select
                  value={toCurr}
                  onChange={(e) => {
                    setToCurr(e.target.value);
                    setFromCurr(e.target.value === 'USD' ? 'MXN' : 'USD');
                  }}
                  className="w-full px-2 py-1.5 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 text-notion-text-light dark:text-notion-text-dark"
                >
                  <option value="MXN">MXN (Mex$)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            {/* Resultado */}
            <div className="p-3 rounded-lg bg-[#fbfbfa]/50 dark:bg-slate-900/50 border border-notion-border-light/55 dark:border-notion-border-dark/55 flex flex-col justify-center items-center text-center mt-2.5">
              <span className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider font-semibold">Resultado Convertido</span>
              <span className="text-base font-extrabold text-indigo-500 mt-1">
                {toCurr === 'MXN' ? formatMXN(convertedResult) : `$${convertedResult.toLocaleString('es-MX', { maximumFractionDigits: 2 })} USD`}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Widget 4: Desempeño y KPIs del Equipo */}
      <div className="p-6 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={16} className="text-indigo-500" />
            <h3 className="font-semibold text-sm text-notion-text-light dark:text-notion-text-dark">Rendimiento y KPIs del Equipo</h3>
          </div>
          <span className="text-[10px] uppercase font-bold text-notion-text-muted-light dark:text-notion-text-muted-dark tracking-wider">Métricas de Ventas y Tareas</span>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {INTEGRANTES.map(member => {
            const memberClients = clients.filter(c => c.responsableId === member.id);
            const totalLeads = memberClients.length;
            
            const pipelineVal = memberClients
              .filter(c => c.estado !== 'Perdido / pausado' && c.estado !== 'Cerrado')
              .reduce((sum, c) => sum + (c.valorEstimado || 0), 0);

            const closedVal = memberClients
              .filter(c => c.estado === 'Cerrado')
              .reduce((sum, c) => sum + (c.valorEstimado || 0), 0);

            const memberTasks = tasks.filter(t => t.asignadoA === member.id);
            const completedTasks = memberTasks.filter(t => t.completada).length;
            const totalTasks = memberTasks.length;
            const taskPct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return (
              <div 
                key={member.id}
                className="p-3 sm:p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-[#fbfbfa]/30 dark:bg-slate-900/30 space-y-3 sm:space-y-4 hover:border-indigo-500/20 transition-all flex flex-col justify-between"
              >
                {/* Perfil con tamaño de imagen controlado por contenedor */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-indigo-500/10 shadow-sm bg-indigo-50 dark:bg-indigo-950 flex-shrink-0 overflow-hidden">
                    <img src={member.avatarUrl} alt={member.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-notion-text-light dark:text-notion-text-dark truncate">{member.nombre}</div>
                    <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark truncate">{member.rol}</div>
                  </div>
                </div>

                {/* Métricas clave */}
                <div className="grid grid-cols-3 gap-1 py-2 border-y border-notion-border-light/40 dark:border-notion-border-dark/40 text-center">
                  <div>
                    <div className="text-[9px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight">Leads</div>
                    <div className="text-xs font-bold text-notion-text-light dark:text-notion-text-dark mt-0.5">{totalLeads}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight">Pipe</div>
                    <div className="text-xs font-bold text-indigo-500 mt-0.5" title={formatMXN(pipelineVal)}>
                      ${pipelineVal >= 1000 ? `${(pipelineVal / 1000).toFixed(0)}k` : pipelineVal}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-tight">Cierres</div>
                    <div className="text-xs font-bold text-emerald-500 mt-0.5" title={formatMXN(closedVal)}>
                      ${closedVal >= 1000 ? `${(closedVal / 1000).toFixed(0)}k` : closedVal}
                    </div>
                  </div>
                </div>

                {/* Tareas Progreso */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] font-medium">
                    <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark">Tareas TÚDU: {completedTasks}/{totalTasks}</span>
                    <span className="text-notion-text-light dark:text-notion-text-dark font-bold">{taskPct}%</span>
                  </div>
                  <div className="w-full bg-[#EBEBE9] dark:bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${taskPct}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
