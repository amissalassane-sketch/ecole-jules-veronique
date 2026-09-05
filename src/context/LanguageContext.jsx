import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'school-language-v2'
const DEFAULT_LANGUAGE = 'fr'

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE
    } catch {
      return DEFAULT_LANGUAGE
    }
  })

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = 'ltr'
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore storage errors
    }
  }, [language])

  const setLanguage = useCallback((langOrUpdater) => {
    setLanguageState((prev) => {
      const next = typeof langOrUpdater === 'function' ? langOrUpdater(prev) : langOrUpdater
      return next === 'en' || next === 'fr' ? next : prev
    })
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }, [setLanguage])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
