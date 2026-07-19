# Reporte de Auditoría Técnica y Entrega de Arquitectura — CRM ASCK v1.8+

**Auditor y Arquitecto:** Arquitecto de Software Full Stack Senior  
**Destinatario:** ASCK Software  
**Fecha:** Julio de 2026  

---

## 1. Resumen Ejecutivo

Este reporte constituye el informe final de auditoría y entrega del proyecto de refactorización y conexión del CRM interno de **ASCK Software**. El objetivo principal consistió en transformar un prototipo web que operaba exclusivamente de manera local en el navegador del usuario en una aplicación web progresiva (PWA) e híbrida (móvil) totalmente sincronizada en tiempo real mediante un backend en la nube (**Supabase**), manteniendo la fidelidad visual, la semántica en español y los importadores/exportadores de Excel intactos.

La compilación de producción del proyecto refactorizado es 100% exitosa y se ejecuta de manera optimizada.

---

## 2. Detalle de Archivos Creados y Justificación Técnica

A continuación se detalla cada componente, servicio y gancho creado durante el proceso y el sustento arquitectónico de su implementación:

### A. Capa de React Hooks (Separación de UI y Lógica)
*   **`src/hooks/useClients.js`**: Centraliza el control de los clientes, las notas de seguimiento y los flujos Kanban. Mantiene la integridad referencial realizando borrados en cascada (desasociando tareas de clientes eliminados).
*   **`src/hooks/useTasks.js`**: Administra la lógica de creación, actualización y marcado de tareas completadas, delegando de forma asíncrona la escritura hacia el proveedor activo.
*   **`src/hooks/useSprints.js`**: Controla los ciclos de sprints semanales y calcula reactivamente el avance del equipo.
*   **`src/hooks/useCalendar.js`**: Orquesta los eventos de la agenda de seguimiento comercial para la visualización del calendario Google-style.
*   **`src/hooks/useActivity.js`**: Administra el flujo de escritura en la bitácora de auditoría lineal del Dashboard.
*   **`src/hooks/useAppView.js`**: Controla las pestañas activas del sidebar y las persiste en `localStorage` para conservar la vista del usuario tras recargar.
*   **`src/hooks/useAuth.js`**: Controla el inicio de sesión del usuario activo de forma persistente.
*   **`src/hooks/useSupabaseRealtime.js`**: Habilita la suscripción por sockets a las tablas de base de datos para inyectar cambios de forma instantánea entre dispositivos.
*   *Justificación:* Estas extracciones redujeron el archivo monolítico `App.jsx` de 590 líneas de código a menos de 280, eliminando el acoplamiento directo entre el renderizado visual y la persistencia de datos.

### B. Capa de Adaptadores de Datos (Servicios Genéricos)
*   **`src/services/config.js`**: Switch inteligente que evalúa variables de entorno y la disponibilidad de claves de Supabase. Si las claves son inválidas o incompletas, conmuta el motor a modo `local` de forma transparente.
*   **`src/services/provider.js`**: Expone el estado del backend al layout para reportar alertas.
*   **`src/services/local/` (9 archivos adaptadores)**: Implementación asíncrona pura para guardar la información localmente en `localStorage`.
*   **`src/services/supabase/` (9 archivos adaptadores)**: Implementación asíncrona que consume la base de datos remota usando `@supabase/supabase-js`.
*   *Justificación:* Permite al equipo de desarrollo cambiar de base de datos local a nube con solo alterar una variable de entorno en el archivo `.env` sin tener que reescribir una sola línea de código en los componentes visuales.

### C. Autenticación y Seguridad
*   **`src/components/Auth/LoginView.jsx`**: Interfaz premium de inicio de sesión alineada a la paleta Notion/Linear.
*   **`src/components/Auth/AuthGuard.jsx`**: Interceptor de rutas que evalúa si la app corre en la nube. Si detecta el proveedor local, desactiva el login de forma automática para agilizar el desarrollo de los programadores.
*   *Justificación:* Cumple el requisito de añadir autenticación real en la nube sin bloquear el flujo offline local tradicional.

### D. Sincronización y Migración
*   **`src/components/Settings/DataMigrationPanel.jsx`**: Módulo en Configuración que permite respaldar la base en JSON e importarla en la nube con un solo clic.
*   **`src/services/migration/localToSupabaseMigration.js`**: Valida las relaciones entre las 7 tablas de la base local y las sube en lotes a Supabase evitando registros duplicados.
*   *Justificación:* Asegura que el equipo operativo (Kevin, Sebas, Centeno) no pierda su progreso comercial acumulado al migrar de navegador a la base centralizada.

### E. Optimización PWA y Móvil
*   **`public/sw.js`**: Sustituimos el Service Worker original por una estrategia de caché inteligente: *Network-First* para archivos de navegación (index.html), asegurando actualizaciones instantáneas al desplegar código, y *Stale-While-Revalidate* para assets estáticos. Excluye llamadas externas a la API de Supabase.
*   **`capacitor.config.json`**: Configuración de empaquetado Capacitor para Android e iOS.
*   *Justificación:* Resuelve el problema técnico donde el navegador de los usuarios quedaba bloqueado permanentemente sirviendo versiones antiguas de la aplicación por culpa de la caché agresiva del Service Worker.
