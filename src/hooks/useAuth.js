import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase/supabaseClient';
import { isDemoMode, demoSession, demoCurrentUser, exitDemoMode, matchDemoCredentials, enterDemoMode } from '../services/demoMode';

// Deriva el perfil de UI (camelCase) a partir de la fila de `integrantes`
// (tabla que cumple el rol de "profiles": id = auth.users.id, RLS activo).
// El rol SIEMPRE viene de esta tabla, nunca del cliente.
function mapProfile(profileRow, authUser) {
  const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${authUser?.id || 'asck'}`;
  if (!profileRow) {
    // El trigger de creación de perfil aún no corrió o falló: se mantiene la sesión
    // válida pero SIN rol (no se infiere ni se otorga acceso privilegiado por defecto).
    return {
      id: authUser.id,
      email: authUser.email,
      nombre: authUser.email,
      rol: null,
      cargo: '',
      avatarUrl: fallbackAvatar
    };
  }
  return {
    id: profileRow.id,
    email: authUser?.email || profileRow.email || '',
    nombre: profileRow.nombre || authUser?.email || 'Usuario',
    rol: profileRow.rol || null,
    cargo: profileRow.cargo || '',
    avatarUrl: profileRow.avatar_url || fallbackAvatar
  };
}

export function useAuth() {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser || !supabase) {
      setCurrentUser(null);
      return;
    }
    const { data, error } = await supabase
      .from('integrantes')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error) {
      console.warn('[Auth] No se pudo leer el perfil (integrantes) del usuario:', error.message);
    }
    setCurrentUser(mapProfile(data, authUser));
  }, []);

  useEffect(() => {
    let isMounted = true;

    // MODO DEMO: sesion ficticia local, sin tocar Supabase Auth. El rol viene de
    // demoCurrentUser (elegido en el login demo). Aislado del sistema real.
    if (isDemoMode()) {
      setSession(demoSession());
      setCurrentUser(demoCurrentUser());
      setLoading(false);
      return;
    }

    // FAIL-CLOSED: si Supabase no está configurado, no existe ningún mecanismo
    // de autenticación disponible. No hay sesión, no hay usuario, no hay acceso.
    if (!isSupabaseConfigured || !supabase) {
      setSession(null);
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) return;
      const initialSession = data?.session || null;
      setSession(initialSession);
      if (initialSession?.user) {
        await loadProfile(initialSession.user);
      }
      if (isMounted) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      if (newSession?.user) {
        loadProfile(newSession.user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, [loadProfile]);

  const login = async (email, password) => {
    // Credencial DEMO → modo demo local (datos ficticios), sin tocar Supabase.
    // Misma idea que el resto de sistemas ASCK: la credencial decide el entorno.
    // Se recarga para que demoBootstrap namespacee el almacenamiento y siembre
    // el dataset demo antes de que cualquier servicio lea datos.
    const demoRole = matchDemoCredentials(email, password);
    if (demoRole) {
      enterDemoMode(demoRole);
      window.location.reload();
      return { success: true };
    }

    // FAIL-CLOSED explícito: sin Supabase configurado, login siempre falla.
    // Nunca se busca el email en datos locales/mock ni se ignora la contraseña.
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: 'El sistema de autenticación no está configurado. Contacta al administrador.'
      };
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      // Mensaje genérico de Supabase ("Invalid login credentials"): no revela
      // si el usuario existe o si fue la contraseña la que falló.
      return { success: false, error: error.message || 'No se pudo iniciar sesión.' };
    }

    await loadProfile(data.user);
    setSession(data.session);
    setLoading(false);
    return { success: true, user: data.user };
  };

  const logout = async () => {
    // En demo: salir del modo demo (limpia flag + datos demo) y recargar para
    // volver al login real con Supabase habilitado.
    if (isDemoMode()) {
      exitDemoMode();
      setSession(null);
      setCurrentUser(null);
      window.location.reload();
      return;
    }
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setCurrentUser(null);
  };

  return {
    currentUser,
    session,
    login,
    logout,
    loading
  };
}
