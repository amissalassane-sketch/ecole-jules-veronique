// Payment Service — Abstraction layer for Kkiapay / FedaPay
// To connect a real provider, set VITE_PAYMENT_PROVIDER env var
// NEVER put private/secret keys here — those belong on a backend

export const PS = {
  NOT_CONFIGURED: 'not_configured',
  READY: 'ready',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
}

function getConfiguredProvider() {
  // In production: return import.meta.env.VITE_PAYMENT_PROVIDER || null
  return null
}

export function isPaymentAvailable() {
  return getConfiguredProvider() !== null
}

export function getProviderName() {
  const p = getConfiguredProvider()
  if (!p) return null
  return { kkiapay: 'Kkiapay', fedapay: 'FedaPay' }[p] || p
}

export async function initializePayment() {
  if (!getConfiguredProvider()) throw new Error('PAYMENT_NOT_CONFIGURED')
  throw new Error('PAYMENT_NOT_CONFIGURED')
}

export async function verifyPayment() {
  if (!getConfiguredProvider()) throw new Error('PAYMENT_NOT_CONFIGURED')
  throw new Error('PAYMENT_NOT_CONFIGURED')
}
