import { useState } from 'react';
import { activityService } from '../services/activityService';

export function useActivity() {
  const [activities, setActivities] = useState([]);

  const loadActivities = async () => {
    try {
      const act = await activityService.getActivities();
      setActivities(act);
    } catch (e) {
      console.error(e);
    }
  };

  const logEvent = async (actionText, currentUser, clientId = null) => {
    if (!currentUser) return;
    const newActivity = {
      id: `act-${Date.now()}`,
      autorId: currentUser.id,
      clienteId: clientId,
      accion: actionText,
      createdAt: new Date().toISOString()
    };
    await activityService.logActivity(newActivity);
    setActivities(prev => [newActivity, ...prev]);
    return newActivity;
  };

  return {
    activities,
    setActivities,
    loadActivities,
    logEvent
  };
}
