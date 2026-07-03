# Guía de Migración de Base de Datos — MIGRATION GUIDE LOCAL TO SUPABASE

Esta guía describe el procedimiento paso a paso para migrar de forma segura la base de datos de almacenamiento local (`localStorage`) de tu navegador a los servidores de base de datos en la nube de **Supabase**.

---

## 1. Prerrequisitos de Infraestructura

Antes de iniciar la migración:
1. Asegúrate de haber completado la configuración del esquema de Supabase:
   👉 [SUPABASE_SCHEMA_NOTES.md](file:///C:/Users/as832/.gemini/antigravity/brain/2f56e212-3300-4930-8b34-c26785ada5ca/SUPABASE_SCHEMA_NOTES.md)
2. Declara las credenciales en tu archivo `.env` local:
   ```text
   VITE_DATA_PROVIDER=supabase
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
   ```

---

## 2. Procedimiento de Migración Segura

Sigue estos pasos en la pestaña de **Configuración** del CRM:

1. **Paso 1: Generar una Copia de Seguridad:**
   * Haz clic en **Descargar Respaldo JSON**. Esto generará un archivo local que contiene todo tu historial. Guárdalo como garantía.
2. **Paso 2: Previsualización de Datos:**
   * Abre la sección de migración y haz clic en **Previsualizar Datos**. Verifica que los números coincidan con el volumen esperado de prospectos y tareas.
3. **Paso 3: Ejecutar la Migración:**
   * Presiona **Migrar a Supabase**. El sistema mapeará, validará y cargará de forma automática tus datos respetando llaves foráneas y registros existentes.

---

## 4. Plan de Contingencia y Reversión

Si algo sale mal o experimentas pérdida de red durante la migración:
* Los datos de `localStorage` permanecen intactos. La migración es **no destructiva**.
* Para revertir la aplicación al modo local independiente de inmediato:
  1. Cambia tu variable de entorno: `VITE_DATA_PROVIDER=local`.
  2. Reinicia la aplicación. Operará de nuevo de forma 100% aislada en el navegador.
