import { createClient } from '@supabase/supabase-js';
import { isDemoMode } from '../demoMode';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co' && 
  supabaseAnonKey !== 'tu-anon-key-de-supabase';

// Exportar cliente inicializado seguro (solo si está configurado).
// En modo DEMO el cliente queda en null a proposito: ningun servicio puede
// leer/escribir el Supabase real (todos hacen `if (!supabase) return ...`).
// Es la barrera estructural que garantiza el aislamiento de los datos reales.
export const supabase = (isSupabaseConfigured && !isDemoMode())
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info("[ASCK CRM] Supabase no está configurado de forma completa. El sistema operará en fallback LOCAL.");
}
