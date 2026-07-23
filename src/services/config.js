// Configuración del proveedor de persistencia de datos (Local vs Supabase)
import { isDemoMode } from './demoMode';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co' && 
  supabaseAnonKey !== 'tu-anon-key-de-supabase';

const rawProvider = import.meta.env.VITE_DATA_PROVIDER; // puede venir indefinido

// Switch final (sin footgun): si Supabase está configurado, se usa AUTOMÁTICAMENTE
// (no hace falta setear VITE_DATA_PROVIDER aparte). Solo cae a 'local' si Supabase
// no está configurado, o si explícitamente se fuerza VITE_DATA_PROVIDER=local (pruebas).
// En modo DEMO se fuerza SIEMPRE 'local': ningun servicio de datos toca Supabase
// (los datos reales viven en Supabase y quedan intactos). Fuera de demo, la
// logica original.
export const activeProvider = isDemoMode()
  ? 'local'
  : (isSupabaseConfigured
      ? (rawProvider === 'local' ? 'local' : 'supabase')
      : 'local');

console.log(`[ASCK CRM] Proveedor activo: ${activeProvider.toUpperCase()}`);
if (isSupabaseConfigured && rawProvider === 'local') {
  console.warn("[ASCK CRM] Supabase está configurado pero VITE_DATA_PROVIDER=local fuerza el modo local (localStorage).");
}
