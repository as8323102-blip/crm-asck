import React, { useState } from 'react';
import { INTEGRANTES } from '../mockData';
import {
  ArrowRightLeft,
  Inbox
} from 'lucide-react';
import { formatMXN } from '../utils/currency';
import { estadoCliente, prioridadCliente } from '../utils/statusStyles';

export default function KanbanBoard({ clients, onMoveClient, onClientClick }) {
  const [draggedOverColumn, setDraggedOverColumn] = useState(null);
  const [openMoveMenu, setOpenMoveMenu] = useState(null);

  const columns = [
    { id: 'Prospecto', label: 'Prospectos' },
    { id: 'Contactado', label: 'Contactados' },
    { id: 'Negociación', label: 'Negociación' },
    { id: 'Cerrado', label: 'Cerrados / Ganado' },
    { id: 'Perdido / pausado', label: 'Perdidos / Pausados' }
  ];

  // Drag and Drop Handlers
  const handleDragStart = (e, clientId) => {
    e.dataTransfer.setData('text/plain', clientId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setDraggedOverColumn(null);
    const clientId = e.dataTransfer.getData('text/plain');
    if (clientId) {
      onMoveClient(clientId, targetColumnId);
    }
  };

  const handleMobileMoveState = (e, client, nextState) => {
    e.stopPropagation();
    onMoveClient(client.id, nextState);
    setOpenMoveMenu(null);
  };

  return (
    <div className="space-y-4 text-xs view-fade">

      {/* Grid de Columnas (Kanban) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnClients = clients.filter(c => c.estado === column.id);
          const totalValue = columnClients.reduce((sum, c) => sum + (c.valorEstimado || 0), 0);
          const isOver = draggedOverColumn === column.id;
          const st = estadoCliente(column.id);

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`
                flex flex-col rounded-xl border border-notion-border-light dark:border-notion-border-dark
                bg-notion-card-light dark:bg-notion-card-dark/20 min-h-[450px] max-h-[700px] overflow-hidden transition-all duration-150
                border-t-4 ${st.colTop} ${st.colText}
                ${isOver ? 'ring-2 ring-indigo-500/50 bg-indigo-500/5' : ''}
              `}
            >
              {/* Encabezado de Columna */}
              <div className="p-3 border-b border-notion-border-light dark:border-notion-border-dark flex items-center justify-between bg-notion-card-light dark:bg-notion-card-dark">
                <div className="flex items-center gap-2 min-w-0">
                  <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`}></span>
                  <span className="font-bold text-xs text-notion-text-light dark:text-notion-text-dark truncate">{column.label}</span>
                  <span className="tabular-nums text-[10px] px-1.5 py-0.2 rounded bg-notion-border-light dark:bg-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark font-bold flex-shrink-0">
                    {columnClients.length}
                  </span>
                </div>
                {totalValue > 0 && (
                  <span className="tabular-nums text-[9px] font-extrabold text-notion-text-muted-light dark:text-notion-text-muted-dark flex-shrink-0" title={formatMXN(totalValue)}>
                    {totalValue >= 1000 ? `$${(totalValue / 1000).toFixed(0)}k` : `$${totalValue}`}
                  </span>
                )}
              </div>

              {/* Contenedor de Tarjetas Compactas */}
              <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1 custom-scrollbar">
                {columnClients.length === 0 ? (
                  <div className="flex flex-col items-center gap-1.5 text-center py-8 text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark border border-dashed border-notion-border-light dark:border-notion-border-dark rounded-lg">
                    <Inbox size={16} className="opacity-60" aria-hidden="true" />
                    <span>Sin prospectos en esta etapa.</span>
                    <span className="opacity-70">Arrastra una tarjeta aquí.</span>
                  </div>
                ) : (
                  columnClients.map((client) => {
                    const owner = INTEGRANTES.find(i => i.id === client.responsableId);
                    const prio = prioridadCliente(client.prioridad || 'Baja');
                    const PrioIcon = prio.icon;

                    return (
                      <div
                        key={client.id}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Abrir prospecto ${client.nombre}`}
                        onClick={() => onClientClick(client)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onClientClick(client);
                          }
                        }}
                        onDragStart={(e) => handleDragStart(e, client.id)}
                        className="
                          p-3 rounded-lg border border-notion-border-light dark:border-notion-border-dark
                          bg-notion-card-light dark:bg-notion-card-dark hover:border-indigo-500/40 dark:hover:border-indigo-400/40
                          cursor-grab active:cursor-grabbing transition-all hover:-translate-y-0.5 shadow-sm space-y-1 group relative hover-glow
                        "
                      >
                        {/* Fila 1: Nombre del cliente y prioridad */}
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-[11px] text-notion-text-light dark:text-notion-text-dark truncate leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                            {client.nombre}
                          </h4>
                          <span className={`chip text-[8px] font-extrabold uppercase tracking-wide flex-shrink-0 ${prio.chip}`}>
                            <PrioIcon size={9} aria-hidden="true" />
                            {client.prioridad || 'Baja'}
                          </span>
                        </div>

                        {/* Fila 2: Empresa */}
                        <div className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark leading-none">
                          {client.empresa}
                        </div>

                        {/* Fila 3: Monto · Responsable (Estilo Notion solicitado) */}
                        <div className="flex items-center justify-between pt-1.5 text-[9px] text-notion-text-muted-light dark:text-notion-text-muted-dark border-t border-notion-border-light/20 dark:border-notion-border-dark/20">
                          <div className="flex items-center gap-1">
                            <span className="tabular-nums font-bold text-notion-text-light dark:text-notion-text-dark">
                              {client.valorEstimado ? formatMXN(client.valorEstimado) : '$0 MXN'}
                            </span>
                            <span>·</span>
                            <span>{owner ? owner.nombre : 'Sin asignar'}</span>
                          </div>

                          {owner && (
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-indigo-500/15 bg-indigo-50 dark:bg-indigo-950 flex-shrink-0">
                              <img src={owner.avatarUrl} alt={owner.nombre} loading="lazy" width={20} height={20} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        {/* Control rápido móvil */}
                        <div className="flex lg:hidden justify-end pt-1">
                          <div className="relative inline-flex">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMoveMenu(prev => (prev === client.id ? null : client.id));
                              }}
                              aria-haspopup="menu"
                              aria-expanded={openMoveMenu === client.id}
                              aria-label="Mover a otra etapa"
                              className="p-0.5 rounded hover:bg-notion-border-light dark:hover:bg-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark"
                              title="Mover"
                            >
                              <ArrowRightLeft size={10} />
                            </button>
                            {openMoveMenu === client.id && (
                              <div role="menu" className="absolute right-0 bottom-full mb-1 block bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded shadow-lg z-30 p-1 w-32 space-y-0.5">
                                {columns
                                  .filter(col => col.id !== client.estado)
                                  .map(col => (
                                    <button
                                      key={col.id}
                                      role="menuitem"
                                      onClick={(e) => handleMobileMoveState(e, client, col.id)}
                                      className="w-full text-left text-[9px] px-2 py-0.5 hover:bg-notion-border-light dark:hover:bg-notion-border-dark rounded text-notion-text-light dark:text-notion-text-dark"
                                    >
                                      → {col.label}
                                    </button>
                                  ))
                                }
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
