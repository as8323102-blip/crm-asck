# Guía de Despliegue Web — DEPLOYMENT GUIDE

Este documento describe los pasos para desplegar la interfaz web del CRM de ASCK Software de manera gratuita y segura.

---

## 1. Hosting Recomendados

Recomendamos utilizar **Vercel** o **Netlify** por su excelente soporte para aplicaciones construidas en Vite, soporte HTTPS gratuito automático y despliegue rápido.

---

## 2. Configurar Variables de Entorno

Durante el proceso de despliegue en la plataforma seleccionada (Vercel o Netlify):
1. Navega a **Environment Variables** en el panel de configuración del proyecto.
2. Agrega las siguientes variables:
   * `VITE_DATA_PROVIDER`: `supabase`
   * `VITE_SUPABASE_URL`: (Tu URL de API de Supabase)
   * `VITE_SUPABASE_ANON_KEY`: (Tu clave Anon de Supabase)

---

## 3. Configurar Comandos de Compilación

* **Build Command**: `npm run build`
* **Output Directory**: `dist`
