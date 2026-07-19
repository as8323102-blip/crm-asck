import React from 'react';

/**
 * ErrorBoundary
 * Componente de resiliencia: captura errores de render de sus hijos y muestra
 * un fallback mínimo en lugar de romper toda la aplicación (pantalla en blanco).
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Error capturado en la UI del CRM:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center bg-notion-bg-light dark:bg-notion-bg-dark text-notion-text-light dark:text-notion-text-dark"
        >
          <h1 className="text-lg font-bold">Algo salió mal</h1>
          <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark max-w-sm">
            Ocurrió un error inesperado en el CRM. Puedes recargar la aplicación para continuar.
          </p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Recargar aplicación
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
