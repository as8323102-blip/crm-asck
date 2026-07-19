import { useEffect, useRef } from 'react';

/**
 * useFocusTrap
 * Atrapa el foco (Tab / Shift+Tab) dentro del contenedor mientras `active` es true,
 * enfoca el primer elemento enfocable al abrir y devuelve el foco al elemento que lo
 * tenía antes (el trigger) al cerrar/desmontar. Utilidad invisible de accesibilidad.
 */
export function useFocusTrap(active = true) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

    // Enfocar el primer elemento del contenedor al abrir
    const focusables = getFocusable();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else if (typeof container.focus === 'function') {
      container.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last || !container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [active]);

  return containerRef;
}
