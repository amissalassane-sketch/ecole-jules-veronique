/**
 * Centralised contact links. All contact values come from school.js so the
 * public site never drifts from the information sheet.
 */

import { school } from '../data/school'

const waClean = (school.whatsapp || '').replace(/[^0-9]/g, '')
const phoneClean = (school.phone || '').replace(/[^0-9+]/g, '')

const MESSAGES = {
  general: `Bonjour, je souhaite obtenir des informations sur ${school.name}.`,
  admissions: `Bonjour, je souhaite obtenir des informations sur l’admission à ${school.name}.`,
  pricing: `Bonjour, je souhaite connaître les frais scolaires de ${school.name}.`,
  visit: `Bonjour, je souhaite organiser une visite de ${school.name}.`,
  programs: `Bonjour, je souhaite connaître les programmes proposés par ${school.name}.`,
  help: `Bonjour, j’ai une question concernant une demande de préinscription à ${school.name}.`,
  enroll: `Bonjour, je souhaite préparer une demande de préinscription à ${school.name}.`,
}

export function waLinkFor(context = 'general') {
  if (!waClean) return '#'
  const message = MESSAGES[context] || MESSAGES.general
  return `https://wa.me/${waClean}?text=${encodeURIComponent(message)}`
}

export const waLink = waLinkFor('general')
export const phoneLink = phoneClean ? `tel:${phoneClean}` : '#'
/* Directions on Google Maps, on the official letterhead GPS coordinates. */
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${school.geo.lat},${school.geo.lng}`
