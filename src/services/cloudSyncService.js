// ============================================================================
// DESACTIVADO POR SEGURIDAD (2026-07-18)
// ----------------------------------------------------------------------------
// Este servicio subía TODO el estado del CRM (clientes, tareas, notas, agenda)
// a un bin JSON PÚBLICO (jsonbin-zeta) cifrado con AES cuya clave = roomId + un
// SALT FIJO incluido en el bundle público. Un salt público no aporta seguridad:
// cualquiera con el roomId (o el bin "master" hardcodeado) podía leer/escribir
// los datos, TOTALMENTE al margen de Supabase Auth y RLS.
//
// En producción los datos viven en Supabase (Auth + RLS). Este canal queda
// deshabilitado: no realiza ninguna petición de red (cero egress de datos).
//
// Para rehabilitar una sincronización externa hay que REDISEÑARLA con un backend
// propio y un secreto server-side (nunca un salt en el bundle). Ver DECISIONES-KEVIN.
// ============================================================================

const DISABLED_MSG =
  'La sincronización en la nube está deshabilitada por seguridad. En producción los datos viven en Supabase.';

export const cloudSyncService = {
  // Ya no crea salas en un bin público.
  async generateRoomId() {
    throw new Error(DISABLED_MSG);
  },
  // No descarga de ningún bin público.
  async fetchFromCloud() {
    return null;
  },
  // No sube nada a la nube: devuelve el payload sin egress.
  async uploadToCloud(_roomId, payload) {
    return payload;
  },
  // No-op: conserva los datos locales tal cual, sin tocar la red.
  async sync(_roomId, localData) {
    return localData;
  },
};
