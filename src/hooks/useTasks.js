import { useState } from 'react';
import { taskService } from '../services/taskService';

export function useTasks(logEvent) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const t = await taskService.getTasks();
      setTasks(t);
    } catch (e) {
      console.error("Error al cargar tareas:", e);
    }
  };

  const handleAddTask = async (newTaskData) => {
    const taskId = `t-${Date.now()}`;
    const taskToAdd = {
      id: taskId,
      ...newTaskData,
      createdAt: new Date().toISOString()
    };

    try {
      await taskService.createTask(taskToAdd);
      
      // Log actividad
      if (newTaskData.clienteId) {
        await logEvent(`creó la tarea "${newTaskData.titulo}" para`, newTaskData.clienteId);
      } else {
        await logEvent(`creó la tarea interna "${newTaskData.titulo}"`);
      }

      setTasks(prev => [taskToAdd, ...prev]);
    } catch (err) {
      console.error("Error en handleAddTask:", err);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await taskService.updateTask(taskId, updates);
      
      const target = tasks.find(t => t.id === taskId);
      if (target && updates.estado && updates.estado !== target.estado) {
        if (target.clienteId) {
          await logEvent(`cambió la tarea "${target.titulo}" a "${updates.estado}" para`, target.clienteId);
        } else {
          await logEvent(`cambió la tarea interna "${target.titulo}" a "${updates.estado}"`);
        }
      }

      setTasks(prev => 
        prev.map(t => 
          t.id === taskId 
            ? { ...t, ...updates } 
            : t
        )
      );
    } catch (err) {
      console.error("Error en handleUpdateTask:", err);
    }
  };

  const handleToggleTask = async (taskId) => {
    const target = tasks.find(t => t.id === taskId);
    if (!target) return;
    const newStatus = !target.completada;
    const newStage = newStatus ? 'Completada' : 'Pendiente';

    try {
      await taskService.updateTask(taskId, { 
        completada: newStatus,
        estado: newStage
      });
      
      // Log actividad
      if (target.clienteId) {
        await logEvent(`${newStatus ? 'completó' : 'reabrió'} la tarea "${target.titulo}" para`, target.clienteId);
      } else {
        await logEvent(`${newStatus ? 'completó' : 'reabrió'} la tarea interna "${target.titulo}"`);
      }

      setTasks(prev => 
        prev.map(t => 
          t.id === taskId 
            ? { ...t, completada: newStatus, estado: newStage } 
            : t
        )
      );
    } catch (err) {
      console.error("Error en handleToggleTask:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (err) {
      console.error("Error en handleDeleteTask:", err);
    }
  };

  return {
    tasks,
    setTasks,
    loadTasks,
    handleAddTask,
    handleUpdateTask,
    handleToggleTask,
    handleDeleteTask
  };
}
