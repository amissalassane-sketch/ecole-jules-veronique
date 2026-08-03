/**
 * WhatsApp contact link utility
 * 
 * Centralizes all WhatsApp message generation so different sections
 * can use contextual messages without duplicating URL construction logic.
 * 
 * Usage:
 *   import { waLink, waLinkFor } from '../utils/contact'
 *   
 *   // Generic info link
 *   <a href={waLink}>Chat on WhatsApp</a>
 *   
 *   // Contextual link
 *   <a href={waLinkFor('pricing')}>Discuss pricing</a>
 */

import { school } from '../data/school'

const waClean = (school.whatsapp || '').replace(/[^0-9]/g, '')

const MESSAGES = {
  general:   `[Hello, I would like more information about ${school.shortName}.]`,
  admissions:`[Hello, I would like information about enrolling my child at ${school.shortName}.]`, 
  pricing:   `[Hello, I would like more information about the tuition fees at ${school.shortName}.]`,
  visit:     `[Hello, I would like to schedule a visit to ${school.shortName}.]`,
  programs:  `[Hello, I would like information about the available programs at ${school.shortName}.]`,
  help:      `[Hello, I have a question about registration at ${school.shortName}.]`,
  enroll:    `[Hello, I would like to enroll my child at ${school.shortName}.]`,
}

/**
 * Returns a WhatsApp link with the given message context.
 * @param {'general'|'admissions'|'pricing'|'visit'|'programs'|'help'|'enroll'} context
 * @returns {string} WhatsApp URL or '#' if no number
 */
export function waLinkFor(context = 'general') {
  if (!waClean) return '#'
  const msg = MESSAGES[context] || MESSAGES.general
  return `https://wa.me/${waClean}?text=${encodeURIComponent(msg)}`
}

/**
 * Default WhatsApp link (general context).
 */
export const waLink = waLinkFor('general')
