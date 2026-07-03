import { useState, useEffect } from 'react';

export function useRealtime(provider) {
  const [onlineStatus, setOnlineStatus] = useState('Modo local');

  useEffect(() => {
    if (provider === 'supabase') {
      setOnlineStatus('ASCK Hub Online');
    } else {
      setOnlineStatus('Modo local');
    }
  }, [provider]);

  return {
    onlineStatus,
    setOnlineStatus
  };
}
