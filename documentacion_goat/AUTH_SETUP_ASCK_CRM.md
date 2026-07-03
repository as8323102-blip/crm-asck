# Manual de Autenticación — AUTH SETUP ASCK CRM

Este manual explica cómo gestionar usuarios e iniciar sesión en el CRM interno en producción.

---

## 1. Integrantes Predefinidos de ASCK

El sistema valida las credenciales contra la lista de integrantes autorizados:
* **Alberto:** `alberto@asck.software`
* **Kevin:** `kevin@asck.software`
* **Sebas:** `sebas@asck.software`
* **Centeno:** `centeno@asck.software`

---

## 2. Cómo Crear Usuarios en Supabase Auth

1. Ve al panel de control de tu proyecto en **Supabase** ➜ **Authentication** ➜ **Users**.
2. Haz clic en **Add User** ➜ **Create User**.
3. Ingresa el correo electrónico de uno de los integrantes (por ejemplo, `alberto@asck.software`) y define una contraseña segura.
4. Asegúrate de desactivar la opción "Confirm email" para permitirles iniciar sesión de inmediato sin tener que verificar su bandeja de entrada.

---

## 3. Vinculación de Sesión Local y Nube

* Cuando el switch `VITE_DATA_PROVIDER` esté configurado en `local`, la pantalla de inicio de sesión se omitirá de forma automática para facilitar el desarrollo rápido del equipo.
* Cuando se configure en `supabase`, la aplicación interceptará el arranque y requerirá ingresar el correo y la contraseña. Al iniciar sesión, se validará la identidad y se mapeará al perfil del integrante para filtrar sus tareas correspondientes de forma reactiva.
