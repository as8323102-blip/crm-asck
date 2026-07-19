import { useState, useEffect } from 'react';
import { INTEGRANTES } from '../mockData';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('asck_crm_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INTEGRANTES[0]; // Primer integrante por defecto
  });

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('asck_crm_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Login simulado local / preparación para Supabase
  const login = async (email, _password) => {
    setLoading(true);
    // Simular retraso
    await new Promise(resolve => setTimeout(resolve, 800));
    const matched = INTEGRANTES.find(i => i.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      setSession({ user: matched });
      setLoading(false);
      return { success: true, user: matched };
    }
    setLoading(false);
    return { success: false, error: 'Integrante no encontrado en ASCK' };
  };

  const logout = async () => {
    setCurrentUser(INTEGRANTES[0]);
    setSession(null);
  };

  return {
    currentUser,
    setCurrentUser,
    session,
    login,
    logout,
    loading
  };
}
