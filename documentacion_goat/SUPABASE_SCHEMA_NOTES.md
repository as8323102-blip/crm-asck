# Guía del Esquema de Supabase — SUPABASE SCHEMA NOTES

Este documento explica detalladamente cómo configurar la base de datos de producción en Supabase utilizando el script de PostgreSQL provisto.

---

## 1. Orden de Ejecución de SQL

Para configurar la base de datos, inicia sesión en la consola de Supabase, navega a **SQL Editor**, crea una nueva consulta y copia el contenido completo del archivo:
👉 [schema.sql](file:///c:/Users/as832/Documents/CRM%20ASCK/src/services/supabase/schema.sql)

El orden de creación definido en el archivo es:
1. `integrantes` (De la cual dependen las llaves foráneas de asignación de tareas, clientes y agenda).
2. `clientes`
3. `sprints`
4. `tareas`
5. `agenda_eventos`
6. `notas_clientes`
7. `actividades`
8. `importaciones`

---

## 2. Row Level Security (RLS) y Políticas

Por defecto, Supabase expone las tablas públicamente a través de PostgREST. Para mitigar riesgos de seguridad, habilitamos RLS:
```sql
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
```
Y asignamos políticas para permitir lecturas y escrituras únicamente a usuarios autenticados:
```sql
CREATE POLICY "Permitir todo a autenticados en clientes" 
ON public.clientes FOR ALL TO authenticated USING (true);
```

---

## 3. Configuración Manual en Supabase

1. **Tabla de Perfiles de Auth:** Si deseas automatizar que al registrarse un usuario en Supabase Auth se cree una fila en `integrantes`, ejecuta el siguiente disparador en Supabase:
   ```sql
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS trigger AS $$
   BEGIN
     INSERT INTO public.integrantes (id, nombre, email, rol, cargo)
     VALUES (new.id, new.raw_user_meta_data->>'nombre', new.email, 'Integrante', 'Soporte');
     RETURN new;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
   ```
2. **Activación de Realtime:**
   Navega a **Database** ➜ **Replication** ➜ **supabase_realtime** y activa la replicación para las tablas: `clientes`, `tareas`, `sprints`, `agenda_eventos`, `notas_clientes`, `actividades`.
