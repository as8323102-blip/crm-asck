// Sistema semántico compartido de estados y prioridades del CRM ASCK.
// Una sola fuente de verdad para chips, barras y selects coloreados:
// el color semántico (etapa/prioridad/estado de tarea) vive aquí, separado
// del acento de marca (asck-violet / asck-cyan).
//
// Nota Tailwind: las clases deben ser cadenas literales completas para que
// el JIT las detecte; no construir clases por interpolación.

import { ChevronsUp, Equal, ChevronDown } from 'lucide-react';

// ---------------------------------------------------------------------------
// Etapas del pipeline comercial (clientes)
// ---------------------------------------------------------------------------
export const ESTADO_CLIENTE = {
  'Prospecto': {
    chip: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    dot: 'bg-blue-500',
    bar: 'bg-blue-500',
    colTop: 'border-t-blue-500',
    colText: 'text-blue-500',
  },
  'Contactado': {
    chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
    colTop: 'border-t-amber-500',
    colText: 'text-amber-500',
  },
  'Negociación': {
    chip: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    dot: 'bg-purple-500',
    bar: 'bg-purple-500',
    colTop: 'border-t-purple-500',
    colText: 'text-purple-500',
  },
  'Cerrado': {
    chip: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    colTop: 'border-t-emerald-500',
    colText: 'text-emerald-500',
  },
  'Perdido / pausado': {
    chip: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    dot: 'bg-rose-500',
    bar: 'bg-rose-500',
    colTop: 'border-t-rose-500',
    colText: 'text-rose-500',
  },
};

const ESTADO_CLIENTE_FALLBACK = {
  chip: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20',
  dot: 'bg-zinc-400',
  bar: 'bg-zinc-400',
  colTop: 'border-t-zinc-400',
  colText: 'text-zinc-500',
};

export const estadoCliente = (estado) => ESTADO_CLIENTE[estado] || ESTADO_CLIENTE_FALLBACK;

// ---------------------------------------------------------------------------
// Prioridad de cliente (Alta / Media / Baja) — severidad por color + forma
// (icono distinto por nivel para no depender solo del color)
// ---------------------------------------------------------------------------
export const PRIORIDAD_CLIENTE = {
  'Alta': {
    chip: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    icon: ChevronsUp,
  },
  'Media': {
    chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: Equal,
  },
  'Baja': {
    chip: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: ChevronDown,
  },
};

export const prioridadCliente = (prioridad) =>
  PRIORIDAD_CLIENTE[prioridad] || PRIORIDAD_CLIENTE['Baja'];

// ---------------------------------------------------------------------------
// Prioridad de tarea (P0 / P1 / P2) — mismo criterio de severidad
// ---------------------------------------------------------------------------
export const PRIORIDAD_TAREA = {
  'P0': {
    chip: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    edge: 'border-l-rose-500',
    icon: ChevronsUp,
  },
  'P1': {
    chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    edge: 'border-l-amber-500',
    icon: Equal,
  },
  'P2': {
    chip: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    edge: 'border-l-blue-500',
    icon: ChevronDown,
  },
};

export const prioridadTarea = (prioridad) =>
  PRIORIDAD_TAREA[prioridad] || PRIORIDAD_TAREA['P2'];

// ---------------------------------------------------------------------------
// Estado de tarea (selects coloreados del gestor TÚDU)
// ---------------------------------------------------------------------------
export const ESTADO_TAREA = {
  'Hecho': 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  'En progreso': 'text-indigo-600 dark:text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
  'Bloqueado': 'text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/5',
  'Pausado': 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/5',
};

const ESTADO_TAREA_FALLBACK = 'text-gray-600 dark:text-gray-400 border-gray-500/20 bg-gray-500/5';

export const estadoTarea = (estado) => ESTADO_TAREA[estado] || ESTADO_TAREA_FALLBACK;
