// Utilidades de conversión y formateo de moneda - CRM ASCK Software
export const TASA_CAMBIO_FIJA = 18; // 1 USD = 18 MXN

/**
 * Formatea un número a pesos mexicanos (MXN)
 * Ejemplo: 25000 -> $25,000 MXN
 */
export function formatMXN(value) {
  const numericValue = Number(value) || 0;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue) + ' MXN';
}

/**
 * Convierte un monto entre MXN y USD usando la tasa fija
 * @param {number} amount Monto a convertir
 * @param {string} from Moneda origen ('USD' o 'MXN')
 * @param {string} to Moneda destino ('USD' o 'MXN')
 */
export function convertCurrency(amount, from, to) {
  const val = Number(amount) || 0;
  if (from === to) return val;
  
  if (from === 'USD' && to === 'MXN') {
    return val * TASA_CAMBIO_FIJA;
  }
  
  if (from === 'MXN' && to === 'USD') {
    return val / TASA_CAMBIO_FIJA;
  }
  
  return val;
}
