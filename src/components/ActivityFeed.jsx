import React, { useState } from 'react';
import { INTEGRANTES } from '../mockData';
import { Calendar, User, Info, ArrowUpRight, Search } from 'lucide-react';

export default function ActivityFeed({ activities, clients, onClientClick }) {
  const [filterUser, setFilterUser] = useState('Todos');

  const filtered = activities.filter(act => {
    if (filterUser === 'Todos') return true;
    return act.autorId === filterUser;
  });

  return (
    <div className="space-y-6">
      
      {/* Controles de Filtros */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
        <div>
          <h3 className="font-semibold text-sm text-notion-text-light dark:text-notion-text-dark">Historial de Actividad</h3>
          <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark mt-0.5">Acciones y eventos recientes del equipo</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Filtrar por:</label>
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-2 py-1 rounded border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs cursor-pointer"
          >
            <option value="Todos">Todos los integrantes</option>
            {INTEGRANTES.map(user => (
              <option key={user.id} value={user.id}>{user.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Feed list */}
      <div className="border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark rounded-xl p-6 notion-shadow">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark">
            Sin registros de actividad con los filtros seleccionados.
          </div>
        ) : (
          <div className="relative border-l border-notion-border-light dark:border-notion-border-dark ml-3.5 space-y-6">
            {filtered.map((act) => {
              const author = INTEGRANTES.find(i => i.id === act.autorId);
              const client = act.clienteId ? clients.find(c => c.id === act.clienteId) : null;
              
              return (
                <div key={act.id} className="relative pl-6 group">
                  <span className="absolute -left-[16px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark shadow-sm">
                    {author ? (
                      <img 
                        src={author.avatarUrl} 
                        alt={author.nombre} 
                        className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950" 
                      />
                    ) : (
                      <Info size={12} className="text-indigo-500" />
                    )}
                  </span>

                  {/* Content Container */}
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5">
                      
                      {/* Actor + Action */}
                      <span className="text-notion-text-light dark:text-notion-text-dark leading-snug">
                        <strong className="font-semibold">{author ? author.nombre : 'Sistema'}</strong>
                        <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark mx-1.5">
                          {act.accion}
                        </span>
                        {client && (
                          <button
                            onClick={() => onClientClick(client)}
                            className="inline-flex items-center gap-0.5 text-indigo-500 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                          >
                            <span>{client.nombre}</span>
                            <ArrowUpRight size={10} />
                          </button>
                        )}
                      </span>

                      {/* Timestamp */}
                      <span className="text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark font-mono self-start sm:self-center">
                        {new Date(act.createdAt).toLocaleString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
