import { useState } from 'react';
import { sprintService } from '../services/sprintService';

export function useSprints(logEvent) {
  const [sprints, setSprints] = useState([]);

  const loadSprints = async () => {
    try {
      const s = await sprintService.getSprints();
      setSprints(s);
    } catch (e) {
      console.error("Error al cargar sprints:", e);
    }
  };

  const handleAddSprint = async (newSprint) => {
    try {
      await sprintService.createSprint(newSprint);
      setSprints(prev => [...prev, newSprint]);
      await logEvent(`creó el sprint "${newSprint.nombre}"`);
    } catch (err) {
      console.error("Error en handleAddSprint:", err);
    }
  };

  const handleUpdateSprint = async (sprintId, updates) => {
    try {
      await sprintService.updateSprint(sprintId, updates);
      setSprints(prev => 
        prev.map(s => s.id === sprintId ? { ...s, ...updates } : s)
      );
    } catch (err) {
      console.error("Error en handleUpdateSprint:", err);
    }
  };

  return {
    sprints,
    setSprints,
    loadSprints,
    handleAddSprint,
    handleUpdateSprint
  };
}
