# Guía de Compilación Móvil (Capacitor) — MOBILE BUILD GUIDE

Este documento detalla el procedimiento para empaquetar el CRM de ASCK Software como una aplicación móvil nativa para Android y preparar el soporte de iOS.

---

## 1. Comandos del Ciclo de Vida del Móvil

Hemos integrado scripts abreviados en tu archivo `package.json`:
* **`npm run cap:sync`**: Compila el proyecto React en la carpeta `dist/` y sincroniza de forma automática todos los archivos estáticos hacia los directorios de Android e iOS.
* **`npm run cap:android`**: Sincroniza los archivos y abre de forma automática el proyecto nativo en **Android Studio**.
* **`npm run cap:ios`**: Sincroniza los archivos estáticos y prepara el entorno para **Xcode**.

---

## 2. Compilación para Android (Generación de APK)

Para compilar la aplicación e instalarla en tu celular Android sin pasar por Play Store:

1. **Paso 1: Requisitos de Entorno:**
   * Asegúrate de tener instalado **Android Studio** y el SDK de Android correspondiente.
2. **Paso 2: Abrir en Android Studio:**
   * Ejecuta:
     ```bash
     npm run cap:android
     ```
   * Esto abrirá la carpeta de Android de tu proyecto. Espera a que Gradle compile y sincronice el proyecto.
3. **Paso 3: Generar APK de Pruebas:**
   * Inicia Android Studio, navega a **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
   * Instala la APK en tu dispositivo de forma directa.
