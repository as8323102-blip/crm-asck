# Auditoría de Arquitectura de Software — ASCK CRM v1.8

**Rol:** Arquitecto de Software Full Stack Senior & Auditor Técnico  
**Proyecto:** CRM Interno de ASCK Software  
**Fecha:** Julio de 2026  

---

## 1. Resumen del Estado Actual

El proyecto original era un prototipo funcional avanzado de un CRM adaptado a las necesidades operativas específicas de ASCK Software. El estado del stack y módulos originales se resume a continuación:

### Stack Tecnológico Inicial
* **Core:** React 19 (JavaScript), Vite 8, Tailwind CSS v3.
* **Persistencia:** Capa de almacenamiento local sincrónica basada en `localStorage`.
* **Procesamiento de Archivos:** Biblioteca `xlsx` (SheetJS) instalada localmente para lectura y escritura de hojas de cálculo.
* **Capacidad Offline (PWA):** Configuración básica manual a través de un archivo `manifest.json` y un Service Worker (`sw.js`) en la carpeta pública.

---

## 2. Módulos Detectados

La aplicación cuenta con una distribución funcional que ya cubre las principales necesidades del CRM, estructurada de la siguiente manera:

* **Dashboard (`DashboardSummary.jsx`):** Agrupa las métricas financieras (Pipeline en pesos) y rendimiento del equipo en una sola pantalla.
* **Clientes y Kanban (`ClientList.jsx`, `KanbanBoard.jsx`, `ClientDetail.jsx`):** Controla el CRUD de clientes e historial de notas comerciales en un cajón lateral Notion-style.
* **Tareas y Sprints (`TaskManagerTudu.jsx`):** Relaciona tareas operativas con metas semanales.
* **Agenda (`CalendarAgenda.jsx`):** Muestra cronogramas diarios y semanales de actividades.
* **Importación/Exportación (`ExcelImportExport.jsx`):** Procesa archivos locales de Excel y exporta reportes.
* **Configuración (`ConfigPanel.jsx`):** Controla temas de colores (claro/oscuro), copias de seguridad de datos y purga de la base de datos local.
* **Servicios (`src/services/`):** Clientes de base local que emulan promesas asíncronas para una futura integración.

---

## 3. Problemas Detectados (Code Smells y Acoplamientos)

Durante la inspección del código fuente inicial, se han identificado los siguientes cuellos de botella técnicos:

### A. App.jsx Sobrecargado (Monolito de Estado)
* El archivo `src/App.jsx` superaba las 590 líneas de código. Concentraba:
  * Inicialización de 6 estados reactivos primarios.
  * Lógica de enrutamiento basada en strings (`activeTab`).
  * 12 manejadores de eventos CRUD de clientes, tareas, notas y eventos.
  * Renderizado condicional de todas las páginas de la aplicación y modales globales.
* **Impacto:** Dificultad para mantener, extender rutas o añadir lógica sin generar efectos secundarios en el estado global.

### B. Acoplamiento entre UI y Persistencia
* Los componentes leen a veces datos mock directos o asumen estructuras sin validación estricta de tipos.
* Aunque existen servicios en `src/services/`, la lógica reactiva en `App.jsx` sigue haciendo mutaciones directas de estado local en paralelo a la invocación de servicios.

### C. Estrategia agresiva de Service Worker (sw.js Cache-First)
* El archivo `sw.js` intercepta llamadas mediante `caches.match(e.request)` y devuelve la copia en caché de forma permanente para `/index.html` y `/`.
* **Impacto:** Si se despliega una nueva versión del CRM, los usuarios no verán los cambios a menos que borren manualmente el caché del navegador, ya que el Service Worker nunca invalida la caché de la estructura HTML base de forma automática.

### D. Base de Datos SQL orientada a MySQL en vez de PostgreSQL
* El archivo `schema.sql` contiene sintaxis específica de MySQL/MariaDB (`ENGINE=InnoDB`, `TINYINT(1)`).
* **Impacto:** La futura base de datos de producción recomendada (Supabase) utiliza PostgreSQL, lo que provocará fallos de compatibilidad si se intenta importar directamente este script de base de datos.

---

## 4. Clasificación de Riesgos Técnicos

| Factor de Riesgo | Clasificación | Impacto / Mitigación |
| :--- | :--- | :--- |
| **Escalabilidad** | 🟡 Medio | Con más de 100 clientes y 500 tareas, el procesamiento en localStorage se volverá notablemente lento. Requiere paginación en servicios. |
| **Sincronización** | 🔴 Alto | Al no contar con backend compartido, si Kevin y Sebas editan la base de datos local al mismo tiempo en sus respectivas computadoras, sus cambios quedarán aislados en sus navegadores. |
| **Seguridad de Datos** | 🔴 Alto | Los datos del cliente se guardan en texto plano en el localStorage del navegador. Si un usuario borra el historial o cambia de dispositivo, perderá toda la información si no realizó un respaldo JSON previo. |
| **Actualizaciones PWA** | 🟡 Medio | El Service Worker original puede bloquear la visualización de nuevas actualizaciones del frontend desplegadas por el equipo técnico (Alberto). |
| **Migración Supabase** | 🟢 Bajo | El diseño de los servicios asíncronos actuales en `src/services/` facilita enormemente el desacoplamiento. |

---

## 5. Arquitectura Recomendada (Modularización de Capas)

Para evitar la degradación del código y preparar la aplicación para Supabase y Capacitor de forma indolora, propusimos una migración progresiva hacia la siguiente estructura modular:

```text
src/
  app/                    # Inicializadores globales de la app y Providers
  components/             # Componentes compartidos de UI (Botones, Inputs, Modales Notion-style)
  features/               # Módulos del negocio auto-contenidos (UI + Lógica local)
  services/               # Capa pura de datos (Desacoplada de React)
    api/                  # Implementación Supabase / API Cliente
    local/                # Implementación LocalStorage
    clientService.js      # Interfaz/Controlador unificado de Clientes
    taskService.js        # Interfaz/Controlador unificado de Tareas
    ...
  hooks/                  # Custom hooks globales (useTheme, useAuth)
  utils/                  # Utilidades puras (currencyFormatter, dateHelper)
  data/                   # Estructuras de datos semilla v1.8
  layouts/                # Plantillas visuales (SidebarLayout, CleanLayout)
```

---

## 6. Qué NO cambiar en el CRM

Para preservar el valor del software ya construido y aprobado por el usuario, mantuvimos intactos:
1. **Identidad Visual y Estilo:** El diseño minimalista estilo Notion/Linear oscuro y claro.
2. **Branding de ASCK:** Logotipo corporativo, colores institucionales y textos.
3. **Flujos Comerciales:** La forma en que se registran y procesan los prospectos, tareas y agenda en español.
4. **Estructura Semilla v1.8:** Los datos de prospectos y tareas ya cargados desde los archivos del proyecto.
