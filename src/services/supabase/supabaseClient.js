import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co' && 
  supabaseAnonKey !== 'tu-anon-key-de-supabase';

// Exportar cliente inicializado seguro (solo si está configurado)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!isSupabaseConfigured) {
  console.info("[ASCK CRM] Supabase no está configurado de forma completa. El sistema operará en fallback LOCAL.");
}
