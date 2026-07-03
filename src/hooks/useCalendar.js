import { useState } from 'react';
import { agendaService } from '../services/agendaService';

export function useCalendar(logEvent) {
  const [agendaEvents, setAgendaEvents] = useState([]);

  const loadCalendarEvents = async () => {
    try {
      const ag = await agendaService.getEvents();
      setAgendaEvents(ag);
    } catch (e) {
      console.error("Error al cargar eventos de agenda:", e);
    }
  };

  const handleAddAgendaEvent = async (newEventData) => {
    try {
      await agendaService.createEvent(newEventData);
      
      // Log actividad
      if (newEventData.clienteId) {
        await logEvent(`agendó el evento "${newEventData.titulo}" (${newEventData.tipo}) para`, newEventData.clienteId);
      } else {
        await logEvent(`agendó el evento "${newEventData.titulo}" (${newEventData.tipo})`);
      }

      setAgendaEvents(prev => [...prev, newEventData]);
    } catch (err) {
      console.error("Error en handleAddAgendaEvent:", err);
    }
  };

  return {
    agendaEvents,
    setAgendaEvents,
    loadCalendarEvents,
    handleAddAgendaEvent
  };
}
