import { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';
import { noteService } from '../services/noteService';
import { INTEGRANTES } from '../mockData';

export function useClients(currentUser, logEvent, tasks, setTasks) {
  const [clients, setClients] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClientModalOpen, setNewClientModalOpen] = useState(false);

  const loadClientsAndNotes = async () => {
    try {
      const c = await clientService.getClients();
      const n = await noteService.getNotes();
      setClients(c);
      setNotes(n);
      
      // Actualizar cliente seleccionado si está abierto
      if (selectedClient) {
        const updatedSelected = c.find(item => item.id === selectedClient.id);
        if (updatedSelected) setSelectedClient(updatedSelected);
      }
    } catch (e) {
      console.error("Error al cargar clientes/notas:", e);
    }
  };

  // Mover cliente de estado en Kanban
  const handleMoveClient = async (clientId, newStatus) => {
    const target = clients.find(c => c.id === clientId);
    if (!target) return;
    
    const oldStatus = target.estado;
    const updateTime = new Date().toISOString();

    try {
      // 1. Actualizar cliente en servicio
      await clientService.updateClient(clientId, { 
        estado: newStatus, 
        ultimoContacto: updateTime 
      });

      // 2. Registrar nota de cambio de estado
      const sysNote = {
        id: `n-sys-${Date.now()}`,
        clienteId: clientId,
        autorId: currentUser.id,
        contenido: `Estado cambiado de "${oldStatus}" a "${newStatus}".`,
        createdAt: updateTime
      };
      await noteService.createNote(sysNote);

      // 3. Registrar actividad del equipo
      await logEvent(`cambió el estado de "${oldStatus}" a "${newStatus}" para`, clientId);

      // 4. Actualizar estado local
      setClients(prev => 
        prev.map(c => 
          c.id === clientId 
            ? { ...c, estado: newStatus, ultimoContacto: updateTime } 
            : c
        )
      );

      setNotes(prev => [sysNote, ...prev]);

      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(prev => ({ 
          ...prev, 
          estado: newStatus, 
          ultimoContacto: updateTime 
        }));
      }
    } catch (err) {
      console.error("Error en handleMoveClient:", err);
    }
  };

  // Actualizar cliente
  const handleUpdateClient = async (clientId, updates) => {
    const target = clients.find(c => c.id === clientId);
    if (!target) return;

    try {
      await clientService.updateClient(clientId, updates);
      
      // Registrar log de actividad si cambian campos significativos
      if (updates.responsableId && updates.responsableId !== target.responsableId) {
        const newOwner = INTEGRANTES.find(i => i.id === updates.responsableId);
        await logEvent(`asignó como responsable a ${newOwner ? newOwner.nombre : 'Sin asignar'} para`, clientId);
      } else if (updates.prioridad && updates.prioridad !== target.prioridad) {
        await logEvent(`cambió la prioridad a "${updates.prioridad}" para`, clientId);
      } else if (updates.fechaSeguimiento && updates.fechaSeguimiento !== target.fechaSeguimiento) {
        await logEvent(`reprogramó el seguimiento al ${updates.fechaSeguimiento} para`, clientId);
      } else if (updates.nombre && updates.nombre !== target.nombre) {
        await logEvent(`cambió el nombre a "${updates.nombre}" para`, clientId);
      }

      setClients(prev => 
        prev.map(c => 
          c.id === clientId 
            ? { ...c, ...updates } 
            : c
        )
      );

      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(prev => ({ ...prev, ...updates }));
      }
    } catch (err) {
      console.error("Error en handleUpdateClient:", err);
    }
  };

  // Registrar cliente
  const handleCreateClient = async (newClientData) => {
    const clientId = `c-${Date.now()}`;
    const noteId = `n-init-${Date.now()}`;
    const time = new Date().toISOString();

    try {
      const clientToAdd = {
        id: clientId,
        ...newClientData
      };
      // 1. Guardar cliente
      await clientService.createClient(clientToAdd);

      // 2. Nota de registro
      const welcomeNote = {
        id: noteId,
        clienteId: clientId,
        autorId: currentUser.id,
        contenido: `Cliente registrado con monto inicial y responsable asignado.`,
        createdAt: time
      };
      await noteService.createNote(welcomeNote);

      // 3. Actividad
      await logEvent(`registró nuevo cliente`, clientId);

      // 4. Estado local
      setClients(prev => [clientToAdd, ...prev]);
      setNotes(prev => [welcomeNote, ...prev]);
    } catch (err) {
      console.error("Error en handleCreateClient:", err);
    }
  };

  // Eliminar cliente
  const handleDeleteClient = async (clientId) => {
    const target = clients.find(c => c.id === clientId);
    const clientName = target ? target.nombre : 'cliente';
    try {
      await clientService.deleteClient(clientId);
      
      // Registrar log de actividad
      await logEvent(`eliminó al cliente "${clientName}"`);

      setClients(prev => prev.filter(c => c.id !== clientId));
      setNotes(prev => prev.filter(n => n.clienteId !== clientId));
      if (setTasks) {
        setTasks(prev => prev.filter(t => t.clienteId !== clientId));
      }
      setSelectedClient(null);
    } catch (err) {
      console.error("Error en handleDeleteClient:", err);
    }
  };

  // Agregar nota
  const handleAddNote = async (newNoteData) => {
    const noteId = `n-${Date.now()}`;
    const time = new Date().toISOString();
    
    try {
      const noteToAdd = {
        id: noteId,
        ...newNoteData,
        createdAt: time
      };
      await noteService.createNote(noteToAdd);

      // Actualizar último contacto en cliente
      await clientService.updateClient(newNoteData.clienteId, {
        ultimoContacto: time
      });

      // Log actividad
      await logEvent(`agregó una nota de seguimiento para`, newNoteData.clienteId);

      // Local
      setNotes(prev => [noteToAdd, ...prev]);
      setClients(prev => 
        prev.map(c => 
          c.id === newNoteData.clienteId 
            ? { ...c, ultimoContacto: time } 
            : c
        )
      );

      if (selectedClient && selectedClient.id === newNoteData.clienteId) {
        setSelectedClient(prev => ({ ...prev, ultimoContacto: time }));
      }
    } catch (err) {
      console.error("Error en handleAddNote:", err);
    }
  };

  return {
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
  };
}
