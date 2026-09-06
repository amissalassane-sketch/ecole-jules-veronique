# EBJV — AUDIT V2 (Phase 0)

> Audit technique, UX, UI, responsive, accessibilité et performance du site actuel.
> Méthode : lecture intégrale du code (`src/**`), build + lint, puis **tests réels en Chromium headless** (molette, touch, clavier, menu mobile, navigation inter-routes) à 320 / 375 / 390 / 414 / 480 / 768 / 1024 / 1280 / 1440 / 1600 px, avec captures de chaque section.
> Date : 2026-09-05. Commit de référence : `656a3a7`.

---

## 0. Résumé exécutif

| Domaine | Verdict |
|---|---|
| **Scroll** | **P0 — cassé** (molette + touch bloqués, clavier OK). Cause identifiée et corrigée dans `src/index.css`. Détail §1. |
| Architecture | Saine. React 19 + Vite 8 + Tailwind 4 + Framer Motion + react-router 7. Données centralisées dans `src/data/`, i18n FR/EN propre. À conserver. |
| Overflow horizontal | Aucun débordement mesuré à 320→1600 px (bon). |
| Erreurs runtime | Aucune (console propre hors ressource externe Google Fonts bloquée par le sandbox). |
| Qualité visuelle | Bonne base, mais **17 sections → 14 suivent le même schéma "titre centré + N cartes"**. Rythme monotone, densité de cartes excessive, palette qui fuit (56 usages de couleurs hors système). |
| Typographie | Playfair + Inter cohérents, mais **111 occurrences de texte ≤ 12 px**, 30 en `text-[11px]`, 8 à 10 px. Hiérarchie top-heavy : gros titres, corps minuscule. |
| Contraste | Plusieurs échecs WCAG AA : `text-white/35` (3.1:1), `white/30` (2.65:1), `white/20` (1.84:1), `neutral-400` labels (2.5:1), bouton accent blanc-sur-doré (2.66:1), `primary-400` (2.8:1). |
| Touch targets | 12 cibles < 40 px sur mobile (switch langue 33×24, liens footer 16 px de haut, liens texte hero). |
| Performance | Bundle JS 513 kB (155 kB gzip) — Framer Motion chargé partout ; 11 graisses Inter + 14 styles Playfair chargés depuis Google Fonts. |

---

## 1. P0 — DIAGNOSTIC EXACT DU BUG DE SCROLL

### Symptôme mesuré (avant correction)

| Entrée | 1440 px | 390 px (touch) |
|---|---|---|
| Molette `deltaY: 800` | scrollY = **0** ❌ | scrollY = **0** ❌ |
| Swipe tactile | — | delta = **0** ❌ |
| `PageDown` / `Space` / `ArrowDown` | 787 / 1574 / 1614 ✅ | 738 / 1476 / 1516 ✅ |
| `window.scrollTo(bottom)` | ✅ | ✅ |
| Overlay plein écran capturant les pointeurs | aucun | aucun |
| `body.style` inline résiduel après fermeture du menu | aucun | aucun |

Le fait que **le clavier et `scrollTo` fonctionnent** alors que **molette et touch échouent** exclut : Framer Motion, `AnimatePresence`, le scroll-lock du menu mobile (`position:fixed` sur body — correctement restauré), un overlay invisible, `100dvh`, ou un `preventDefault` sur `wheel/touchmove` (aucun listener de ce type n'existe dans le code). Les événements clavier ciblent directement `document.scrollingElement` ; molette et touch, eux, démarrent sur l'élément sous le pointeur et **remontent la chaîne de scroll**.

### Cause racine (CSS, `src/index.css` — base layer)

```css
html, body { max-width: 100%; overflow-x: hidden; }   /* ← 1 */
body       { overscroll-behavior-y: none; }           /* ← 2 */
```

1. Selon la spec CSS Overflow, `overflow` de `<body>` **se propage au viewport uniquement si `<html>` a `overflow: visible`**. Ici `<html>` a déjà `overflow-x: hidden`, donc la propagation est bloquée et **`<body>` devient son propre conteneur de scroll** (valeur calculée mesurée : `overflow: hidden auto`).
2. `<body>` étant désormais un scroll container dont le contenu tient exactement dedans (il fait la hauteur de son contenu), il ne peut pas scroller lui-même. Un geste molette/touch qui commence sur la page est donc **consommé par `<body>`**, puis devrait « chaîner » vers le viewport…
3. …sauf que `overscroll-behavior-y: none` sur `<body>` **interdit précisément ce chaînage**. Le geste meurt dans `<body>`. Résultat : page figée à la souris et au doigt, mais scrollable au clavier.

### Preuve par isolation (tests A→F, Chromium headless)

| Variante | Molette | Touch |
|---|---|---|
| A. Code actuel | 0 ❌ | 0 ❌ |
| B. Retirer seulement `overscroll-behavior-y:none` du body | 600 ✅ | 739 ✅ |
| C. `html { overflow-x: visible }` (body garde tout) | 600 ✅ | 751 ✅ |
| D. `body { overflow-x: visible }` (html garde hidden) | 600 ✅ | 757 ✅ |
| E. `html { scroll-behavior: auto }` | 0 ❌ | 0 ❌ |

Chaque facteur retiré seul débloque le scroll → **c'est la combinaison (1)+(2) qui est fautive**. `scroll-behavior: smooth` est hors de cause.

### Correction appliquée (pas un hack)

```css
html, body { max-width: 100%; overflow-x: clip; }   /* clip ≠ hidden : ne crée PAS de scroll container */
body { /* overscroll-behavior retiré */ }
```

- `overflow-x: clip` coupe le rendu hors-cadre (objectif d'origine : les blobs `blur-3xl` décoratifs positionnés hors canvas) **sans** transformer `body` en conteneur de scroll. Le viewport reste l'unique scroller.
- `overscroll-behavior-y: none` retiré : il n'avait de sens que sur un vrai scroller racine et n'apportait rien (le « bounce » iOS n'est de toute façon pas contrôlé par cette propriété sur `body`). Si l'on veut vraiment supprimer le pull-to-refresh un jour, ce sera `html { overscroll-behavior-y: none }` — jamais sur `body`.
- Commentaire explicatif laissé dans le CSS pour éviter une régression.

### Vérification après correction

| Test | 1440 px | 390 px touch |
|---|---|---|
| Molette 800 | 800 ✅ | 800 ✅ |
| PageDown / Space / ArrowDown | ✅ | ✅ |
| Swipe tactile | — | +1025 px ✅ |
| Bas de page atteint | 17325 = max ✅ | 20111 = max ✅ |
| Menu mobile ouvert → fermé → molette | — | position restaurée (1200) puis 1600 ✅ |
| `/registration` molette | 529 ✅ | 600 ✅ |
| Retour arrière → molette | ✅ | ✅ |
| Overflow horizontal (`scrollWidth > clientWidth`) | aucun | aucun |
| `npm run build` / `npm run lint` | ✓ built · 0 erreurs (1 warning pré-existant `react-refresh` sur `useLanguage`, sans impact) |

> Note : le seul « faux positif » du harnais (`scrollWidth 980` à 390 px après `goBack()`) provient de l'émulation mobile de Puppeteer qui perd son viewport après une navigation historique ; il n'apparaît pas lors du chargement direct ni dans les 10 largeurs testées.

---

## 2. Audit technique (hors scroll)

| # | Constat | Priorité |
|---|---|---|
| T1 | Bundle unique 513 kB : `framer-motion` (~120 kB gz) importé dans 20 fichiers pour des fades d'entrée. Pas de code-splitting de `/registration`. | P1 |
| T2 | Google Fonts : Inter ×7 graisses + Playfair ×14 styles. Le site n'utilise que Inter 400/500/600/700 et Playfair 700 (parfois 600). Chargement inutile ~60 %. | P1 |
| T3 | Deux mécanismes de reveal coexistent : `ScrollReveal` (IntersectionObserver custom + motion) et `motion.div whileInView`. Un seul doit rester. | P2 |
| T4 | `Statistics` et `Introduction` affichent **les 4 mêmes chiffres** (doublon de contenu à 2 sections d'écart). | P1 |
| T5 | `Methodology` = process d'admission déguisé en « pédagogie » ; `RegistrationProcess` répète 4 des 6 étapes. Redondance narrative. | P1 |
| T6 | `public/icons.svg` (sprite Bluesky/Discord/etc.) est un reliquat inutilisé. | P3 |
| T7 | `AnimatedCounter.jsx` + `useCountUp.js` : non importés (code mort). | P3 |
| T8 | `Footer` : icônes `Globe`/`ExternalLink` en guise de Facebook/Instagram ; liens légaux `href="#"`. | P2 |
| T9 | `GridOverlay` (dev-only, Ctrl+G) : utile, à garder. | — |
| T10 | Pas de `<link rel="preload">` ni de `font-display` contrôlé au-delà de `swap`. FOUT visible sur Playfair. | P2 |
| T11 | `index.html` : `og:image` pointe sur un SVG favicon (non supporté par les réseaux sociaux). | P2 |
| T12 | Aucun test. Le harnais Puppeteer créé pour cet audit (`/tmp/pw`) peut être versionné en `scripts/qa/` en Phase 5. | P2 |

---

## 3. Audit UX

| # | Constat | Priorité |
|---|---|---|
| U1 | **17 sections sur la home** (≈ 18 000 px à 1440 px, 21 000 px à 375 px). C'est 1,8× la longueur raisonnable pour une école primaire. Sections à fusionner : Intro+Stats, WhyChoose+Team, Methodology+RegistrationProcess, DigitalVision→note dans FAQ, Testimonials (vide)→retirer jusqu'à contenu réel. | P1 |
| U2 | Hero : 9 éléments concurrents (badge lieu · année · eyebrow · H1 · sous-titre · 2 CTA · lien découvrir · 3 trust items · flèche animée). La règle des 3 secondes n'est pas tenue. | P1 |
| U3 | 3 canaux de contact (tel, WhatsApp, e-mail) répétés dans navbar, barre mobile fixe, ContactStrip, Pricing, FAQ, FinalCTA, footer = 7 fois. Le bruit dilue le CTA principal. | P1 |
| U4 | Les libellés de CTA varient : « Préinscrire mon enfant » / « Demander une préinscription » / « Préparer une demande » / « Demander des informations » pour la **même** action. | P1 |
| U5 | Barre CTA mobile fixe + hero CTA + footer CTA : la barre masque 64 px de contenu en permanence sur mobile et double le CTA visible dès le hero. | P2 |
| U6 | Onglets Programmes : le libellé « Âges à confirmer » dans chaque onglet est du bruit — l'info est répétée dans le badge photo. | P2 |
| U7 | Sections placeholders (photo à venir, témoignages vides, tarifs non publiés) affichées **au même niveau visuel** que le contenu confirmé. Le site avoue 4 fois qu'il est incomplet. | P1 |
| U8 | Ancre `#contact` posée sur un bloc *à l'intérieur* de la FAQ : « Contact » dans la nav mène au milieu d'une autre section. | P2 |
| U9 | Le formulaire de pré-inscription est bien construit (stepper, revue, WhatsApp pré-rempli). À préserver. | — |

---

## 4. Audit UI

| # | Constat | Priorité |
|---|---|---|
| I1 | **Motif répétitif** : 14 sections = eyebrow pill centré → H2 Playfair → sous-titre gris → grille de cartes. Aucune asymétrie, aucune image, aucun grand chiffre isolé, aucune citation typographique. | P1 |
| I2 | **Cartes partout** : ≈ 45 cartes sur la home, 4 modèles de bordure différents (`border-neutral-100`, `-200`, `white/10`, `dashed`), 3 fonds (`white`, `surface-alt`, `white/5`). | P1 |
| I3 | **Palette qui fuit** : 56 usages de `emerald/amber/rose/violet/red/blue-*` hors tokens. Les tuiles d'icône WhyChoose sont rose/ambre/émeraude/violet — style « app store ». | P1 |
| I4 | **13 opacités de blanc** distinctes (`white/12` → `white/85`) sur fonds sombres. Aucune n'est un token. | P1 |
| I5 | Radius : 6 valeurs (`md, lg, xl, 2xl, 3xl, full`) — `2xl` (24 px) pour cartes ET conteneur d'image ET boîte d'alerte ; `xl` pour boutons ET inputs ET tuiles icône. Pas de logique. | P1 |
| I6 | Ombres : 5 niveaux + `shadow-lg shadow-accent-500/25` coloré. Cartes sans ombre mais boutons avec — profondeur inversée. | P2 |
| I7 | 8 blobs `blur-3xl` + 6 gradients + 10 `backdrop-blur` : vocabulaire « landing page SaaS » incompatible avec l'objectif institutionnel. La fenêtre macOS (3 pastilles rouge/jaune/vert) autour de la citation bilingue est un contresens pour une école. | P1 |
| I8 | Hero : dégradé + 2 blobs + trame de points + fondu bas. Le titre est fort mais l'ambiance est « fintech ». | P1 |
| I9 | Bouton accent doré `#C8963E` avec texte blanc : 2.66:1 (échec AA). | P0-a11y |
| I10 | 4 animations infinies (flèche hero, pulsation citation, 2 bulles Methodology) : mouvement décoratif sans fonction. | P2 |
| I11 | Stats : `2025-26`, `Crèche → CM2`, `2`, `50 / 50` traités comme des « big numbers » — 3 sur 4 ne sont pas des nombres. Le pattern chiffres-clés est utilisé sans matière. | P1 |
| I12 | Icône « J » dans un carré comme logo : acceptable en attendant le logo, mais rendu 3 fois différemment (nav, footer, mobile). | P2 |
| I13 | Tableau horaire bilingue : bon contenu, mais texte 12 px, alternance de couleurs `accent-300`/`primary-200` peu lisible. | P2 |
| I14 | Footer : correct structurellement ; copyright à `white/20` (1.84:1) illisible ; « Année 2026-2027 » et « Visiter l'école » pointent vers des ancres approximatives. | P2 |

---

## 5. Audit typographique (mesuré)

Tailles calculées réellement rendues (occurrences d'éléments textuels, home 1440 px) :
`10px ×8 · 11px ×19 · 12px ×71 · 14px ×148 · 16px ×53 · 18px ×20 · 20px ×2`

À 375 px : `10px ×8 · 11px ×38 · 12px ×115 · 14px ×128 · 16px ×28`.

- **Le corps de texte dominant est 14 px** ; 16 px est minoritaire ; **sur mobile 40 % du texte est ≤ 12 px**. Pour un public de parents lisant sur smartphone, c'est le principal frein de lisibilité.
- Eyebrows en `tracking-[0.2em]` uppercase 11 px : trop petit pour un tracking aussi large.
- H2 `clamp(1.5rem, 3.5vw+0.5rem, 3.5rem)` + Playfair Bold : bon. H1 jusqu'à 88 px : trop pour un site d'école (le titre occupe 3 lignes à 1440 px).
- `leading-[1.08]` sur Playfair : les accents français (É, è) touchent la ligne du dessus → prévoir 1.1–1.15.
- Aucune limite de mesure sur les paragraphes centrés (`max-w-xl` = 576 px ≈ 75–85 caractères à 16 px : limite haute acceptable, mais à 18 px OK).

---

## 6. Audit couleur & contraste (calculs WCAG)

| Paire actuelle | Ratio | AA |
|---|---|---|
| `white/60` sur `primary-950` (hero sous-titre) | 7.10 | ✅ |
| `white/45` sur `primary-950` (trust items, liens footer) | 4.48 | ⚠️ limite (texte 12–14 px : échec) |
| `white/35` sur `primary-900` (note stats) | 3.14 | ❌ |
| `white/30` (note FinalCTA) | 2.65 | ❌ |
| `white/20` (copyright footer) | 1.84 | ❌ |
| `neutral-500` sur `#FAFAF8` (sous-titres) | 4.54 | ✅ juste |
| `neutral-400` sur blanc (labels 11 px uppercase) | 2.52 | ❌ |
| Blanc sur `accent-500` (CTA hero/finale) | 2.66 | ❌ |
| `primary-400` sur blanc (numéros Methodology) | 2.80 | ❌ |
| `emerald-600` sur `emerald-50` | 3.58 | ❌ |
| Blanc sur `primary-600` | 9.51 | ✅ |

Conclusion : la couleur primaire teal est solide ; **l'accent doré est utilisé à contre-emploi** (fond de bouton avec texte blanc) et **la hiérarchie des gris est obtenue par opacité**, ce qui est ingérable et non conforme.

---

## 7. Audit responsive (mesuré)

| Largeur | Overflow X | Hauteur page | Observations |
|---|---|---|---|
| 320 | aucun | 22 572 px | Onglets Programmes en scroll horizontal (OK), H1 27 px (OK). Barre CTA fixe + header = 128 px d'écran perdus. |
| 375 / 390 / 414 | aucun | ≈ 21 000 px | Hero occupe 100dvh avec 3 trust items sur 2 lignes. Cartes empilées ×45 → scroll infini. |
| 480 | aucun | 19 442 px | `xs` breakpoint passe les CTA côte à côte : bien. |
| 768 | aucun | 19 740 px | Grilles 2 colonnes correctes. Navbar encore en mode mobile (`lg`) : 768–1023 utilise le hamburger, acceptable. |
| 1024 | aucun | 17 760 px | Navbar desktop tassée : 6 liens + WhatsApp + tél + CTA + langue = 11 éléments ; le tél passe sur 2 lignes. |
| 1280 / 1440 | aucun | ≈ 18 000 px | Marges 96 px fluides : bien. Sections trop hautes (Bilingual 1 889 px). |
| 1600 | aucun | 18 679 px | Container 1440 max : OK. Hero H1 88 px. |

Le système de grille 4/8/12 colonnes existant (`container-page`, `grid-page`, `col-span-*`) est **bon et doit être conservé** — il est simplement sous-utilisé (la plupart des sections utilisent des `grid-cols-*` Tailwind ad hoc et des `max-w-*` centrés).

---

## 8. Audit accessibilité

| # | Constat | Priorité |
|---|---|---|
| A1 | Contrastes échoués listés §6 (8 paires). | P0 |
| A2 | 12 cibles tactiles < 40 px : switch EN/FR (33×24 px), liens footer (hauteur 16 px), « Découvrir l'école », liens tél/e-mail footer. | P1 |
| A3 | Focus : `focus-visible:ring-2 ring-primary-500` présent sur Button/Accordion, **absent** sur les liens nav, footer, onglets programmes, LanguageSwitcher. | P1 |
| A4 | `LanguageSwitcher` compact : `<button>` sans `aria-pressed` ni `lang`. | P1 |
| A5 | Onglets Programmes : `role="tab"` sans `role="tablist"` parent correctement lié à un `tabpanel` (`aria-controls` manquant), pas de navigation flèches. | P2 |
| A6 | Icônes décoratives Lucide sans `aria-hidden` (ex. tuiles d'icône). Lecteurs d'écran lisent des SVG vides. | P2 |
| A7 | Hiérarchie de titres : H1 unique ✅ ; mais `Statistics` sans titre (section `aria-label` seulement), `ContactStrip` commence en H3. | P2 |
| A8 | `prefers-reduced-motion` : géré globalement par CSS (`animation-duration: 0.01ms`), mais Framer Motion anime via JS inline — les `animate={{ y }}` s'exécutent quand même. Utiliser `useReducedMotion()` ou `MotionConfig reducedMotion="user"`. | P1 |
| A9 | Formulaire : labels liés ✅, erreurs `role="alert"` ✅, `aria-invalid` manquant, `autocomplete` manquant (`given-name`, `tel`, `email`…). | P2 |
| A10 | Menu mobile : `Escape` ✅, scroll lock ✅, **pas de focus trap** ni de retour du focus au bouton hamburger. | P1 |
| A11 | `<html lang>` mis à jour dynamiquement ✅. | — |

---

## 9. Audit contenu

| # | Constat | Priorité |
|---|---|---|
| C1 | Tagline « Éveiller le potentiel, inspirer l'excellence. » : générique, interchangeable avec n'importe quelle école. À conserver *en signature* si l'école y tient, mais **pas comme H1** ; le H1 doit dire ce qu'est l'école (bilingue, maternelle-primaire, Ouêdo). | P1 |
| C2 | Sous-titres de section systématiquement méta (« Les informations communiquées par l'école… », « Les engagements communiqués par l'école… ») : ton de rapport administratif, répété 6 fois. | P1 |
| C3 | 4 mentions « à venir / non publié / à confirmer / en cours » visibles au premier scroll. Regrouper la transparence en un seul bloc discret. | P1 |
| C4 | Excellent : rien n'est inventé (frais, effectifs, témoignages, logo). Cette discipline doit être maintenue. | — |
| C5 | Vocabulaire : « apprenants » (institutionnel) vs « enfants » (parental) mélangés. Choisir « enfants » côté parents, « élèves » côté scolaire. | P2 |

---

## 10. Liste consolidée P0 / P1 / P2 / P3

### P0 — Bloquant
1. ✅ **Scroll molette/touch cassé** — corrigé (`overflow-x: clip`, retrait `overscroll-behavior` sur body).
2. Contrastes < 3:1 sur du texte : `white/20`, `white/30`, `white/35`, `neutral-400` labels, bouton doré texte blanc, `primary-400` sur blanc.

### P1 — Important
3. Fondations : tokens couleur/typo/espace/radius/ombre/motion (`src/styles/tokens.css`) ; suppression des 56 couleurs hors palette et des 13 opacités.
4. Corps de texte 16 px minimum sur mobile ; plus aucun texte fonctionnel < 13 px.
5. Réduction de la home de 17 à ~11 sections (fusions listées U1) — sans perdre d'information.
6. Hero : hiérarchie 6 éléments max ; CTA unique dominant ; H1 descriptif.
7. Unifier les libellés du CTA principal (un seul verbe) et réduire la répétition des canaux de contact.
8. Système de cartes (4 variantes max) ; sortir des cartes ce qui n'en a pas besoin (listes, étapes, notes).
9. Accessibilité : focus visible partout, cibles ≥ 44 px, focus trap menu mobile, `MotionConfig reducedMotion="user"`.
10. Performance : code-split `/registration`, réduire les graisses de polices chargées, remplacer les reveals Framer par CSS + IO là où c'est trivial.
11. Retirer le vocabulaire « SaaS » : blobs flous, fenêtre macOS, gradients décoratifs, animations infinies.

### P2 — Amélioration
12. Nav desktop : 5 liens max + 1 CTA + langue ; tél/WhatsApp dans le menu « Contact » ou le footer.
13. Ancre `#contact` → vraie section Contact (fusion ContactStrip + bloc FAQ).
14. Onglets Programmes → pattern `tablist` conforme ; ou liste verticale sur mobile.
15. `og:image` PNG, preload des polices, `font-display`.
16. Footer : icônes sociales réelles uniquement quand les liens existent ; mentions légales réelles ou masquées.
17. Formulaire : `autocomplete`, `aria-invalid`.
18. Harnais QA versionné (`scripts/qa/*.mjs`).

### P3 — Polish
19. Nettoyage code mort (`AnimatedCounter`, `useCountUp`, `public/icons.svg`).
20. Micro-interactions : accordéon FAQ avec `grid-template-rows` CSS au lieu de Framer height auto.
21. Favicon/logo dès réception des assets officiels.

---

## 11. Ce qui fonctionne et doit être conservé

- Architecture React/Vite/Tailwind 4, `LanguageContext`, `useT`, structure `src/data/*`, `translations/{fr,en}.js`.
- Grille `container-page` / `grid-page` 4-8-12 colonnes avec marges fluides et `GridOverlay` de dev.
- Discipline de contenu (aucune donnée inventée).
- Composants `Button`, `Accordion`, `FormField`, `Stepper` : bonnes bases API, à re-skinner et non réécrire.
- Le parcours de pré-inscription (6 étapes, revue, WhatsApp pré-rempli, ref `REG-xxxxxx`).
- Scroll lock du menu mobile qui préserve la position (bien fait).
- Navbar : logique `scrolled` / `isDarkBg`, barre CTA mobile avec anti-flicker.
- Couleur primaire `#0F4C5C` (teal profond) : crédible, différenciante, bon contraste. Doré comme accent : pertinent **s'il sert aux détails, pas aux fonds de bouton**.
- Playfair Display + Inter : couple juste pour « excellence académique contemporaine ». On garde, on discipline.
