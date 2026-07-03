import { createClient } from '@supabase/supabase-js';

// Para conectar Supabase en producción:
// 1. Crea un archivo `.env` en la raíz del proyecto.
// 2. Agrega las siguientes variables:
//    VITE_SUPABASE_URL=tu_supabase_url
//    VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
// 3. Ejecuta el esquema SQL (MySQL/PostgreSQL adaptado) en el editor de Supabase.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key-de-supabase';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
