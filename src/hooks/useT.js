import { useLanguage } from '../context/LanguageContext'
import translations from '../data/translations'

export function useT() {
  const { language } = useLanguage()
  return translations[language] || translations.fr
}
