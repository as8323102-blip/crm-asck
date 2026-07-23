// Bootstrap del modo DEMO. DEBE importarse ANTES que nada en main.jsx.
// Si el modo demo esta activo, namespacea TODO el acceso a localStorage de
// claves 'asck_crm_*' con el prefijo 'demo__' (aisla los datos demo del cache
// real) y siembra el dataset ficticio si aun no existe. Fuera de demo, no hace
// absolutamente nada (cero impacto en produccion).
import { isDemoMode } from './services/demoMode';
import { DEMO_CLIENTS } from './services/demoData';

if (isDemoMode()) {
  const PREFIX = 'demo__';
  const ns = (k) => (typeof k === 'string' && k.startsWith('asck_crm_')) ? PREFIX + k : k;

  const _get = window.localStorage.getItem.bind(window.localStorage);
  const _set = window.localStorage.setItem.bind(window.localStorage);
  const _rem = window.localStorage.removeItem.bind(window.localStorage);

  window.localStorage.getItem = (k) => _get(ns(k));
  window.localStorage.setItem = (k, v) => _set(ns(k), v);
  window.localStorage.removeItem = (k) => _rem(ns(k));

  // Semilla de clientes ficticios (setter RAW para no re-prefijar). Se marca
  // ademas 'seeded_v1_8'='true' para que la inicializacion de App.jsx NO resetee
  // los clientes a [] (su rama "no seeded"). Gate propio (demo_seeded) para no
  // re-sembrar y respetar cambios que el usuario haga durante la demo.
  if (!_get('demo__asck_crm_demo_seeded')) {
    _set('demo__asck_crm_clients', JSON.stringify(DEMO_CLIENTS));
    _set('demo__asck_crm_seeded_v1_8', 'true');
    _set('demo__asck_crm_demo_seeded', '1');
  }

  // eslint-disable-next-line no-console
  console.info('[ASCK CRM] MODO DEMO activo · datos ficticios · Supabase deshabilitado.');
}
