import { useState, useEffect } from 'react';

export function useAppView() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('asck_crm_active_tab') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('asck_crm_active_tab', activeTab);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab
  };
}
