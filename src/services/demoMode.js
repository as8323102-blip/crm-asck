// Modo DEMO del CRM: entorno de prueba con datos ficticios, AISLADO del real.
// El flag vive en sessionStorage (por pestaña). En demo: activeProvider='local'
// (ningun servicio toca Supabase), el cliente Supabase queda null, y el
// localStorage se namespacea con prefijo 'demo__' (ver demoBootstrap.js).
// Garantia: en demo es IMPOSIBLE leer/escribir los datos reales de Supabase.
const FLAG = 'asck_crm_demo';
const ROLE = 'asck_crm_demo_role';

// Credenciales DEMO publicadas (aparecen en el portafolio). Escribirlas en el
// login normal activa el modo demo local; NO son cuentas de Supabase, así que
// nunca tocan los datos reales. Son ficticias a propósito: no es un secreto.
const DEMO_CREDENTIALS = {
  'direccion.demo@asckcrm.example': { password: 'DemoCRM2026!', role: 'admin' },
  'gerente.demo@asckcrm.example':   { password: 'DemoCRM2026!', role: 'gerente' },
  'vendedor.demo@asckcrm.example':  { password: 'DemoCRM2026!', role: 'vendedor' },
};

// Devuelve el rol demo si (email, password) coinciden con una credencial demo
// publicada; null en cualquier otro caso (→ el login sigue a Supabase real).
export function matchDemoCredentials(email, password) {
  const e = String(email || '').trim().toLowerCase();
  const rec = DEMO_CREDENTIALS[e];
  return rec && rec.password === password ? rec.role : null;
}

export function isDemoMode() {
  try {
    return sessionStorage.getItem(FLAG) === '1';
  } catch {
    return false;
  }
}

export function demoRole() {
  try {
    return sessionStorage.getItem(ROLE) || 'admin';
  } catch {
    return 'admin';
  }
}

export function enterDemoMode(role = 'admin') {
  try {
    sessionStorage.setItem(FLAG, '1');
    sessionStorage.setItem(ROLE, role);
  } catch {
    /* noop */
  }
}

export function exitDemoMode() {
  try {
    sessionStorage.removeItem(FLAG);
    sessionStorage.removeItem(ROLE);
    // Limpia los datos demo del localStorage (prefijo demo__asck_crm_).
    Object.keys(localStorage)
      .filter((k) => k.startsWith('demo__asck_crm_'))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* noop */
  }
}

export function demoSession() {
  return { user: { id: 'demo-user', email: 'demo@asck.software' }, demo: true };
}

export function demoCurrentUser() {
  const role = demoRole();
  const nombres = {
    admin: 'Dirección (Demo)',
    gerente: 'Gerente Comercial (Demo)',
    vendedor: 'Vendedor (Demo)',
  };
  return {
    id: 'demo-user',
    email: 'demo@asck.software',
    nombre: nombres[role] || 'Usuario Demo',
    rol: role,
    cargo: 'Entorno de demostración · datos ficticios',
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=demo-${role}`,
  };
}
