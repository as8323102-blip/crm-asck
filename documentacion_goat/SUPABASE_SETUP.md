# Guía de Configuración de Supabase — SUPABASE SETUP

Esta guía detalla los pasos para configurar tu proyecto de Supabase en producción y conectar el CRM de ASCK.

---

## 1. Crear el Proyecto

1. Ve a [Supabase.com](https://supabase.com/) e inicia sesión.
2. Haz clic en **New Project**, selecciona tu organización, ingresa el nombre `ASCK CRM`, define una contraseña para la base de datos y elige la región más cercana a tus usuarios (ej: `us-east-1` o `sa-east-1`).

---

## 2. Crear las Tablas y el Esquema

1. Una vez creado el proyecto, navega a la sección **SQL Editor** en la barra lateral izquierda.
2. Haz clic en **New Query**.
3. Copia el contenido del archivo:
   👉 [schema.sql](file:///c:/Users/as832/Documents/CRM%20ASCK/src/services/supabase/schema.sql)
4. Pega el script en el editor y haz clic en **Run**. Deberías ver un mensaje indicando que la consulta se ejecutó con éxito.

---

## 3. Configurar Replicación en Tiempo Real

Para habilitar la sincronización en tiempo real (computadora ↔ celular):
1. En la consola de Supabase, ve a **Database** (icono de engranaje/base de datos) ➜ **Replication**.
2. En la tabla de publicaciones de replicación, edita **supabase_realtime**.
3. Habilita las tablas para replicación:
   * `clientes`, `tareas`, `sprints`, `agenda_eventos`, `notas_clientes`, `actividades`
4. Guarda los cambios. Esto permitirá que cualquier cambio realizado en una tabla envíe notificaciones instantáneas a los clientes conectados.
