import React, { useState } from 'react';
import { INTEGRANTES, ESTADOS_PIPELINE } from '../mockData';
import { X, Building2, User, Mail, Phone, DollarSign, Tag, AlertCircle, Calendar, Play } from 'lucide-react';

export default function NewClientModal({ onClose, onCreateClient, currentUser }) {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('Prospecto');
  const [responsableId, setResponsableId] = useState(currentUser.id);
  const [valorEstimado, setValorEstimado] = useState(0);
  const [prioridad, setPrioridad] = useState('Media');
  const [fechaSeguimiento, setFechaSeguimiento] = useState('');
  const [proximaAccion, setProximaAccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !empresa.trim()) return;

    onCreateClient({
      nombre,
      empresa,
      correo,
      telefono,
      estado,
      responsableId: responsableId || null,
      valorEstimado: Number(valorEstimado) || 0,
      prioridad,
      fechaSeguimiento: fechaSeguimiento || null,
      proximaAccion: proximaAccion || '',
      camposPersonalizados: [],
      ultimoContacto: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[92%] bg-notion-card-light dark:bg-notion-card-dark border border-notion-border-light dark:border-notion-border-dark rounded-xl shadow-2xl z-50 overflow-hidden transition-all p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-notion-border-light dark:border-notion-border-dark pb-3">
          <h3 className="font-bold text-sm text-notion-text-light dark:text-notion-text-dark">Registrar Nuevo Cliente</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-notion-border-light dark:hover:bg-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:text-notion-text-light dark:hover:text-notion-text-dark"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Nombre y Empresa */}
          <div className="space-y-1">
            <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Nombre del Contacto *</label>
            <div className="relative">
              <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
              <input
                type="text"
                required
                placeholder="Ej. Carlos Mendoza"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Empresa / Organización *</label>
            <div className="relative">
              <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
              <input
                type="text"
                required
                placeholder="Ej. Apex Solutions"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Correo y Teléfono */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Correo Electrónico</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
                <input
                  type="email"
                  placeholder="nombre@empresa.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Teléfono</label>
              <div className="relative">
                <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
                <input
                  type="text"
                  placeholder="Ej. +52 55..."
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Estado, Integrante y Prioridad */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Estado</label>
              <div className="relative">
                <Tag size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark pointer-events-none" />
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full pl-7.5 pr-2 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
                >
                  {ESTADOS_PIPELINE.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Asignado a</label>
              <div className="relative">
                <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark pointer-events-none" />
                <select
                  value={responsableId}
                  onChange={(e) => setResponsableId(e.target.value)}
                  className="w-full pl-7.5 pr-2 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
                >
                  {INTEGRANTES.map(user => (
                    <option key={user.id} value={user.id}>{user.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Prioridad</label>
              <div className="relative">
                <AlertCircle size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark pointer-events-none" />
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="w-full pl-7.5 pr-2 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seguimiento Inicial y Monto (MXN) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Próx. Seguimiento</label>
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
                <input
                  type="date"
                  value={fechaSeguimiento}
                  onChange={(e) => setFechaSeguimiento(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Monto Estimado (MXN)</label>
              <div className="relative">
                <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
                <input
                  type="number"
                  min="0"
                  placeholder="Ej. 25000"
                  value={valorEstimado}
                  onChange={(e) => setValorEstimado(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-notion-text-muted-light dark:text-notion-text-muted-dark">Próxima acción planificada</label>
            <div className="relative">
              <Play size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-notion-text-muted-light dark:text-notion-text-muted-dark" />
              <input
                type="text"
                placeholder="Ej. Enviar cotización formal por correo"
                value={proximaAccion}
                onChange={(e) => setProximaAccion(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-notion-border-light dark:border-notion-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-notion-border-light dark:border-notion-border-dark text-notion-text-muted-light dark:text-notion-text-muted-dark hover:bg-notion-border-light/20 text-xs font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Registrar Cliente
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
