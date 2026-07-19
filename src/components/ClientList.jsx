import React, { useState } from 'react';
import { INTEGRANTES } from '../mockData';
import { 
  Search, 
  Tag, 
  Building2, 
  User, 
  Mail, 
  Phone
} from 'lucide-react';
import { formatMXN } from '../utils/currency';
import { estadoCliente } from '../utils/statusStyles';

export default function ClientList({ clients, onClientClick }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [ownerFilter, setOwnerFilter] = useState('Todos');

  // Filtrado de clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.nombre.toLowerCase().includes(search.toLowerCase()) ||
      client.empresa.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || client.estado === statusFilter;
    const matchesOwner = ownerFilter === 'Todos' || client.responsableId === ownerFilter;

    return matchesSearch && matchesStatus && matchesOwner;
  });

  const uniqueStatuses = ["Todos", "Prospecto", "Contactado", "Negociación", "Cerrado", "Perdido / pausado"];

  return (
    <div className="space-y-4 view-fade">
      {/* Controles de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark notion-shadow">
        
        {/* Barra de búsqueda */}
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
          <input
            type="text"
            aria-label="Buscar clientes"
            placeholder="Buscar por nombre o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {/* Filtro Estado */}
          <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark px-2 py-1.5 rounded-lg">
            <Tag size={12} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filtrar por estado"
              className="bg-transparent text-xs text-notion-text-light dark:text-notion-text-dark focus:outline-none cursor-pointer"
            >
              {uniqueStatuses.map(status => (
                <option key={status} value={status} className="dark:bg-[#202020]">{status === 'Todos' ? 'Estados: Todos' : status}</option>
              ))}
            </select>
          </div>

          {/* Filtro Responsable */}
          <div className="flex items-center gap-1.5 border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark px-2 py-1.5 rounded-lg">
            <User size={12} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              aria-label="Filtrar por responsable"
              className="bg-transparent text-xs text-notion-text-light dark:text-notion-text-dark focus:outline-none cursor-pointer"
            >
              <option value="Todos" className="dark:bg-[#202020]">Responsable: Todos</option>
              {INTEGRANTES.map(user => (
                <option key={user.id} value={user.id} className="dark:bg-[#202020]">{user.nombre}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Lista / Tabla de Clientes */}
      <div className="border border-notion-border-light dark:border-notion-border-dark bg-notion-card-light dark:bg-notion-card-dark rounded-xl overflow-hidden notion-shadow">
        {filteredClients.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-center py-12 text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark">
            <Search size={18} className="opacity-50" aria-hidden="true" />
            <span>No se encontraron clientes con los filtros seleccionados.</span>
            <span className="text-[10px] opacity-70">Ajusta la búsqueda o limpia los filtros para ver toda la cartera.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Lista de clientes</caption>
              <thead>
                <tr className="border-b border-notion-border-light dark:border-notion-border-dark text-[11px] font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark uppercase tracking-wider bg-notion-border-light/10 dark:bg-notion-border-dark/10">
                  <th scope="col" className="py-3 px-4">Cliente</th>
                  <th scope="col" className="py-3 px-4">Empresa</th>
                  <th scope="col" className="py-3 px-4">Estado</th>
                  <th scope="col" className="py-3 px-4">Responsable</th>
                  <th scope="col" className="py-3 px-4">Contacto</th>
                  <th scope="col" className="py-3 px-4 text-right">Monto Estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-notion-border-light dark:divide-notion-border-dark text-xs">
                {filteredClients.map((client) => {
                  const owner = INTEGRANTES.find(i => i.id === client.responsableId);
                  return (
                    <tr
                      key={client.id}
                      onClick={() => onClientClick(client)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Abrir cliente ${client.nombre}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onClientClick(client);
                        }
                      }}
                      className="hover:bg-notion-border-light/20 dark:hover:bg-notion-border-dark/20 cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                    >
                      {/* Cliente */}
                      <td className="py-3.5 px-4 font-semibold text-notion-text-light dark:text-notion-text-dark">
                        {client.nombre}
                      </td>
                      
                      {/* Empresa */}
                      <td className="py-3.5 px-4 text-notion-text-muted-light dark:text-notion-text-muted-dark">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={12} className="text-notion-text-muted-light dark:text-notion-text-muted-dark" />
                          <span>{client.empresa}</span>
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4">
                        <span className={`chip text-[10px] ${estadoCliente(client.estado).chip}`}>
                          <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${estadoCliente(client.estado).dot}`}></span>
                          {client.estado}
                        </span>
                      </td>

                      {/* Responsable */}
                      <td className="py-3.5 px-4">
                        {owner ? (
                          <div className="flex items-center gap-1.5">
                            <img src={owner.avatarUrl} alt={owner.nombre} loading="lazy" width={20} height={20} className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950" />
                            <span className="text-notion-text-light dark:text-notion-text-dark font-medium">{owner.nombre}</span>
                          </div>
                        ) : (
                          <span className="text-notion-text-muted-light dark:text-notion-text-muted-dark">Sin asignar</span>
                        )}
                      </td>

                      {/* Contacto */}
                      <td className="py-3.5 px-4 space-y-0.5 text-notion-text-muted-light dark:text-notion-text-muted-dark">
                        {client.correo && (
                          <div className="flex items-center gap-1">
                            <Mail size={10} />
                            <span className="truncate">{client.correo}</span>
                          </div>
                        )}
                        {client.telefono && (
                          <div className="flex items-center gap-1">
                            <Phone size={10} />
                            <span>{client.telefono}</span>
                          </div>
                        )}
                      </td>

                      {/* Monto */}
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold text-notion-text-light dark:text-notion-text-dark">
                        {formatMXN(client.valorEstimado)}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
