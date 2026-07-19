import { activeProvider, isSupabaseConfigured } from './config';

export const getServiceProvider = () => {
  return activeProvider;
};

export const checkProviderStatus = () => {
  const provider = import.meta.env.VITE_DATA_PROVIDER || 'local';
  if (provider === 'supabase' && !isSupabaseConfigured) {
    return {
      status: 'warning',
      message: 'Supabase no está configurado de forma completa. Utilizando base local (localStorage).'
    };
  }
  if (provider === 'supabase') {
    return {
      status: 'online',
      message: 'Base de datos en la nube (Supabase) activa.'
    };
  }
  return {
    status: 'local',
    message: 'Base de datos local activa.'
  };
};
