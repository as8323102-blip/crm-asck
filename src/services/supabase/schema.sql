-- ============================================================================
-- ⚠️  OBSOLETO — NO USAR ESTE ARCHIVO PARA CREAR EL ESQUEMA
-- ----------------------------------------------------------------------------
-- El esquema de PRODUCCIÓN (con RLS correcto y anti escalación de privilegios) es:
--     supabase/schema.sql   +   supabase/seed.sql
-- Guía de activación:  CRM-PRODUCCION-ACTIVACION.md
--
-- Este archivo contenía una policy INSEGURA en `integrantes`:
--     CREATE POLICY ... integrantes FOR ALL TO authenticated USING (true)
-- que permitía a CUALQUIER usuario autenticado auto-asignarse rol = 'Admin'
-- vía la anon key (UPDATE por REST). Se neutraliza a un script DEFENSIVO:
-- si por error se ejecutó antes en tu proyecto Supabase, correr esto la ELIMINA.
-- ============================================================================

-- Elimina la policy peligrosa legada (si existe). Segura de correr siempre.
drop policy if exists "Permitir todo a autenticados en integrantes" on public.integrantes;

-- Tras esto, aplica el esquema correcto: supabase/schema.sql
-- y verifica en Dashboard → Authentication → Policies que `integrantes`
-- SOLO tenga una policy de SELECT para authenticated (nunca INSERT/UPDATE/DELETE).
