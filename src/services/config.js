// Configuración del proveedor de persistencia de datos (Local vs Supabase)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co' && 
  supabaseAnonKey !== 'tu-anon-key-de-supabase';

const rawProvider = import.meta.env.VITE_DATA_PROVIDER || 'supabase';

// Switch final: Usar supabase sólo si está explícitamente configurado y tiene keys
export const activeProvider = (rawProvider === 'supabase' && isSupabaseConfigured) ? 'supabase' : 'local';

console.log(`[ASCK CRM] Proveedor activo: ${activeProvider.toUpperCase()}`);
if (rawProvider === 'supabase' && !isSupabaseConfigured) {
  console.warn("[ASCK CRM] Supabase fue seleccionado pero no está configurado. Usando fallback LOCAL (localStorage).");
}
