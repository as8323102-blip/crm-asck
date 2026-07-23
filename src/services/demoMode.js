// Modo DEMO del CRM: entorno de prueba con datos ficticios, AISLADO del real.
// El flag vive en sessionStorage (por pestaña). En demo: activeProvider='local'
// (ningun servicio toca Supabase), el cliente Supabase queda null, y el
// localStorage se namespacea con prefijo 'demo__' (ver demoBootstrap.js).
// Garantia: en demo es IMPOSIBLE leer/escribir los datos reales de Supabase.
const FLAG = 'asck_crm_demo';
const ROLE = 'asck_crm_demo_role';

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
