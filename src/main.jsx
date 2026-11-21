import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
/* Fonts are served with the site (no Google request): only the weights used,
   Latin + Latin-extended subsets (French accents, œ, typographic spaces). */
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-ext-600.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-ext-600.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/playfair-display/latin-ext-700.css'
import '@fontsource/playfair-display/latin-600-italic.css'
import '@fontsource/playfair-display/latin-ext-600-italic.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
