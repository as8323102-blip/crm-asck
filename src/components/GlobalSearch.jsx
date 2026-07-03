import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CheckSquare, User, Tag } from 'lucide-react';
import { INTEGRANTES } from '../mockData';

export default function GlobalSearch({ 
  clients, 
  notes, 
  tasks, 
  onClientClick, 
  setActiveTab 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ clients: [], tasks: [], notes: [] });
  const modalRef = useRef(null);

  // Escuchar tecla Ctrl+K o Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Buscar en tiempo real
  useEffect(() => {
    if (!query.trim()) {
      setResults({ clients: [], tasks: [], notes: [] });
      return;
    }

    const q = query.toLowerCase();

    const matchedClients = clients.filter(c => 
      c.nombre.toLowerCase().includes(q) ||
      c.empresa.toLowerCase().includes(q) ||
      (c.correo && c.correo.toLowerCase().includes(q)) ||
      c.estado.toLowerCase().includes(q)
    );

    const matchedTasks = tasks.filter(t => 
      t.titulo.toLowerCase().includes(q) ||
      (t.prioridad && t.prioridad.toLowerCase().includes(q))
    );

    const matchedNotes = notes.filter(n => 
      n.contenido.toLowerCase().includes(q)
    );

    setResults({
      clients: matchedClients.slice(0, 5),
      tasks: matchedTasks.slice(0, 5),
      notes: matchedNotes.slice(0, 5)
    });

  }, [query, clients, tasks, notes]);

  // Cerrar al dar clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelectClient = (client) => {
    setIsOpen(false);
    setQuery('');
    onClientClick(client);
  };

  const handleSelectTask = (task) => {
    setIsOpen(false);
    setQuery('');
    setActiveTab('tasks');
  };

  const hasResults = results.clients.length > 0 || results.tasks.length > 0 || results.notes.length > 0;

  return (
    <>
      {/* Botón disparador visible en la cabecera */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-[#F4F4F2] dark:bg-[#202020] text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark text-xs w-48 sm:w-64 transition-all text-left shadow-sm hover:shadow"
      >
        <span className="flex items-center gap-2">
          <Search size={14} />
          <span>Buscar...</span>
        </span>
        <span className="text-[10px] bg-notion-border-light dark:bg-notion-border-dark px-1.5 py-0.5 rounded font-mono text-[9px] font-bold">
          Ctrl+K
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4">
          
          {/* Contenedor principal estilo Notion */}
          <div 
            ref={modalRef}
            className="w-full max-w-lg rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark shadow-2xl overflow-hidden flex flex-col max-h-[60vh] transition-all"
          >
            {/* Input de Búsqueda */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-notion-border-light dark:border-notion-border-dark bg-[#fbfbfa]/50 dark:bg-[#191919]/50">
              <Search size={16} className="text-notion-text-muted-light dark:text-notion-text-muted-dark flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Buscar clientes, tareas, notas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-notion-text-light dark:text-notion-text-dark border-none focus:outline-none focus:ring-0"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-notion-border-light dark:hover:bg-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark"
              >
                <X size={14} />
              </button>
            </div>

            {/* Resultados */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {!query.trim() ? (
                <div className="text-center py-8 text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark">
                  Escribe algo para iniciar la búsqueda en el hub de ASCK.
                </div>
              ) : !hasResults ? (
                <div className="text-center py-8 text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark">
                  No se encontraron resultados para "{query}"
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Categoría: Clientes */}
                  {results.clients.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider px-2">
                        Clientes / Leads
                      </div>
                      <div className="space-y-0.5">
                        {results.clients.map(c => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectClient(c)}
                            className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 text-xs transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-[8px]">
                                C
                              </span>
                              <span className="font-semibold text-notion-text-light dark:text-notion-text-dark">{c.nombre}</span>
                              <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark">({c.empresa})</span>
                            </div>
                            <span className="text-[9px] bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-1.5 py-0.2 rounded font-semibold">
                              {c.estado}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categoría: Tareas */}
                  {results.tasks.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider px-2">
                        Tareas (TÚDU)
                      </div>
                      <div className="space-y-0.5">
                        {results.tasks.map(t => (
                          <button
                            key={t.id}
                            onClick={() => handleSelectTask(t)}
                            className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 text-xs transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <CheckSquare size={12} className={t.completada ? 'text-emerald-500' : 'text-notion-text-muted-light dark:text-notion-text-muted-dark'} />
                              <span className={`truncate font-medium text-notion-text-light dark:text-notion-text-dark ${t.completada ? 'line-through text-notion-text-muted-light dark:text-notion-text-muted-dark' : ''}`}>
                                {t.titulo}
                              </span>
                            </div>
                            {t.prioridad && (
                              <span className={`text-[9px] font-semibold px-1 rounded ${
                                t.prioridad === 'Alta' ? 'bg-rose-500/10 text-rose-500' :
                                t.prioridad === 'Media' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                              }`}>
                                {t.prioridad}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categoría: Notas */}
                  {results.notes.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider px-2">
                        Notas de Seguimiento
                      </div>
                      <div className="space-y-0.5">
                        {results.notes.map(n => {
                          const linkedClient = clients.find(c => c.id === n.clienteId);
                          return (
                            <button
                              key={n.id}
                              onClick={() => linkedClient ? handleSelectClient(linkedClient) : null}
                              className="w-full text-left p-2 rounded-lg hover:bg-notion-border-light/40 dark:hover:bg-notion-border-dark/40 text-xs transition-colors space-y-1 block"
                            >
                              <div className="text-[10px] font-semibold text-indigo-500">
                                En: {linkedClient ? `${linkedClient.nombre} (${linkedClient.empresa})` : 'Cliente desconocido'}
                              </div>
                              <p className="text-notion-text-light dark:text-notion-text-dark truncate text-[11px] leading-snug">
                                "{n.contenido}"
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-notion-border-light dark:border-notion-border-dark bg-[#fbfbfa] dark:bg-[#1c1c1c] text-[10px] text-notion-text-muted-light dark:text-notion-text-muted-dark flex items-center justify-between">
              <span>Selecciona una fila para navegar</span>
              <span>ESC para cerrar</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
