# EBJV — DESIGN SYSTEM + ART DIRECTION V2

> Référence absolue pour la Phase 2. Complète `AUDIT_V2.md` (mesures détaillées), `DESIGN_SYSTEM_V2.md` et `ART_DIRECTION_V2.md`. En cas de divergence, **ce document prévaut**.
> Base auditée : commit `656a3a7` + fix scroll `0b4e358`. Méthode : lecture de 100 % de `src/`, captures Chromium headless à 320/375/390/414/480/768/1024/1280/1440/1600 px, ratios WCAG calculés, tailles de police réellement rendues.

---

## 01 — Executive Design Diagnosis

**Verdict en une phrase : une bonne base technique et un couple typographique juste, habillés avec le vocabulaire d'une landing page SaaS, et étirés sur 17 sections qui répètent le même motif.**

| Critère | Constat mesuré | Impact sur la qualité perçue |
|---|---|---|
| Hiérarchie visuelle | H1 jusqu'à 88 px, corps dominant **14 px**, 111 occurrences ≤ 12 px (40 % du texte sur mobile) | Top-heavy : gros titres, lecture pénible |
| Contraste | 8 paires en échec AA : `white/20` 1.84, `white/30` 2.65, `white/35` 3.14, `neutral-400` 2.52, **CTA doré texte blanc 2.66**, `primary-400` 2.80, `emerald-600/50` 3.58 | Le CTA principal du hero et du CTA final est illisible en plein soleil |
| Rythme vertical | 18 225 px à 1440, 21 112 px à 375 ; 14 sections / 17 = « eyebrow pill centré → H2 → sous-titre → grille de cartes » | Monotonie ; le parent décroche avant Admission |
| Densité | ≈ 45 cartes sur la home ; 7 rappels des mêmes 3 canaux de contact | Bruit ; le CTA principal se dilue |
| Largeur / grille | Système 4/8/12 colonnes bien conçu (`container-page`, `grid-page`) mais **sous-utilisé** : les sections empilent des `max-w-xl mx-auto` arbitraires | Contenus qui « flottent » au centre |
| Espacements | `py-section` fluide + 4 exceptions manuelles ; gaps 3/4/5/6 mélangés dans une même grille | Impression d'à-peu-près |
| Typographie | Playfair Display 700 + Inter : juste. Mais 21 fichiers de polices chargés pour 5 utilisés ; eyebrows 11 px en `tracking-[0.2em]` ; `leading-[1.08]` coupe les accents capitales | Chargement lent, détails « cheap » |
| Couleurs | Palette tokenisée (primary/accent/neutral) mais **56 usages hors palette** (emerald, amber, rose, violet, red, blue) + **13 opacités de blanc** distinctes | Aucune discipline ; tuiles arc-en-ciel façon app store |
| Contraste entre fonds | `surface #FAFAF8` / `surface-alt #F5F4F0` / blanc : alternance quasi invisible (1.02:1) ; ink `primary-950` fort | Les sections claires se confondent |
| Cartes | 4 bordures différentes, 3 fonds, radius `2xl` (24 px) partout : cartes-galets | Look Webflow |
| Boutons | 6 variantes dont 2 « white » ; `shadow-lg shadow-accent-500/25` coloré | Hiérarchie floue |
| Iconographie | Lucide (bon choix), **57 icônes distinctes**, tailles 11→40 px, tuiles colorées, doublon numéro + icône | Manque de règle |
| Images | 0 photo ; 3 styles différents de placeholder ; carrés décoratifs dans le placeholder intro | Honnête mais bricolé |
| Sections sombres | 4 (Hero, Stats, Bilingual, FinalCTA) + footer : 8 blobs `blur-3xl`, 6 gradients, 10 `backdrop-blur`, trame de points, **fenêtre macOS** autour de la citation | Fintech, pas école |
| Transitions | Fondu `from-surface` sous le hero ; blobs à cheval | Sections « liées » artificiellement |
| Navigation | 11 éléments à 1024 px (téléphone sur 2 lignes) ; switch langue 33×24 px ; hamburger en bloc teal plein | Encombrée |
| Footer | Structure correcte ; copyright 1.84:1 ; icônes sociales fausses ; 2 JSX dupliqués desktop/mobile | Finition faible |
| Responsive | 0 overflow horizontal (bien) ; 12 cibles < 40 px ; onglets programmes en scroll horizontal masquent l'existence des autres programmes | Mobile compressé, pas dessiné |
| Perception de marque | Teal profond + doré + serif = **crédible et différenciant**. Exécution = template | Le potentiel est là, la maîtrise non |
| Cohérence | Chaque section réinvente sa carte, son badge, sa couleur d'icône, sa note « à venir » | Absence de système |

---

## 02 — Current Design: Keep / Improve / Remove

### ✅ Conserver tel quel
- Architecture React 19 / Vite 8 / Tailwind 4 / react-router, `LanguageContext`, `useT`, `src/data/*`, `translations/{fr,en}.js`.
- Grille `container-page` / `grid-page` / `col-span-*` et `GridOverlay` (Ctrl+G).
- Discipline de contenu : **rien d'inventé** (frais, effectifs, témoignages, logo).
- Parcours de pré-inscription (6 étapes, revue, WhatsApp pré-rempli, `REG-xxxxxx`).
- Navbar : logique `scrolled`/transparent, anti-flicker de la barre mobile, scroll-lock qui préserve la position.
- API des composants `Button`, `Accordion`, `FormField`, `Stepper` (à re-skinner, pas à réécrire).
- Couleur primaire `#0F4C5C`, doré comme accent, couple Playfair + Inter.

### 🔧 Améliorer
- Hiérarchie typographique (corps 16–17 px, plancher 13 px), tracking, line-height.
- Palette : réduire à 16 + 4 sémantiques, supprimer opacités et couleurs ad hoc.
- Cartes : 4 variantes, ≤ 18 sur la home.
- Boutons : hiérarchie 1 Primary / viewport ; doré cliquable **uniquement** avec texte ink.
- Nav : 5 liens, cibles 44 px, hamburger icon-button.
- Footer : 1 JSX, contrastes, colonnes.
- Placeholders : un seul composant.
- Onglets programmes : accessibles desktop, empilés mobile.
- Reveals : CSS + IntersectionObserver au lieu de Framer partout.

### ❌ Supprimer
- Blobs `blur-3xl`, gradients de fond, `backdrop-blur`, trame de points, fondu bas de hero, fenêtre macOS, 4 animations infinies.
- Tuiles d'icône colorées (rose/ambre/émeraude/violet), couleur par programme.
- Section **Statistics** (doublon exact d'Introduction), **Testimonials** de la home (vide), **DigitalVision** (→ 1 entrée FAQ), **ContactStrip** (→ section Contact), **Pricing** autonome (→ colonne Admission).
- Radius `xl/2xl/3xl`, ombres colorées, `shadow-sm` sur boutons.
- Libellés multiples du même CTA ; « apprenants » sur le site public ; sous-titres méta « informations communiquées par l'école ».
- Code mort : `AnimatedCounter`, `useCountUp`, `public/icons.svg`.

---

## 03 — EBJV Visual DNA

**Phrase directrice** : *« Le prospectus d'une grande école, mis en page par un quotidien de qualité, lu sur un téléphone. »*

**Mots-clés (ordre de priorité)** : **Éditorial · Académique · Humain · Structuré · Calme · Contemporain · Premium par retenue**

| Dimension | V1 | V2 | Traduction |
|---|---|---|---|
| Sophistication | 6 | 8 | Serif 600 (pas 700 partout), filets, numérotation, air |
| Chaleur humaine | 4 | 7 | Papier chaud, gris teintés, photos de vie scolaire, ton parental |
| Autorité institutionnelle | 5 | 8 | Ink profond, grille stricte, tableaux propres, vocabulaire fermé |
| Modernité | 7 | 7 | Contrastes francs, asymétrie 5/7, motion courte |
| Éditorial | 4 | 8 | La typographie porte tout ; cartes minoritaires |
| Minimalisme | 3 | 6 | 3 fonds, 2 couleurs vives, 1 idée par section |
| « Tech / SaaS » | 7 | **1** | Zéro effet de verre, zéro glow |

**Principes artistiques** : (1) la lecture avant le décor ; (2) l'asymétrie sur grille ; (3) le doré est une médaille, pas une peinture ; (4) le sombre est un moment de gravité, pas une ambiance ; (5) le vide est dessiné.

**Références d'esprit** (pas de copie) : sites d'universités européennes bien tenus, magazines éducation, papeterie scolaire de qualité. **Repoussoirs** : landing SaaS, template Framer/Webflow, fintech, crypto, site « kids » multicolore, luxe parfumerie.

---

## 04 — Color System

Philosophie : **3 fonds · 1 voix (teal) · 1 médaille (doré) · 4 statuts**. Aucune opacité sur du texte. Toute couleur absente de ce tableau n'existe pas.

### Brand

| Token | Nom | HEX | RGB | Rôle | Usage | Interdit |
|---|---|---|---|---|---|---|
| `--color-primary` | Teal EBJV | `#0F4C5C` | 15 76 92 | **Primary** — voix de l'école | Bouton primaire, liens, icônes actives, focus ring, onglet actif, puces | Fond de section (→ ink) ; grandes surfaces |
| `--color-primary-dark` | Teal profond | `#0A3542` | 10 53 66 | **Primary Dark** | Hover/active du primaire, bordure active | Texte courant |
| `--color-primary-light` | Teal lavé | `#E3EFF2` | 227 239 242 | **Primary Light** | Fond chip, encart info, fond tuile icône, cellule sélectionnée | Texte ; bordure seule |
| `--color-ink` | Encre | `#081F29` | 8 31 41 | **Secondary** — fond de gravité | Hero, section Bilinguisme, CTA final, footer | Texte sur clair (→ text-1) |
| `--color-ink-2` | Encre relevée | `#0C2A36` | 12 42 54 | Surface sur ink | Bloc/tableau sur fond ink (remplace `white/5`) | Ailleurs que sur ink |
| `--color-gold` | Doré | `#B8862E` | 184 134 46 | **Accent** | Filets, numéros ≥ 24 px, icône ponctuelle, ligne décorative | Fond de bouton ; texte < 24 px sur clair (3.07:1) |
| `--color-gold-light` | Doré clair | `#D9B36A` | 217 179 106 | Accent sur ink | Eyebrow, icône, filet sur ink ; **fond du CTA sur ink avec texte ink** | Sur fond clair |
| `--color-gold-deep` | Doré texte | `#7F5B1C` | 127 91 28 | Accent lisible sur clair | Eyebrow / numéro d'étape sur paper/linen (5.84:1) | Surfaces |

### Neutrals (chauds, teintés encre)

| Token | Rôle demandé | HEX | RGB | Usage |
|---|---|---|---|---|
| `--color-paper` | **Background** | `#FAF9F6` | 250 249 246 | Fond de page, sections claires 1 |
| `--color-linen` | **Surface** (alt) | `#F2F0EA` | 242 240 234 | Sections claires 2, blocs calmes, fond Tertiary |
| `--color-white` | **Surface Elevated** | `#FFFFFF` | 255 255 255 | Cartes, inputs, header solide, panneau menu |
| `--color-border` | **Border** | `#E2DED5` | 226 222 213 | Bordures cartes, filets, séparateurs |
| `--color-border-strong` | Border appuyée | `#B9B2A4` | 185 178 164 | Bordure d'input, hover de bordure |
| `--color-border-inverse` | Border sur ink | `rgb(255 255 255 / .14)` | — | Filets sur ink (non textuel) |
| `--color-text-1` | **Text Primary** | `#111C24` | 17 28 36 | Titres, corps principal |
| `--color-text-2` | **Text Secondary** | `#44515B` | 68 81 91 | Corps secondaire, leads |
| `--color-text-3` | **Text Muted** | `#5A666F` | 90 102 111 | Légendes, méta, placeholders (≥ 5.17:1) |
| `--color-text-inverse` | **Text Inverse** | `#FFFFFF` | 255 255 255 | Titres/corps sur ink |
| `--color-text-inverse-2` | Inverse secondaire | `#BFC5C7` | 191 197 199 | Corps sur ink (remplace white/60–75) |
| `--color-text-inverse-3` | Inverse muted | `#97A1A5` | 151 161 165 | Légendes sur ink — minimum autorisé |

### Semantic (texte + fond appairés, jamais décoratifs)

| Token | Texte | Fond | Ratio | Usage |
|---|---|---|---|---|
| `success` | `#1F7A4D` (31 122 77) | `#E6F2EC` | 4.63 | Badge « Disponible », étape validée |
| `warning` | `#7A520C` (122 82 12) | `#FBF3E1` | 6.25 | « En cours », « à confirmer », frais non publiés |
| `error` | `#B42318` (180 35 24) | `#FBEAE8` | 5.65 | Erreurs de formulaire |
| `info` | = primary | = primary-light | 8.10 | Notes neutres |

### Matrice de contraste (WCAG 2.1, vérifiée)

| Paire | Ratio | | Paire | Ratio |
|---|---|---|---|---|
| text-1 / paper | 16.41 AAA | | white / primary (bouton) | 9.51 AAA |
| text-2 / paper · linen | 7.75 · 7.16 AAA | | primary / paper (lien) | 9.03 AAA |
| text-3 / paper · linen · white | 5.60 · 5.17 · 5.89 AA | | primary / primary-light (chip) | 8.10 AAA |
| gold-deep / paper · linen | 5.84 · 5.40 AA | | **ink / gold-light (CTA sur ink)** | 8.57 AAA |
| gold-light / ink · ink-2 | 8.57 · 7.58 AAA | | text-inverse-2 / ink · ink-2 | 9.71 · 8.59 AAA |
| text-inverse-3 / ink · ink-2 | 6.43 · 5.68 AA | | focus primary / paper (UI ≥ 3) | 9.03 ✅ |

Cohérence dark/light : même teinte de gris (encre) des deux côtés ; le doré change de valeur (deep sur clair, light sur sombre) mais pas de teinte ; primary n'apparaît **jamais** sur ink (1.78:1) — sur ink, le rôle « voix » est tenu par white + gold-light.

---

## 05 — Typography System

**Familles** — Titres : `"Playfair Display", "Iowan Old Style", Georgia, serif` (600 par défaut, 700 Display/H1). Texte/UI : `Inter, system-ui, -apple-system, "Segoe UI", sans-serif` (400/500/600). Fichiers chargés : **5** (Playfair 600, 700, 600 italic ; Inter 400, 500, 600 via variable ou 3 statiques) au lieu de 21. `font-display: swap`, preload Playfair 600.

| Niveau | Famille · graisse | Desktop | Tablet | Mobile | LH | Tracking | Max-width |
|---|---|---|---|---|---|---|---|
| **Display** (hero) | Playfair 700 | 64 | 52 | 38 (34 @320) | 1.08 | −0.015em | 14ch |
| **H1** (pages internes) | Playfair 700 | 48 | 40 | 32 | 1.12 | −0.01em | 18ch |
| **H2** | Playfair 600 | 40 | 34 | 28 | 1.15 | −0.01em | 22ch |
| **H3** | Playfair 600 | 28 | 24 | 22 | 1.25 | 0 | 30ch |
| **H4** | Inter 600 | 20 | 18 | 18 | 1.35 | 0 | 40ch |
| **Body Large** | Inter 400 | 20 | 18 | 17 | 1.6 | 0 | 60ch |
| **Body** | Inter 400 | 17 | 16 | 16 | 1.65 | 0 | 65ch |
| **Body Small** | Inter 400 | 15 | 15 | 15 | 1.6 | 0 | 65ch |
| **Caption** | Inter 400/500 | 13 | 13 | 13 | 1.5 | 0.005em | 50ch |
| **Eyebrow / Label** | Inter 600 uppercase | 13 | 13 | 12 | 1.2 | 0.08em | — |
| **Button** | Inter 600 | 15 md · 16 lg | = | = | 1 | 0.005em | — |
| **Navigation** | Inter 500 | 15 | 15 | 17 (menu) | 1 | 0 | — |
| **Stat** | Playfair 600 tabular | 56 | 48 | 40 | 1 | −0.02em | — |
| **Quote** | Playfair 600 italic | 36 | 30 | 24 | 1.3 | 0 | 40ch |

Clamps : Display `clamp(2.375rem, 1.5rem + 3.7vw, 4rem)` · H1 `clamp(2rem, 1.4rem + 2.5vw, 3rem)` · H2 `clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem)` · H3 `clamp(1.375rem, 1.2rem + .75vw, 1.75rem)` · Stat `clamp(2.5rem, 1.8rem + 2.9vw, 3.5rem)`.

**Règles** : plancher **13 px** (fin de `text-xs`, `text-[11px]`, `text-[10px]`) ; corps mobile **16 px** ; H2 ≤ 2 lignes à toute largeur (sinon on réécrit) ; `text-wrap: balance` titres, `pretty` paragraphes ; `hyphens: auto` **paragraphes seulement** ; uppercase ≤ 0.08em ; jamais de tracking positif sur serif ; contraste titre/corps obtenu par serif 600 vs sans 400 + text-1 vs text-2, **pas** par du gras dans les paragraphes ; `tabular-nums` sur horaires, chiffres, téléphones ; Playfair LH ≥ 1.08 (accents capitales).

---

## 06 — Spacing System

Base 4 px, courbe 8-pt, sauts éditoriaux au-delà de 64.

| Token | px | Usage |
|---|---|---|
| `1` | 4 | Icône ↔ label ; chip vertical |
| `2` | 8 | Gap intra-composant ; chip horizontal ; icône ↔ texte bouton |
| `3` | 12 | Eyebrow → titre ; bouton sm vertical |
| `4` | 16 | Titre → paragraphe ; padding carte mobile ; gutter mobile |
| `5` | 20 | Gutter tablet ; gap liste ; padding carte tablet |
| `6` | 24 | Gutter desktop ; gap grille ; padding carte desktop (32 pour Program) |
| `8` | 32 | Paragraphe → CTA ; gap grille large |
| `10` | 40 | Bloc → bloc intra-section (mobile) ; section compacte mobile |
| `12` | 48 | En-tête section → contenu (mobile) ; bloc → bloc (desktop) |
| `16` | 64 | En-tête → contenu (desktop) ; **section mobile** ; section compacte desktop |
| `20` | 80 | **Section tablet** ; section « air » mobile |
| `24` | 96 | **Section desktop** |
| `32` | 128 | Section « air » desktop (CTA final) |

| Contexte | Mobile | Tablet | Desktop |
|---|---|---|---|
| Section standard `py` | 64 | 80 | 96 |
| Section compacte (Contact) | 40 | 48 | 64 |
| Section air (CTA final) | 80 | 96 | 128 |
| En-tête → contenu | 40 | 48 | 64 |
| Eyebrow → H2 / H2 → lead / lead → CTA | 12 / 16 / 24 | 12 / 16 / 32 | 16 / 20 / 32 |
| Gap cartes | 16 | 20 | 24 |
| Padding carte | 20 | 24 | 24–32 |
| Bouton md / lg (v · h) | 12·20 / 14·24 | = | = |
| Paragraphe → paragraphe | 16 | 16 | 20 |

Tokens fluides : `--spacing-section: clamp(4rem, 3rem + 4vw, 6rem)` · `-compact: clamp(2.5rem, 2rem + 2vw, 4rem)` · `-air: clamp(5rem, 3.5rem + 5vw, 8rem)` · `-head: clamp(2.5rem, 2rem + 2vw, 4rem)`.
Deux sections adjacentes **de même fond** : filet `border` pleine largeur de container, et la seconde garde son padding (pas de cumul 192 px : la première perd 32 px en bas).

---

## 07 — Grid & Containers

| | Mobile < 768 | Tablet 768–1279 | Desktop ≥ 1280 |
|---|---|---|---|
| Colonnes | 4 | 8 | 12 |
| Marge latérale | 16 (20 ≥ 480) | 32 → 80 fluide | 80 |
| Gutter | 16 | 20 | 24 |
| `container-page` (max contenu) | 100 % | 100 % | **1280 px** (12×88 + 11×24 ; cadre 1440) |
| `container-prose` | 100 % | 8 col | 8 col centrées ≈ 840 px |
| `container-narrow` | 100 % | 6 col | 6 col centrées ≈ 620 px |

Ajustements V1 → V2 : marge desktop 96 → **80**, gutter 20 → **24**, max 1248 → **1280**. Au-delà de 1600 : container fixe, fonds pleine largeur, hero plafonné à 820 px.

**Règles d'alignement** :
- **Texte** : commence colonne 1 (gauche, 8 col max) — ou colonnes 3–10 si centré (CTA final uniquement). Plus de `max-w-* mx-auto` hors containers nommés.
- **Images** : bord sur ligne de colonne ; bleed autorisé **à droite, desktop, Editorial Split uniquement**.
- **Cartes** : 12 → 3×4 col, 4×3 col, 2×6 col ; tablet 2×4 col ; mobile 4 col pleines.
- **Splits** : 5/7 (media/texte), 6/6 (hero), 7/5 (process/sticky). Jamais 50/50 flottant.
- Vérification : Ctrl/Cmd+G avant chaque livraison.

---

## 08 — Section System

10 types autorisés. Toute section de la Phase 2 en instancie **un**.

| Type | Structure | Largeur | Padding | Fond | Hiérarchie | Alignement | Composants autorisés | Mobile |
|---|---|---|---|---|---|---|---|---|
| **S1 Hero Ink** | Eyebrow → Display → Lead → 2 CTA ‖ bloc faits (photo plus tard) | page, split 6/6 | pt 128 (sous nav) · pb 96 ; `min-h: min(88dvh, 820px)` | ink uni + filet vertical gold 1 px marge gauche | Display > Lead > CTA > faits | gauche | Button primaryOnInk/secondaryOnInk, Stat-list, MediaPlaceholder | empilé ; faits 2×2 sous CTA ; CTA pleine largeur |
| **S2 Editorial Split** | Media 5 col ‖ Eyebrow → H2 → 2 ¶ → faits/méta | page, 5/7 | standard | paper ou linen | H2 > Body > faits | gauche | MediaPlaceholder/img, Stat (sur filet), Badge, Divider | media au-dessus, ratio 4:5 → 3:2 |
| **S3 Editorial List** | En-tête 8 col → liste numérotée 2 col → (option) 3 Card/Default | page | standard | paper/linen | H2 > H4 numérotés > Body Small | gauche | Eyebrow, numéro Playfair gold-deep, Divider, Card/Default | 1 col ; numéros à gauche |
| **S4 Feature Grid** | En-tête 8 col → grille 3 ou 4 col | page | standard | paper/linen | H2 > H4 cartes | gauche | Card/Default, IconTile, Badge | 1 col (2 ≥ 480) |
| **S5 Program Showcase** | En-tête → Tabs → Card/Program large ; + Notice | page, linen | standard | linen | H2 > H3 programme > méta | gauche | Tabs, Card/Program, chips, Notice, Text link | **pas d'onglets** : 3 Card/Program empilées |
| **S6 Statement Ink** | Eyebrow → H2 → Quote → tableau ink-2 → 4 bénéfices sur filets | page | standard | ink | H2 > Quote > tableau > H4 | gauche | Quote, Table, IconTile inverse, Divider inverse | tableau → liste `<dl>` < 480 ; bénéfices 1 col |
| **S7 Process Split** | Étapes numérotées 7 col ‖ 5 col sticky (pièces, Notice, CTA) | page, 7/5 | standard | linen | H2 > 01–06 H4 > panneau | gauche | numéro gold-deep + filet vertical, Card/Default (1), Notice, Button primary | panneau sous les étapes, non sticky |
| **S8 Accordion** | H2 → Accordion | narrow | standard | paper | H2 > question 17 px 600 | gauche | Accordion | identique |
| **S9 Contact Strip** | 3 colonnes icône + H4 + caption + Tertiary | page | compact | paper + filet haut | H4 | gauche | IconTile, Button tertiary | 1 col |
| **S10 CTA Ink** | Eyebrow → H2 centré → Lead → Primary + Secondary | prose | air | ink uni, filet gold en bas | H2 > CTA | **centré** | Button primaryOnInk / secondaryOnInk | CTA empilés pleine largeur |
| **Footer** | voir §19 | page | 64 / 80 / 96 | ink | — | gauche | — | voir §19 |
| **Page Header** (interne) | H1 + Lead + Stepper | narrow | pt 112 · pb 32 | paper | H1 | gauche | Stepper | identique |
| **Form Panel** | Card/Default blanc, champs, actions | narrow | — | paper | H3 étape | gauche | FormField, Button primary/text, Notice error | 1 col |

Interdits pour toute section : plus d'un en-tête H2 ; fond gradient ; élément décoratif hors filet gold ; combinaison de deux types.

---

## 09 — Card System

**Règle d'existence** : une carte encadre une **unité autonome, répétée ≥ 2 fois, comparable**. Un bloc seul, une note, une liste, un CTA, une citation → **pas de carte** (filets, colonnes, Notice, espace).

Base commune : radius `md` 12 · bordure 1 px `border` · fond `white` (sur paper/linen) ou `ink-2` + `border-inverse` (sur ink) · ombre **none** · padding 20 / 24 / 32 · titre H4 (Inter 600 20/18) · description Body Small text-2 · icône via IconTile 40 (20 px, primary sur primary-light ; gold-light sur ink-2 sur ink) · gap titre→desc 8, icône→titre 16.

| Variante | Spécificités | Hover (si cliquable) | Active | Selected | Disabled |
|---|---|---|---|---|---|
| **Card / Default** | Icône → H4 → Body Small ; option Badge coin haut droit | bordure `border-strong` + `translateY(-2px)` 200 ms | `translateY(0)` | — | opacité .5, sans hover |
| **Card / Program** | **Filet gauche 3 px primary** ; Eyebrow niveau → H3 Playfair → Body → méta liste (icône 16 + caption) → chips radius xs → Text link | + `shadow-subtle` | — | bordure 1.5 px primary + fond primary-light (formulaire) | opacité .5 |
| **Card / Stat** | **Sans fond ni bordure** ; filet **haut** 1 px (border / gold sur ink) ; Stat number → Caption | — | — | — | — |
| **Card / Notice** | Fond sémantique-bg ; bordure 1 px sémantique à 30 % ; icône 20 + Body Small/Caption ; padding 16–20 | — | — | — | — |

Objectif : ≈ 45 → **≤ 18 cartes** sur la home. Supprimées : cartes de liste (activités), carte « photos à venir », carte « pièces à fournir » seule (→ panneau S7), cartes d'étapes, cartes verre, carte citation.

---

## 10 — Button System

Commun : radius `sm` 8 · Inter 600 · hauteurs **sm 40 / md 48 / lg 56** (mobile md/lg = 52, pleine largeur ≤ 480) · padding h 16 / 20 / 24 · gap icône 8 · icône `ArrowRight` 16 (sm) / 20 · transition fond 120 ms · **aucune ombre** · focus `outline 2px primary offset 2` (gold-light sur ink) · disabled opacité .45 `cursor-not-allowed` · loading : texte masqué, `Loader2` 20 px, `aria-busy`.

| Variante | Fond | Texte | Bordure | Hover | Active |
|---|---|---|---|---|---|
| **Primary** | primary | white | — | primary-dark | primary-dark + `translateY(1px)` |
| **Primary on Ink** | gold-light | **ink** | — | `#E2C384` | idem |
| **Secondary** | transparent | primary | 1.5 px primary | fond primary-light | + bordure primary-dark |
| **Secondary on Ink** | transparent | white | 1.5 px `white/.4` | bordure white, fond `white/.08` | idem |
| **Tertiary** | linen | text-1 | — | fond border | — |
| **Text** | — | primary | soulignement 1 px offset 4 | primary-dark, soulignement 2 px | — |
| **Icon** | transparent, 44×44 | text-2 | — | fond linen | — |

Hiérarchie : **CTA principal** = Primary (Primary on Ink sur sections ink), libellé unique « Préinscrire mon enfant » / « Pre-register my child », **1 par viewport** hors header. **CTA secondaire** = Secondary « Parler aux admissions » (WhatsApp). **CTA discret** = Text (« Demander les tarifs → »), Tertiary pour actions d'information (appeler, e-mail).
Mapping V1 : `accent` → Primary on Ink · `outline` → Secondary · `outlineWhite` → Secondary on Ink · `ghost` → Text · `ghostWhite` → supprimé.

---

## 11 — Radius / Border / Elevation

| Radius | px | Usage |
|---|---|---|
| `xs` | 4 | Chips, badges, tags, cellules de tableau |
| `sm` | 8 | Boutons, inputs, IconTile, onglets |
| `md` | 12 | Cartes, accordéon, Notice, panneau formulaire |
| `lg` | 16 | Images, MediaPlaceholder, panneau menu mobile |
| `pill` | 9999 | Switch langue, pastille de statut uniquement |

Supprimés : 20, 24, 32.

| Ombre | Valeur | Usage |
|---|---|---|
| none | — | Défaut cartes, boutons |
| `subtle` | `0 1px 2px rgb(8 31 41/.06), 0 1px 3px rgb(8 31 41/.04)` | Header solide, Card/Program hover |
| `medium` | `0 4px 12px rgb(8 31 41/.08), 0 2px 4px rgb(8 31 41/.04)` | Menu mobile, image Editorial Split |
| `strong` | `0 16px 40px rgb(8 31 41/.16)` | Modale, panneau latéral |

Principe : profondeur = fond + bordure. Ombre = l'objet **flotte** (header, menu, modale). Pas d'ombre colorée, pas de `backdrop-blur`. Bordures : 1 px `border` par défaut ; `border-strong` inputs/hover ; `border-inverse` sur ink ; filet gold 1 px = signature (hero, footer, Stat sur ink). Overlay menu : `rgb(8 31 41 / .5)`.

---

## 12 — Iconography

**Lucide conservé** (déjà en place, tree-shakable, stroke paramétrable, cohérent avec Inter).

| Règle | Valeur |
|---|---|
| `strokeWidth` | **1.75** (2 pour ≤ 16 px dans les boutons) |
| Tailles | **16** inline/bouton sm · **20** bouton/liste/nav · **24** feature · **32** placeholder. Rien d'autre. |
| Couleur | `currentColor` ; primary dans IconTile ; gold-light sur ink ; jamais de tuile arc-en-ciel |
| IconTile | 40×40 radius sm ; primary-light/primary ; sur ink : ink-2 + border-inverse / gold-light |
| Spacing | icône↔texte 8 inline, 12 liste ; icône fin de bouton = `ArrowRight` |
| A11y | `aria-hidden` si décorative ; `aria-label` sur bouton icône seul |
| Interdit | Emojis, `public/icons.svg`, icônes remplies, animées, numéro + icône côte à côte |

Vocabulaire fermé : `ArrowRight` (aller) · `ExternalLink` (externe, footer) · `ChevronDown`/`ChevronRight` · `Phone` · `MessageCircle` · `Mail` · `MapPin` · `Clock` · `CalendarDays` · `Languages` · `BookOpen` · `GraduationCap` · `Users` · `ShieldCheck` · `Check` · `FileText` · `Menu` · `X` · `Loader2`. Cible : 57 → **≤ 20 icônes distinctes**.

---

## 13 — Photography & Imagery Direction

Aucune photo aujourd'hui : les placeholders adoptent **dès maintenant** les ratios et emplacements ci-dessous.

| Dimension | Direction |
|---|---|
| Type | Classe en activité, enseignant penché sur un cahier, cour et portail/guérite, cantine, tableau écrit en deux langues, mains qui écrivent, uniforme du vendredi |
| Cadrage | Plans moyens/serrés ; regards **dans l'action**, jamais vers l'objectif ; air laissé côté texte |
| Lumière | Naturelle, matin / fin d'après-midi, sans flash |
| Profondeur de champ | Moyenne (f/2.8–4) : sujet net, école reconnaissable |
| Expressions | Concentration, échange, jeu — pas de sourire posé |
| Présence humaine | ≥ 1 personne sauf architecture ; diversité réelle des élèves et de l'équipe ; autorisations parentales documentées |
| Architecture | Portail, guérite, cour, salles : montrées telles quelles, propres, en lumière |
| Traitement | Chaud, −10 % saturation, noirs relevés vers l'ink ; pas de filtre orange/teal marqué |
| Ratios | Hero 4:5 mobile / 3:2 desktop · Split 4:5 · Program 3:2 · bandeau Vie scolaire 16:9 · portrait 1:1 |
| Crops | `object-position` défini par image ; le crop mobile recadre sur visage/mains |
| UI | Radius lg, sans bordure, ombre medium seulement en Split ; texte sur photo interdit sauf hero (voile ink 60 %) |
| Placeholder | `MediaPlaceholder` unique : fond linen, bordure border, icône 32 text-3, caption « Photo de l'école — à venir » |
| Interdit | Stock générique, image IA présentée comme l'école, enfant isolé identifiable sans consentement |

Hero : typographique tant qu'il n'y a pas de photo ; la colonne droite (bloc faits) **est** l'emplacement de la future photo 4:5.

---

## 14 — Motion System

| Token | Valeur | Usage |
|---|---|---|
| `fast` | 120 ms | Couleur/opacité hover |
| `base` | 200 ms | Bordure, transform hover |
| `reveal` | 400 ms | Apparition au scroll |
| `panel` | 280 ms | Menu mobile, accordéon, onglets |
| `ease-out` | `cubic-bezier(.2,.8,.2,1)` | Entrées |
| `ease-in-out` | `cubic-bezier(.4,0,.2,1)` | Accordéon, onglets |
| Stagger | 60 ms, **max 4 items** | Grilles |

- **Reveal** : une fois, seuil 15 %, `opacity 0→1` + `y 12→0` ; **CSS + IntersectionObserver** (`useScrollReveal` existant) — Framer retiré des reveals.
- **Hover** : cartes cliquables `translateY(-2)` ; boutons couleur seule ; liens soulignement.
- **Images** : aucune animation.
- **Page transition** : fade 200 ms conservé.
- **Framer Motion reste pour** : accordéon (height auto), menu mobile, tabs, page fade. `<MotionConfig reducedMotion="user">` à la racine + bloc CSS reduced-motion existant (reveals → opacité seule).
- **Interdits** : `repeat: Infinity`, parallaxe, blur animé, scale > 1.02, pulsations, compteurs sur non-nombres, durées > 400 ms hors panneaux, mouvement sans déclencheur utilisateur/viewport.

---

## 15 — Responsive Rules

| Largeur | Règles spécifiques |
|---|---|
| **320** | H1 34 px ; CTA 52 px pleine largeur empilés ; 1 col partout ; tableau → `<dl>` ; footer accordéon ; barre CTA fixe 56 px |
| **375 / 390 / 414** | H1 38 ; faits 2×2 ; installations 1 col ; menu plein écran, liens 52 px |
| **480** | CTA côte à côte ; grilles 2 col ; marge 20 |
| **768** | 8 col ; splits 4/4 ; cartes 2/ligne ; nav encore mobile (panneau 400 px) ; hero empilé, faits en 4 col |
| **1024** | Nav desktop 5 liens (tient en 1 ligne) ; splits 5/7 ; hero 6/6 ; container fluide |
| **1280** | Layout cible ; marges 80 ; gutters 24 |
| **1440** | Cadre de référence ; contenu 1280 |
| **≥ 1600** | Container fixe ; hero ≤ 820 px ; typographie plafonnée |

Par famille : **typo** mobile = table §05 colonne Mobile, corps 16 · **sections** 64 px · **nav** hamburger < 1024, focus trap, langue 44 px · **cartes** 1 col, padding 20, sans hover · **boutons** ≥ 52 px, pleine largeur ≤ 480 · **grilles** 4 col · **images** `srcset/sizes`, crop focal · **CTA** barre fixe Primary + icône WhatsApp · **footer** marque → contact → liens 2 col → bandeau · **tables** liste définie < 480 · **forms** 1 col < 640, inputs 16 px 48 px.

---

## 16 — Accessibility

- **Contraste** : uniquement les paires §04 ; texte ≥ 4.5, UI ≥ 3.
- **Focus** : `:focus-visible { outline: 2px solid primary; outline-offset: 2px }` global ; gold-light sur ink ; jamais `outline: none` seul.
- **Clavier** : ordre DOM = visuel ; menu mobile focus trap + retour focus ; Tabs flèches ← → + `aria-controls` ; Accordion `aria-expanded` + `aria-controls` ; Escape ferme.
- **Cibles** : 44×44 minimum (switch langue, liens footer, onglets, icônes).
- **Texte** : plancher 13, corps 16 mobile ; zoom 200 % sans perte.
- **Reduced motion** : §14.
- **Sémantique** : 1 `h1` ; chaque `section` un `h2` (visible ou `sr-only`) ; `nav` labellisées ; `main` unique ; `lang` sur EN/FR + `aria-pressed`.
- **Formulaires** : `label` liés, `autocomplete`, `aria-invalid`, `aria-describedby` → erreur ; erreur = Notice error + icône + texte (jamais couleur seule) ; succès = Notice success.
- **Images** : `alt` descriptif ; placeholders `alt=""`.

---

## 17 — Content Design

| Élément | Règle |
|---|---|
| H1 | ≤ 60 caractères, factuel, contient « bilingue » — *proposition* : « Une école maternelle et primaire bilingue, à Ouêdo. » ; la tagline devient l'eyebrow doré (signature) |
| H2 | ≤ 45 caractères, 1 idée, promesse concrète ; bannis : « Unlock », « Shape the future », « Where dreams… » |
| H3/H4 | ≤ 5 mots |
| Eyebrow | 1–3 mots, nom de rubrique |
| Lead | 1 phrase ≤ 160 caractères, un fait |
| Paragraphe | ≤ 65 mots ; 2 max par bloc |
| Carte | Titre ≤ 5 mots, corps ≤ 30 mots |
| CTA | Principal unique « Préinscrire mon enfant » ; secondaire unique « Parler aux admissions » ; discret « Demander les tarifs → » |
| Labels/statuts | Vocabulaire fermé : Disponible / En cours / À confirmer |
| Microcopy | Vouvoiement ; « votre enfant » côté parents, « les élèves » côté école ; « apprenants » retiré |
| Chiffres | Réels uniquement ; `50 % · 50 %`, `8h00–16h00`, `2026–2027` ; stat = nombre, sinon liste de faits |
| Institutionnel | Une Notice de transparence par sujet, une fois (frais → Admission ; agréments → L'école ; photos → placeholder) ; fin des sous-titres « informations communiquées par l'école » |

---

## 18 — Navigation System

| Élément | Spécification |
|---|---|
| Hauteur | **72 px** desktop · **60 px** mobile ; `scroll-margin-top` ajusté |
| Logo | Monogramme « J » 36 px (ink sur gold-light en transparent ; primary sur white en solide) + « Jules & Véronique » Playfair 600 18 px ; **un seul rendu** nav/footer |
| Menu | 5 liens : L'école · Programmes · Vie scolaire · Admission · Contact — Inter 500 15, cible 44, hover soulignement 2 px, actif filet gold |
| CTA | Primary sm « Préinscrire mon enfant » (Primary on Ink en état transparent) |
| Langue | Segmented EN/FR radius pill, 44×32 min, `aria-pressed`, `lang` |
| Retirés de la barre | Téléphone, WhatsApp (→ barre mobile, Contact, footer) |
| Transparent | Sur hero ink uniquement : fond transparent, texte white, filet bas `border-inverse` |
| Solide | Après 24 px de scroll ou hors home : fond white, `shadow-subtle`, filet `border`, texte text-1 |
| Transition | 200 ms couleur/fond ; pas de slide d'entrée |
| Mobile | Logo · switch · Icon button hamburger 44 (sans fond plein) ; panneau plein écran (≤ 480) / 400 px (≥ 480) depuis la droite 280 ms, liens 17 px × 52 px, CTA Primary en bas, contacts Tertiary, focus trap, Escape, scroll-lock existant |
| Barre CTA mobile | Conservée : Primary md flex-1 + Icon WhatsApp 44 ; 56 px + safe-area ; logique anti-flicker conservée |

---

## 19 — Footer System

| Élément | Spécification |
|---|---|
| Fond | ink ; filet gold 1 px pleine largeur en haut (signature) |
| Padding | 64 / 80 / 96 ; bandeau bas 24 |
| Desktop 12 col | **4 col** marque : monogramme + nom Playfair + description Body Small inverse-2 (≤ 40 mots) + Secondary on Ink « Préinscrire mon enfant » · **2 col** « L'école » (Présentation, Programmes, Vie scolaire, FAQ) · **2 col** « Admission » (Comment s'inscrire, Frais, Contact) · **4 col** « Contact » (Phone / MessageCircle / Mail / MapPin / Clock, 16 px, texte 15 inverse-2, cibles 44) |
| Réseaux | Rendus **uniquement** si URL présente ; `Facebook`/`Instagram` Lucide, Icon button 44 |
| Bandeau | Copyright caption inverse-3 (5.7:1) · Confidentialité · Conditions (masqués tant que `#`) · switch langue |
| Mobile | Marque → Contact → liens en 2 col → bandeau ; **un seul JSX** |
| Contraste | Titres de colonne eyebrow gold-light ; liens inverse-2 → white hover ; rien sous 5:1 |

---

## 20 — Design Tokens

Fichier cible `src/styles/tokens.css`, importé en tête de `src/index.css` (Tailwind 4 `@theme`). Les palettes V1 sont **réinitialisées** pour empêcher toute fuite.

```css
@theme {
  /* reset V1 */
  --color-primary-*: initial; --color-accent-*: initial; --color-neutral-*: initial;
  --color-emerald-*: initial; --color-amber-*: initial; --color-rose-*: initial;
  --color-violet-*: initial; --color-red-*: initial; --color-blue-*: initial;
  --radius-*: initial; --shadow-*: initial;

  /* color.brand */
  --color-primary: #0F4C5C; --color-primary-dark: #0A3542; --color-primary-light: #E3EFF2;
  --color-ink: #081F29; --color-ink-2: #0C2A36;
  --color-gold: #B8862E; --color-gold-light: #D9B36A; --color-gold-deep: #7F5B1C;
  /* color.neutral */
  --color-paper: #FAF9F6; --color-linen: #F2F0EA; --color-white: #FFFFFF;
  --color-border: #E2DED5; --color-border-strong: #B9B2A4; --color-border-inverse: rgb(255 255 255 / .14);
  --color-text-1: #111C24; --color-text-2: #44515B; --color-text-3: #5A666F;
  --color-text-inverse: #FFFFFF; --color-text-inverse-2: #BFC5C7; --color-text-inverse-3: #97A1A5;
  /* color.semantic */
  --color-success: #1F7A4D; --color-success-bg: #E6F2EC;
  --color-warning: #7A520C; --color-warning-bg: #FBF3E1;
  --color-error: #B42318;   --color-error-bg: #FBEAE8;
  --color-info: #0F4C5C;    --color-info-bg: #E3EFF2;

  /* type */
  --font-display: "Playfair Display", "Iowan Old Style", Georgia, serif;
  --font-body: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  --text-display: clamp(2.375rem, 1.5rem + 3.7vw, 4rem); --text-display--line-height: 1.08; --text-display--letter-spacing: -0.015em;
  --text-h1: clamp(2rem, 1.4rem + 2.5vw, 3rem);          --text-h1--line-height: 1.12; --text-h1--letter-spacing: -0.01em;
  --text-h2: clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem);    --text-h2--line-height: 1.15; --text-h2--letter-spacing: -0.01em;
  --text-h3: clamp(1.375rem, 1.2rem + .75vw, 1.75rem);   --text-h3--line-height: 1.25;
  --text-h4: 1.25rem;                                    --text-h4--line-height: 1.35;
  --text-lead: clamp(1.0625rem, 1rem + .3vw, 1.25rem);   --text-lead--line-height: 1.6;
  --text-body: clamp(1rem, .97rem + .15vw, 1.0625rem);   --text-body--line-height: 1.65;
  --text-body-sm: .9375rem;  --text-body-sm--line-height: 1.6;
  --text-caption: .8125rem;  --text-caption--line-height: 1.5;
  --text-eyebrow: .8125rem;  --text-eyebrow--line-height: 1.2; --text-eyebrow--letter-spacing: .08em;
  --text-stat: clamp(2.5rem, 1.8rem + 2.9vw, 3.5rem);    --text-stat--line-height: 1; --text-stat--letter-spacing: -0.02em;
  --text-quote: clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem);  --text-quote--line-height: 1.3;

  /* spacing (complète l'échelle Tailwind) */
  --spacing-section: clamp(4rem, 3rem + 4vw, 6rem);
  --spacing-section-compact: clamp(2.5rem, 2rem + 2vw, 4rem);
  --spacing-section-air: clamp(5rem, 3.5rem + 5vw, 8rem);
  --spacing-section-head: clamp(2.5rem, 2rem + 2vw, 4rem);

  /* radius */
  --radius-xs: 4px; --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px; --radius-pill: 9999px;

  /* shadow */
  --shadow-subtle: 0 1px 2px rgb(8 31 41 / .06), 0 1px 3px rgb(8 31 41 / .04);
  --shadow-medium: 0 4px 12px rgb(8 31 41 / .08), 0 2px 4px rgb(8 31 41 / .04);
  --shadow-strong: 0 16px 40px rgb(8 31 41 / .16);

  /* container */
  --container-page: 80rem; --container-prose: 52.5rem; --container-narrow: 38.75rem;

  /* motion */
  --ease-out: cubic-bezier(.2,.8,.2,1); --ease-in-out: cubic-bezier(.4,0,.2,1);
  --duration-fast: 120ms; --duration-base: 200ms; --duration-reveal: 400ms; --duration-panel: 280ms;
}
/* breakpoint.* : xs 480 (custom-variant existant) · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 */
/* grid (:root, conservé) : --grid-columns 4/8/12 · --grid-margin 16 / 32→80 / 80 · --grid-gutter 16 / 20 / 24 */
```

---

## 21 — Component Inventory

Tout vit dans `src/components/ui` (extension, pas dossier parallèle). ✱ = nouveau · ↻ = refonte · ✓ = conservé.

| Catégorie | Composant | Statut | Rôle |
|---|---|---|---|
| FOUNDATION | `Container` | ✱ | `page · prose · narrow` |
| | `Section` | ✱ | `tone paper·linen·ink` × `density standard·compact·air` ; gère id, padding, filet d'adjacence |
| | `SectionHeading` | ↻ | Eyebrow texte + filet, H2, lead ; `align left·center` |
| | `Eyebrow` | ✱ | Label uppercase 13 + filet 24 px |
| | `Divider` | ✱ | `border · inverse · gold` |
| | `MediaPlaceholder` | ✱ | Ratio + caption standard |
| NAVIGATION | `Navbar` | ↻ | Structure/logique scroll conservées |
| | `MobileMenu` | ✱ (extrait) | Focus trap, retour focus |
| | `MobileCtaBar` | ✱ (extrait) | Primary + Icon WhatsApp |
| | `LanguageSwitcher` | ↻ | 44 px, `aria-pressed`, `lang` |
| ACTIONS | `Button` | ↻ | 7 variantes + loading ; couvre Link (`to`/`href`) et Icon (`variant="icon"`) |
| CONTENT | `Card` | ✱ | `default · program · stat · notice` + `Card.Icon/Title/Body/Meta` |
| | `Notice` | ✱ | `info · warning · success · error` |
| | `Badge` | ↻ | `available · planned · info`, radius xs, 13 px |
| | `Stat` | ✱ | Nombre + caption sur filet |
| | `IconTile` | ✱ | 40×40 |
| | `Quote` | ✱ | Citation Playfair italic + filet gold |
| | `Tabs` | ✱ | tablist/tab/tabpanel accessible |
| | `Accordion` | ↻ | Re-skin + `aria-controls` |
| | `Table` | ✱ | Horaire ; `<dl>` < 480 |
| FORMS | `FormField` | ↻ | + `autocomplete`, `aria-invalid`, Notice error |
| | `Stepper` | ↻ | Tokens |
| FEEDBACK | `Notice` (= Alert/Error/Success) | ✱ | Voir CONTENT |
| | Loading | — | État `loading` de `Button` ; pas de composant dédié |
| MOTION | `Reveal` | ✱ | CSS + `useScrollReveal` ; remplace `ScrollReveal` |

Non créés volontairement : `Stack`, `Text`, `Heading` génériques (Tailwind suffit) ; `Testimonial` (aucune donnée) ; `Select`/`FileUpload` séparés (FormField couvre) ; `AnimatedCounter` supprimé.

---

## 22 — Composition Rules

1. **3 tons de section** max (paper, linen, ink) ; **10 types** de section (§08).
2. **Max 2 sections ink** sur la home (Hero, Bilinguisme) + CTA final + footer ; jamais 2 ink adjacentes sauf CTA→footer (séparées par filet gold).
3. **4 niveaux de titre** visibles par page.
4. **Max 3 grilles de cartes** par page ; le reste en compositions éditoriales.
5. **1 Primary CTA par viewport** hors header/barre mobile.
6. **3 couleurs vives max par écran** : primary + gold + 1 sémantique.
7. **Doré ≤ 5 %** de la surface d'une section ; jamais sous du texte blanc.
8. **1 idée par section** ; 2 en-têtes internes = 2 sections ou 2 colonnes.
9. **Whitespace** : ≥ 64 px desktop entre blocs de nature différente ; ≥ 40 px mobile.
10. **Densité** : ≤ 6 blocs visuels par section desktop.
11. **Placeholders/transparence** : un composant, une occurrence par sujet.
12. Toute nouvelle valeur passe d'abord par `tokens.css`.

---

## 23 — EBJV Art Direction Principles

1. **La clarté avant la décoration.** Pas d'information ou d'action → pas d'élément.
2. **La typographie porte la hiérarchie.** Aucune tuile, pilule ou couleur pour compenser un titre faible.
3. **Le blanc est structurel.** L'espace est une décision de grille, pas un reste.
4. **Chaque couleur a un rôle.** 3 fonds, 1 voix, 1 médaille, 4 statuts. Rien d'autre.
5. **Une carte est une unité, pas un cadre.** Ce qui n'est pas comparable ne se met pas en carte.
6. **Le doré ne se lit jamais en blanc.** Sur fond doré, le texte est ink.
7. **Le sombre est un moment, pas une ambiance.** Deux temps forts, un final.
8. **Le mouvement explique, il ne décore pas.** Rien ne bouge sans déclencheur ; rien ne boucle.
9. **Le mobile est dessiné, pas compressé.** Chaque section a sa composition mobile.
10. **La vérité avant le remplissage.** Placeholder honnête > stock ; donnée absente ≠ donnée inventée.
11. **Un seul appel principal.** Même libellé, même couleur, partout.
12. **Tout tombe sur la grille.** Ctrl+G avant de livrer.

---

## 24 — Section-by-Section Blueprint

Home V2 : **17 → 11 sections**. Ordre et fonds : `Hero ink · L'école paper · Engagements paper(filet) · Programmes linen · Bilinguisme ink · Vie scolaire paper · Admission linen · FAQ paper · Contact paper(filet) · CTA ink · Footer ink`.

| # | Section (type §08) | Objectif · rôle | Fond / layout | Typo · hiérarchie | CTA | Imagerie | Composants | Amélioration clé | Retirer | Préserver |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | **Navbar** | Orienter, agir, changer de langue | transparent→white | Nav 15 / logo Playfair 18 | Primary sm | Monogramme | Navbar, MobileMenu, LanguageSwitcher | 5 liens, cibles 44, hamburger icon | Tél, WhatsApp, fond plein hamburger | Logique scroll, scroll-lock, barre mobile |
| 1 | **Hero** (S1) | « Quelle école, où, pour qui, que faire » en 3 s · ouverture | ink uni, split 6/6, `min(88dvh,820px)` | Eyebrow gold-light (tagline) > Display 2 lignes descriptif > Lead > CTA > bloc faits | Primary on Ink + Secondary on Ink | Aucune ; bloc faits ink-2 = futur emplacement photo 4:5 | Button, Stat-list, Divider gold | 9 → 6 éléments ; H1 descriptif | Blobs, trame, gradient, fondu, flèche animée, badge lieu, trust items, lien « découvrir » | Textes FR/EN, `school.js` |
| 2 | **L'école** (S2) ← Intro + Statistics | Identité, mission, faits · compréhension | paper, 5/7 | Eyebrow > H2 > 2 ¶ Body > 4 faits H4/caption sur filets > méta | — | MediaPlaceholder 4:5 sobre | SectionHeading, MediaPlaceholder, Stat, Badge warning (agréments) | Fusion des 2 sections ; faits non numériques en liste, pas en « stats » | Section Statistics, carrés décoratifs, icônes devant chaque fait | Mission, patronage Saint Augustin, adresse |
| 3 | **Nos engagements** (S3) ← WhyChoose + Team | Ce que l'école promet · confiance | paper + filet haut, 8 col + liste 2 col | H2 > 01–05 numéros Playfair gold-deep + H4 + Body Small ; puis H3 + 3 Card/Default | — | — | Eyebrow, Divider, Card/Default, IconTile | 8 cartes → liste éditoriale + 3 cartes | Tuiles colorées, chips FR/EN/50 %, sous-titre méta | 5 engagements, 3 items encadrement, mention agréments |
| 4 | **Programmes** (S5) | L'offre par niveau · exploration | linen, Tabs + Card/Program 4/8 | H2 > H3 programme > Body > méta > chips > Text link | Text « Demander des informations → » | MediaPlaceholder 3:2 | Tabs, Card/Program, Badge, Notice info | Mobile empilé ; 1 Notice examens ; fin de la couleur par programme | « Âges à confirmer » dans onglets, note secondaire ×2, pilules | Données `programs.js`, ordre |
| 5 | **Le bilinguisme au quotidien** (S6) | La promesse cœur · second temps fort | ink, 8 col + tableau 2 col + 2×2 | H2 white > Quote italic filet gold > Lead inverse-2 > tableau ink-2 > 4 H4 | — | — | Quote, Table, IconTile inverse, Divider | 1 889 → ≤ 1 200 px ; 1 couleur d'accent dans le tableau | Fenêtre macOS, pulsation, cartes verre, 2ᵉ en-tête | Citation 50/50, horaires `schedule.js`, 4 bénéfices |
| 6 | **Vie scolaire & cadre** (S2+S4) ← StudentLife + Facilities | Projection · respiration | paper ; bandeau 16:9 + 2 col listes + grille 3 col | H2 > H4 cycles + listes > H3 Installations > 6 Card/Default | — | MediaPlaceholder 16:9 | Card/Default, Badge success/warning | 10 → 6 cartes ; statut = badge, pas couleur de carte | Cartes de listes, carte « photos à venir », fond ambre | Activités par cycle, 7 installations (fusion doublon sécurité) |
| 7 | **Admission** (S7) ← Methodology + RegistrationProcess + Pricing | Passage à l'action · décision | linen, 7/5 sticky | H2 > 01–06 H4 + filet vertical > panneau : H4 pièces, Notice warning frais, Notice info cantine/transport | **Primary** + Text « Demander les tarifs » | — | Card/Default (1), Notice, Button | 3 sections → 1 ; parcours raconté une fois | Carré gradient + bulles, 6 cartes étapes, 9 blocs tarifs | 6 étapes, pièces à fournir, paiement banque, cantine/transport, ancres `#pricing` `#registration-process` |
| 8 | **Questions fréquentes** (S8) ← FAQ + DigitalVision | Réassurance | paper, narrow | H2 > questions 17/600 > Body | — | — | Accordion | + 1 entrée « espace parents / paiement en ligne » | Section DigitalVision, bloc contact imbriqué | `faq.js` |
| 9 | **Contact** (S9) ← ContactStrip + bloc FAQ | Parler avant de décider · ancre `#contact` | paper + filet, 3 col compact | H4 numéro tabular > caption | Tertiary ×3 | — | IconTile, Button tertiary | Section propre ; boutons uniformes | Vert WhatsApp, 3 styles de bouton | Numéros, horaires, adresse |
| 10 | **CTA final** (S10) | Décision | ink uni, prose, air | Eyebrow gold-light > H2 centré 2 lignes > Lead | Primary on Ink + Secondary on Ink | — | Button | 3 → 2 CTA ; ink uni | Gradient, blobs, ligne contact 30 % | Textes |
| 11 | **Footer** | Conclusion de marque | ink + filet gold | Eyebrow gold-light colonnes > liens 15 | Secondary on Ink | Monogramme | — | 1 JSX ; contrastes | Icônes sociales fausses, liens `#`, copyright 20 % | Structure 4 colonnes, contacts |
| 12 | **Pré-inscription** (Page Header + Form Panel) | Conserver le parcours, re-skin | paper, narrow | H1 > H3 étape | Primary / Text | — | Stepper, FormField, Notice, Card/Default | Inputs 48, erreurs Notice, `autocomplete` | `text-blue-600`, vert émeraude étapes | Logique complète, 6 étapes, WhatsApp pré-rempli |
| — | **Témoignages** | — | — | — | — | — | — | **Hors home tant que < 2 témoignages validés** ; composant conservé | — | `testimonials.js` |

---

## 25 — P0/P1/P2/P3 Priorities

| | Visual | UX | Accessibility | Component / System | Content | Responsive |
|---|---|---|---|---|---|---|
| **P0** | CTA doré texte blanc ; textes à opacité < 4.5:1 | ✅ Scroll (corrigé `0b4e358`) | 8 paires de contraste ; focus visible global | `tokens.css` + reset palettes V1 | — | — |
| **P1** | Retrait blobs/gradients/verre/macOS/boucles ; radius & ombres tokenisés ; 45 → ≤ 18 cartes ; 56 couleurs hors palette → 0 ; 13 opacités → 0 | 17 → 11 sections ; hero 6 éléments ; CTA unique ; contacts 7 → 3 occurrences | Cibles 44 ; focus trap menu ; `MotionConfig` ; `aria-pressed`/`lang` langue | Section, Container, Card, Notice, Button V2, Tabs, Reveal CSS, MediaPlaceholder | H1 descriptif ; libellé CTA unique ; « apprenants » retiré ; sous-titres factuels | Corps 16 mobile ; plancher 13 ; programmes empilés ; hero ≤ 88dvh |
| **P2** | Filet doré signature ; numérotation éditoriale ; tableau horaire | Section Contact propre ; footer 1 JSX ; ancres | `autocomplete`, `aria-invalid`, `aria-controls`, `aria-hidden` icônes | IconTile, Divider, Quote, Table ; code-split `/registration` ; polices 21 → 5 ; `og:image` | Entrée FAQ « projet numérique » ; statuts vocabulaire fermé | Tableau → `<dl>` < 480 ; footer accordéon ; nav 1024 |
| **P3** | Hover cartes | — | — | Code mort supprimé ; scripts QA versionnés ; Lighthouse | — | Ajustements ≥ 1600 |

---

## 26 — Implementation Roadmap

Chaque phase = un commit vérifié : captures 375 / 768 / 1440 · script overflow · script scroll · contraste des nouvelles paires · `npm run build` · `npm run lint`.

| Phase | Périmètre | Dépendances |
|---|---|---|
| **2.1 Global foundation** | `src/styles/tokens.css` ; `index.css` (base, `:focus-visible`, `.reveal`, grille 80/24, typographies utilitaires) ; `index.html` (5 fichiers de polices, preload, `og:image`) ; `MotionConfig` ; `Button` V2 avec mapping des anciennes variantes ; `Section`, `Container`, `Eyebrow`, `SectionHeading` V2, `Card`, `Notice`, `Badge` V2, `IconTile`, `Stat`, `Divider`, `MediaPlaceholder`, `Quote`, `Reveal`. **Le site reste visuellement fonctionnel** (compat temporaire des classes V1). | — |
| **2.2 Navbar + Hero** | Navbar V2, `MobileMenu` (focus trap), `MobileCtaBar`, `LanguageSwitcher` 44 ; Hero S1 ; textes H1/eyebrow FR-EN (validés) | 2.1 |
| **2.3 L'école** | Fusion Introduction + Statistics (S2) ; retrait `Statistics` de `HomePage` | 2.1 |
| **2.4 Programmes** | `Tabs`, Card/Program, empilement mobile, Notice examens (S5) | 2.1 |
| **2.5 Nos engagements** | Fusion WhyChoose + TeamProfile (S3) | 2.1 |
| **2.6 Bilinguisme** | S6 : Quote, `Table`, bénéfices | 2.1 |
| **2.7 Vie scolaire & cadre** | Fusion StudentLife + Facilities | 2.1 |
| **2.8 Admission** | Fusion Methodology + RegistrationProcess + Pricing (S7) ; ancres conservées | 2.1 |
| **2.9 FAQ + Contact** | Accordion V2 + entrée numérique ; section Contact (S9) ; retrait DigitalVision / ContactStrip / Testimonials de `HomePage` | 2.1 |
| **2.10 CTA final + Footer** | S10 ; Footer 1 JSX | 2.1, 2.2 (logo commun) |
| **2.11 Pré-inscription** | FormField, Stepper, RegistrationPage re-skin ; code-split route | 2.1 |
| **2.12 QA & clôture** | 10 largeurs · scroll 4 modes · clavier · reduced-motion · FR/EN · Lighthouse ; suppression compat V1 et code mort ; scripts `scripts/qa/` finalisés | tout |

Justification de l'ordre : 2.1 crée tout ce dont les sections dépendent ; 2.2 fixe la première impression et l'état transparent/solide dont dépend la hauteur du hero ; 2.3→2.9 suivent l'ordre de lecture et sont indépendantes entre elles ; 2.10 dépend du logo unifié ; 2.11 ne dépend que de 2.1 ; la compat V1 n'est retirée qu'à la fin pour ne jamais casser le site entre deux commits.

---

## 27 — Definition of Done

- [ ] `grep` = 0 dans `src/` pour : `emerald|amber|rose|violet|red|blue-`, `text-white/`, `text-[1?px]`, `text-xs`, `rounded-(xl|2xl|3xl)`, `blur-3xl`, `backdrop-blur`, `bg-gradient`, `repeat: Infinity`.
- [ ] Aucune couleur, radius, ombre, durée hors `tokens.css`.
- [ ] Home = 11 sections ; hauteur ≤ 12 000 px @1440, ≤ 15 000 px @375 ; ≤ 18 cartes ; ≤ 20 icônes distinctes.
- [ ] 100 % des paires texte/fond ≥ 4.5:1 ; UI ≥ 3:1 (script).
- [ ] 100 % des interactifs ≥ 44×44 (script).
- [ ] 0 texte < 13 px ; corps ≥ 16 px mobile (script).
- [ ] 0 overflow horizontal 320→1600 (script).
- [ ] Scroll molette / touch / clavier OK sur `/` et `/registration`, après menu et retour arrière (script).
- [ ] Reduced-motion : aucun `transform` animé ; Framer sous `MotionConfig`.
- [ ] FR/EN : 0 clé manquante ; sens identique H1/CTA.
- [ ] 1 `h1` ; chaque section un `h2` ; focus trap menu ; Tabs/Accordion ARIA complets.
- [ ] Polices ≤ 5 fichiers ; bundle initial < 300 kB gz.
- [ ] `npm run build` + `npm run lint` verts ; Ctrl+G : tout aligné.

---

# DESIGN FREEZE V2

Décisions **verrouillées** avant la Phase 2. Toute dérogation passe par une révision explicite de ce document.

1. **Palette** : 8 brand + 12 neutres + 4 sémantiques (§04). Aucune opacité textuelle. Le doré n'est jamais un fond sous du texte blanc ; sur ink, le CTA est gold-light / texte ink.
2. **Typographie** : Playfair 600/700 (+ 600 italic) + Inter 400/500/600 ; échelle §05 ; **plancher 13 px, corps mobile 16 px** ; H2 ≤ 2 lignes.
3. **Espacement** : échelle 8-pt §06 ; sections 64 / 80 / 96 ; compact 40–64 ; air 80–128.
4. **Grille** : 4 / 8 / 12 ; container 1280 ; marges 16 / 32→80 / 80 ; gutters 16 / 20 / 24 ; containers `page · prose · narrow`.
5. **Radius** 4 / 8 / 12 / 16 / pill. **Ombres** subtle / medium / strong, jamais sur cartes ni boutons au repos. Profondeur par fond + bordure.
6. **Icônes** : Lucide, stroke 1.75, tailles 16 / 20 / 24 / 32, vocabulaire fermé §12, ≤ 20 icônes.
7. **Boutons** : 7 variantes §10 ; 1 Primary par viewport ; libellés uniques « Préinscrire mon enfant » / « Parler aux admissions ».
8. **Cartes** : 4 variantes §09 ; règle d'existence ; ≤ 18 sur la home.
9. **Sections** : 10 types §08 ; 3 tons ; alternance et ordre de la home §24 ; **11 sections**.
10. **Motion** : 120 / 200 / 400 / 280 ms ; reveal CSS une fois ; aucune boucle ; `MotionConfig reducedMotion="user"`.
11. **Hero** : typographique sur ink uni, 6 éléments, H1 descriptif (texte final à valider par l'école), `min(88dvh, 820px)`, filet vertical doré signature.
12. **Retraits de la home** : Statistics (doublon), Testimonials (vide), DigitalVision (→ FAQ), ContactStrip (→ Contact), Pricing (→ Admission). Composants conservés dans le code.
13. **Vocabulaire banni** : blobs, gradients décoratifs, verre, fenêtre macOS, trames, pulsations, tuiles colorées, couleur par programme, couleur de marque tierce (vert WhatsApp).
14. **Imagerie** : `MediaPlaceholder` unique ; ratios §13 ; aucune photo stock ni IA présentée comme l'école.
15. **Contenu** : rien d'inventé ; une Notice de transparence par sujet ; « apprenants » retiré ; sous-titres factuels.
16. **Architecture** : React / Vite / Tailwind 4 / react-router, `LanguageContext`, `src/data`, routes, formulaire de pré-inscription — **inchangés**. Nouveaux composants dans `src/components/ui`.
17. **Ordre d'implémentation** : 2.1 → 2.12 (§26), une phase par commit vérifié, compat V1 retirée uniquement en 2.12.

> **Validation attendue avant 2.2** : (a) H1 descriptif + tagline en eyebrow ; (b) retrait de Témoignages de la home tant que vide ; (c) retrait tél/WhatsApp de la barre desktop ; (d) libellé CTA unique ; (e) plan de fusion des sections §24.
