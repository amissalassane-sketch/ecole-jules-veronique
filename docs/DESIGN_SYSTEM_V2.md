# EBJV — DESIGN SYSTEM V2

> Référence unique pour toute implémentation à partir de la Phase 4.
> Aucune section ne doit introduire une couleur, une taille, un radius, une ombre ou une durée qui n'existe pas ici.
> Stack cible : Tailwind 4 (`@theme`) + variables CSS. Les tokens ci-dessous sont **une proposition à valider** ; ils seront écrits dans `src/styles/tokens.css` et importés depuis `src/index.css` en Phase 2 (implémentation), pas avant.

---

## 1. BRAND STRATEGY

### Positionnement visuel
« **Une école sérieuse, ambitieuse, humaine, moderne et exigeante** » — à Ouêdo, bilingue français/anglais, de la crèche au CM2, sous le patronage de Saint Augustin.

Le site doit ressembler à ce qu'un parent attend d'une bonne école : **ordre, clarté, chaleur, ambition**. Pas à ce qu'un investisseur attend d'une startup.

### Personnalité (7 traits demandés → traduction graphique)

| Trait | Traduction visuelle | Anti-pattern |
|---|---|---|
| Human | Photos réelles de vie scolaire (dès réception), corps de texte généreux, ton parental | Illustrations 3D, avatars, icônes colorées façon app store |
| Academic | Serif éditorial (Playfair) pour les titres, numérotation, grilles strictes, filets | Effets de verre, néons, blobs |
| Modern | Sans-serif sobre (Inter), beaucoup d'air, asymétrie contrôlée, motion courte | Skeuomorphisme, ombres portées lourdes |
| Trustworthy | Palette réduite, contrastes AA, informations sourcées, placeholders honnêtes | Chiffres inventés, superlatifs |
| Precise | Échelle d'espacement 8 pt, alignement colonne, tailles typographiques fixes | Espacements « à l'œil », tailles arbitraires |
| Warm | Fond papier chaud (`#FAF9F6`), doré en filet, photos en lumière naturelle | Blanc pur clinique, gris bleutés froids |
| Ambitious | Grands titres, grands chiffres quand ils existent, fonds encre profonds | Titres timides, mise en page de brochure |

### Niveau de formalité
**Formel-chaleureux.** Vouvoiement, phrases courtes, pas de jargon (« apprenants » → « élèves » / « enfants » selon le contexte). Ton d'une directrice qui reçoit des parents, pas d'un service marketing.

### Autorisé / Interdit

| ✅ Autorisé | ❌ Interdit |
|---|---|
| 2 fonds clairs + 1 fond sombre | Plus de 3 fonds |
| Filets 1 px, bordures subtiles | Ombres colorées, glow |
| Doré en filet, eyebrow, icône, numéro | Doré en fond de bouton avec texte blanc |
| Cartes quand le contenu est **une unité indépendante et comparable** | Cartes pour encadrer une liste, une note, un titre |
| Reveal d'entrée court (≤ 400 ms), une fois | Animations infinies, parallaxe, pulsation |
| Photo réelle ou placeholder labellisé | Photo stock « famille qui sourit à la caméra », image IA présentée comme réelle |
| Lucide, stroke 1.75, une taille par contexte | Emojis, mélange de bibliothèques, icônes remplies |

---

## 2. COLOR SYSTEM

### 2.1 Audit → décision

| Existant | Décision |
|---|---|
| `primary-500…950` teal (11 nuances) | **Garder la teinte**, réduire à 4 rôles : primary / primary-dark / primary-light / ink |
| `accent-50…950` doré (11 nuances) | Réduire à 3 : gold / gold-light (sur fond sombre) / gold-deep (texte sur fond clair) |
| `neutral-*` gris neutre Tailwind | **Remplacer** par des gris **chauds** légèrement teintés encre → cohérents avec le papier |
| `surface #FAFAF8`, `surface-alt #F5F4F0` | Garder l'intention, recaler : paper / linen |
| `emerald/amber/rose/violet/red/blue` ad hoc | **Supprimer**. Remplacés par 4 sémantiques uniquement (success/warning/error/info) |
| `white/10…85` (13 opacités) | **Supprimer**. Remplacés par 3 textes inverses + 1 bordure + 1 surface |

### 2.2 Palette V2 (16 couleurs + 4 sémantiques)

#### Brand

| Token | Nom | HEX | RGB | Rôle | Usage | Interdit |
|---|---|---|---|---|---|---|
| `--color-primary` | Teal EBJV | `#0F4C5C` | 15 76 92 | Couleur d'identité | Bouton primaire, liens, icônes actives, focus ring, chips actives | Fond de section entière (utiliser ink) |
| `--color-primary-dark` | Teal profond | `#0A3542` | 10 53 66 | Hover/active du primaire | `:hover` bouton primaire, bordure active | Texte |
| `--color-primary-light` | Teal lavé | `#E3EFF2` | 227 239 242 | Surface teintée | Fond de chip, encart info, fond d'icône, cellule active | Texte, bordure seule |
| `--color-ink` | Encre | `#081F29` | 8 31 41 | Fond sombre | Hero, section « Bilingue », CTA final, footer | Texte courant sur fond clair (utiliser text-1) |
| `--color-ink-2` | Encre relevée | `#0C2A36` | 12 42 54 | Surface sur encre | Carte / bloc sur fond ink (remplace `white/5`) | Ailleurs que sur ink |
| `--color-gold` | Doré | `#B8862E` | 184 134 46 | Accent | Filets, numéros, eyebrow **sur fond sombre**, icône ponctuelle, soulignement | Fond de bouton, texte < 24 px sur fond clair (3.07:1) |
| `--color-gold-light` | Doré clair | `#D9B36A` | 217 179 106 | Accent sur sombre | Eyebrow, icône, filet sur ink ; bouton CTA final **avec texte ink** | Sur fond clair |
| `--color-gold-deep` | Doré texte | `#7F5B1C` | 127 91 28 | Accent lisible sur clair | Eyebrow / label doré sur paper/linen (5.84:1) | Grandes surfaces |

#### Neutres (chauds)

| Token | HEX | RGB | Rôle |
|---|---|---|---|
| `--color-paper` | `#FAF9F6` | 250 249 246 | **Background** de page (light 1) |
| `--color-white` | `#FFFFFF` | 255 255 255 | **Surface** : cartes, inputs, header solide |
| `--color-linen` | `#F2F0EA` | 242 240 234 | **Surface alt** : sections claires alternées (light 2), fond de bloc calme |
| `--color-border` | `#E2DED5` | 226 222 213 | Bordure par défaut (cartes, filets, séparateurs) |
| `--color-border-strong` | `#B9B2A4` | 185 178 164 | Bordure d'input, filet appuyé, hover de bordure |
| `--color-text-1` | `#111C24` | 17 28 36 | Texte principal, titres |
| `--color-text-2` | `#44515B` | 68 81 91 | Corps de texte secondaire, sous-titres |
| `--color-text-3` | `#5A666F` | 90 102 111 | Texte discret : légendes, métadonnées, placeholders (min 5.17:1) |
| `--color-text-inverse` | `#FFFFFF` | 255 255 255 | Titres et corps sur ink |
| `--color-text-inverse-2` | `#BFC5C7` | 191 197 199 | Corps secondaire sur ink (remplace white/60–75) |
| `--color-text-inverse-3` | `#97A1A5` | 151 161 165 | Légendes sur ink (remplace white/40–50) — **minimum autorisé** |
| `--color-border-inverse` | `rgb(255 255 255 / 0.14)` | — | Filets sur ink (décoratif, non textuel) |

#### Sémantiques (texte + fond appairés, jamais utilisés seuls pour décorer)

| Token | Texte | Fond | Ratio | Usage |
|---|---|---|---|---|
| `success` | `#1F7A4D` | `#E6F2EC` | 4.63 | « Disponible », étape validée |
| `warning` | `#7A520C` | `#FBF3E1` | 6.25 | « En cours », « à confirmer », tarifs non publiés |
| `error` | `#B42318` | `#FBEAE8` | 5.65 | Erreurs de formulaire |
| `info` | `#0F4C5C` (= primary) | `#E3EFF2` (= primary-light) | 8.10 | Notes neutres, « projet en cours » |

### 2.3 Matrice de contraste vérifiée (WCAG 2.1)

| Paire | Ratio | Verdict |
|---|---|---|
| text-1 / paper | 16.41 | AAA |
| text-2 / paper · linen | 7.75 · 7.16 | AAA |
| text-3 / paper · linen · white | 5.60 · 5.17 · 5.89 | AA (tout corps) |
| white / primary (bouton) | 9.51 | AAA |
| primary / paper (lien) | 9.03 | AAA |
| primary / primary-light (chip) | 8.10 | AAA |
| gold-deep / paper (eyebrow) | 5.84 | AA |
| gold-light / ink · ink-2 (eyebrow) | 8.57 · 7.58 | AAA |
| **ink / gold-light (CTA final)** | 8.57 | AAA — c'est ainsi que le doré devient cliquable |
| text-inverse-2 / ink · ink-2 | 9.71 · 8.59 | AAA |
| text-inverse-3 / ink · ink-2 | 6.43 · 5.68 | AA |
| primary / paper (focus ring, non-texte ≥ 3:1) | 9.03 | ✅ |
| gold-light / ink (focus ring sur sombre) | 8.57 | ✅ |

Règle : **aucune opacité sur du texte**. Si une couleur de texte n'est pas dans ce tableau, elle n'existe pas.

### 2.4 Règles d'application
- **Max 3 couleurs « vivantes » par écran** : primary + gold + une sémantique éventuelle.
- Le doré ne dépasse jamais **5 % de la surface** d'une section.
- Sur ink, l'unique surface autorisée est ink-2 avec bordure `border-inverse`. Pas de `backdrop-blur`.
- Les sémantiques n'apparaissent **que** portées par une information de statut (badge, alerte, état de champ).

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Familles
- **Display / Titres** : `"Playfair Display", "Iowan Old Style", Georgia, serif` — graisse **600** par défaut (700 réservé au Display/H1). Le 600 est plus fin, plus « éditorial », moins « affiche ».
- **Texte / UI** : `Inter, system-ui, -apple-system, "Segoe UI", sans-serif` — 400 / 500 / 600. Le 700 Inter est supprimé (les titres sont en serif ; l'UI n'a pas besoin de bold).
- Chargement : Playfair 600 + 700 (roman uniquement, l'italique 600 optionnel pour les citations), Inter 400/500/600. **5 fichiers au lieu de 21.** `font-display: swap`, `preconnect` conservé, `preload` du woff2 Playfair 600.
- `font-feature-settings: "kern", "liga"` ; chiffres `tabular-nums` sur stats, horaires, prix.

### 3.2 Échelle (desktop ≥ 1280 / tablet 768–1279 / mobile < 768)

| Niveau | Famille · graisse | Desktop | Tablet | Mobile | Line-height | Tracking | Max-width |
|---|---|---|---|---|---|---|---|
| **Display** (Hero H1) | Playfair 700 | 64 px | 52 px | 38 px | 1.08 | −0.015em | 14ch |
| **H1** (pages internes) | Playfair 700 | 48 | 40 | 32 | 1.12 | −0.01em | 18ch |
| **H2** (section) | Playfair 600 | 40 | 34 | 28 | 1.15 | −0.01em | 22ch |
| **H3** | Playfair 600 | 28 | 24 | 22 | 1.25 | 0 | 30ch |
| **H4** | Inter 600 | 20 | 18 | 18 | 1.35 | 0 | 40ch |
| **Body Large** (lead) | Inter 400 | 20 | 18 | 17 | 1.6 | 0 | 60ch |
| **Body** | Inter 400 | 17 | 16 | 16 | 1.65 | 0 | 65ch |
| **Body Small** | Inter 400 | 15 | 15 | 15 | 1.6 | 0 | 65ch |
| **Caption** | Inter 400/500 | 13 | 13 | 13 | 1.5 | 0.005em | 50ch |
| **Eyebrow / Label** | Inter 600 | 13 | 13 | 12 | 1.2 | 0.08em, uppercase | — |
| **Button** | Inter 600 | 15 (md) · 16 (lg) | idem | idem | 1 | 0.005em | — |
| **Navigation** | Inter 500 | 15 | 15 | 17 (menu mobile) | 1 | 0 | — |
| **Stat number** | Playfair 600, tabular | 56 | 48 | 40 | 1 | −0.02em | — |

Implémentation : `clamp()` pour Display/H1/H2/H3 et Stat (fluide entre 375 et 1440 px) ; valeurs fixes pour le reste.

```
Display : clamp(2.375rem, 1.5rem + 3.7vw, 4rem)
H1      : clamp(2rem, 1.4rem + 2.5vw, 3rem)
H2      : clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem)
H3      : clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)
Stat    : clamp(2.5rem, 1.8rem + 2.9vw, 3.5rem)
```

### 3.3 Règles
- **Plancher absolu : 13 px** (caption). `text-[11px]`, `text-[10px]`, `text-xs` (12 px) disparaissent du code. Seul l'eyebrow mobile tolère 12 px car uppercase + tracking.
- **Corps mobile = 16 px.** Non négociable (lisibilité + évite le zoom iOS sur les inputs).
- Mesure : 60–65 caractères pour le corps ; titres de section ≤ 22 caractères par ligne → un H2 fait **2 lignes maximum** à toute largeur.
- Titres : `text-wrap: balance` ; paragraphes : `text-wrap: pretty`.
- Césure : `hyphens: auto` + `lang` correct **uniquement** sur les paragraphes (jamais les titres). Un H2 qui déborde à 320 px se réécrit, il ne se coupe pas.
- Tracking : uppercase = 0.08em maximum (fini le 0.2em). Jamais de tracking positif sur du serif.
- Contraste titres/corps : serif 600 vs sans 400 — **on n'ajoute pas** de gras dans les paragraphes pour « dynamiser » ; on utilise text-1 vs text-2.
- Playfair : `line-height ≥ 1.08` à cause des accents capitales (É, À) ; padding-top 0.05em sur les H1 en tête de section sombre.

---

## 4. SPACING SYSTEM

Base 4 px, courbe **8-pt** avec sauts éditoriaux au-delà de 64.

| Token | px | Usage principal |
|---|---|---|
| `space-1` | 4 | Icône ↔ label, padding chip vertical |
| `space-2` | 8 | Gap intra-composant, padding chip horizontal |
| `space-3` | 12 | Eyebrow → titre, padding bouton sm vertical |
| `space-4` | 16 | Titre → paragraphe, padding carte mobile, gutter mobile |
| `space-5` | 20 | Gutter tablet/desktop, gap liste |
| `space-6` | 24 | Padding carte desktop, gap grille mobile |
| `space-8` | 32 | Gap grille desktop, paragraphe → CTA |
| `space-10` | 40 | Bloc → bloc intra-section (mobile) |
| `space-12` | 48 | En-tête de section → contenu (mobile) ; bloc → bloc (desktop) |
| `space-16` | 64 | En-tête de section → contenu (desktop) ; padding section mobile |
| `space-20` | 80 | Padding section tablet |
| `space-24` | 96 | Padding section desktop (standard) |
| `space-32` | 128 | Padding section « respiration » (hero bas, CTA final) desktop |

### Règles d'application

| Contexte | Mobile | Tablet | Desktop |
|---|---|---|---|
| Section standard (`py`) | 64 | 80 | 96 |
| Section compacte (bande contact, stats) | 40 | 48 | 64 |
| Section respiration (CTA final) | 80 | 96 | 128 |
| En-tête de section → contenu | 40 | 48 | 64 |
| Eyebrow → H2 | 12 | 12 | 16 |
| H2 → lead | 16 | 16 | 20 |
| Lead → CTA | 24 | 32 | 32 |
| Gap grille de cartes | 16 | 20 | 24 |
| Padding carte | 20 | 24 | 32 |
| Gap entre paragraphes | 16 | 16 | 20 |
| Bouton md (padding v/h) | 12 / 20 | — | — |
| Bouton lg | 14 / 24 | — | — |

Tokens CSS fluides pour les sections : `--section-y: clamp(4rem, 3rem + 4vw, 6rem)` ; `--section-y-compact: clamp(2.5rem, 2rem + 2vw, 4rem)` ; `--section-y-air: clamp(5rem, 3.5rem + 5vw, 8rem)`.

Sections adjacentes de **même fond** : la seconde perd son padding-top (`pt-0`) ou un filet `border` les sépare — jamais 192 px de vide cumulés.

---

## 5. GRID SYSTEM

Le système existant est conservé et devient obligatoire.

| | Mobile < 768 | Tablet 768–1279 | Desktop ≥ 1280 |
|---|---|---|---|
| Colonnes | 4 | 8 | 12 |
| Marge latérale | 16 px (20 px ≥ 480) | 32 → 96 px fluide | 96 px |
| Gutter | 16 px | 20 px | 24 px |
| Max-width container | 100 % | 100 % | **1280 px** de contenu (1440 cadre − 2×80) |
| Container « prose » | 100 % | 8 col | **8 col centrées** (≈ 840 px) |
| Container « narrow » (formulaire, FAQ) | 100 % | 6 col | **6 col centrées** (≈ 620 px) |

Changement vs V1 : max contenu 1248 → **1280 px** avec marges 80 px ≥ 1440 (alignement exact sur 12 × 88 + 11 × 24). Grands écrans ≥ 1600 : le container reste 1280, le fond s'étend ; les sections sombres restent pleine largeur.

### Règles d'alignement
- **Texte de section** : commence colonne 1 (aligné gauche) ou occupe les colonnes 3–10 (centré). Plus de `max-w-xl mx-auto` arbitraire.
- **Split éditorial** : 5 col / 7 col (image / texte) ou 6 / 6 ; jamais 50/50 « flottant ».
- **Cartes** : 12 col → 3 cartes de 4 col, ou 4 de 3 col, ou 2 de 6. Tablet : 2 de 4 col. Mobile : 4 col pleines.
- **Images** : bord aligné sur une ligne de colonne ; peuvent déborder du container **à droite** (bleed) sur desktop uniquement dans le pattern Editorial Split.
- `GridOverlay` (Ctrl/Cmd+G) reste l'outil de vérification.

---

## 6. BORDER RADIUS

| Token | px | Usage |
|---|---|---|
| `radius-xs` | 4 | Chips, badges, tags, cellules |
| `radius-sm` | 8 | Boutons, inputs, tuiles icône, onglets |
| `radius-md` | 12 | Cartes, accordéon, encarts |
| `radius-lg` | 16 | Images, conteneurs de média, panneau menu mobile |
| `radius-pill` | 9999 | **Uniquement** switch de langue et badge de statut circulaire |

Supprimés : `xl 20`, `2xl 24`, `3xl 32`. Une carte n'est pas un galet.

---

## 7. SHADOW / ELEVATION

| Token | Valeur | Usage |
|---|---|---|
| `shadow-none` | — | **Défaut** de toutes les cartes et boutons |
| `shadow-subtle` | `0 1px 2px rgb(8 31 41 / 0.06), 0 1px 3px rgb(8 31 41 / 0.04)` | Header solide au scroll, carte en hover (light) |
| `shadow-medium` | `0 4px 12px rgb(8 31 41 / 0.08), 0 2px 4px rgb(8 31 41 / 0.04)` | Menu mobile, dropdown, image en Editorial Split |
| `shadow-strong` | `0 16px 40px rgb(8 31 41 / 0.16)` | Modale, panneau latéral |

Principe : la profondeur vient de **fond + bordure**, pas de l'ombre. Ombre = quelque chose *flotte au-dessus* de la page (header, menu, modale). Pas d'ombre colorée. Pas d'ombre sur les boutons.

Overlays : `rgb(8 31 41 / 0.5)` derrière le menu mobile ; pas de `backdrop-blur` (coût GPU mobile, look verre).

---

## 8. ICONOGRAPHY

**Bibliothèque unique : Lucide (`lucide-react`, déjà en place).** Conservée — cohérente, légère (tree-shakable), stroke paramétrable.

| Règle | Valeur |
|---|---|
| `strokeWidth` | **1.75** partout (défaut Lucide 2 → trop lourd à côté d'Inter 400) ; 2 pour les icônes ≤ 16 px dans les boutons |
| Tailles | 16 (inline texte, bouton sm), 20 (bouton md/lg, liste, nav), 24 (tuile feature), 32 (placeholder média). **Pas d'autre taille.** |
| Couleur | Hérite du texte (`currentColor`). Accent doré **uniquement** sur fond ink. Jamais de tuile colorée arc-en-ciel. |
| Tuile d'icône | 40×40, `radius-sm`, fond primary-light, icône 20 primary. Sur ink : fond ink-2, bordure inverse, icône gold-light. |
| Spacing | Icône ↔ texte : 8 px (inline), 12 px (liste). Icône en fin de bouton : `ArrowRight` 16/20, jamais `ArrowUpRight` pour un lien interne. |
| Accessibilité | `aria-hidden="true"` sur toute icône décorative ; `aria-label` sur le bouton porteur si icône seule. |
| Interdit | Emojis, `public/icons.svg`, icônes remplies, icônes animées, deux icônes côte à côte pour un même item (ex. numéro + icône dans RegistrationProcess). |

Vocabulaire fixé (pas de synonymes) :

| Sens | Icône |
|---|---|
| Aller / lien / CTA | `ArrowRight` |
| Externe | `ExternalLink` (footer uniquement) |
| Déplier | `ChevronDown` · Onglet/étape suivante `ChevronRight` |
| Téléphone / WhatsApp / e-mail / adresse / horaires | `Phone` · `MessageCircle` · `Mail` · `MapPin` · `Clock` |
| Bilingue / langues | `Languages` |
| Programme / niveau | `BookOpen` · `GraduationCap` |
| Équipe / classe | `Users` |
| Sécurité / autorisation | `ShieldCheck` |
| Validé / en cours | `Check` · `Clock` (jamais `Sparkles`, `PartyPopper`, `Star`) |
| Menu / fermer | `Menu` · `X` |
| Calendrier | `CalendarDays` |
| Document | `FileText` |

---

## 9. BUTTON SYSTEM

Hauteurs : **sm 40 · md 48 · lg 56** (mobile : md et lg = 52, pleine largeur ≤ 480 px). Radius `sm` (8). Inter 600. Gap icône 8. Transition 160 ms.

| Variante | Fond | Texte | Bordure | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|---|---|
| **Primary** | primary | white | — | primary-dark | primary-dark + `translateY(1px)` | ring 2 px primary, offset 2 (offset gold-light sur ink) | opacité 0.45, `cursor-not-allowed` |
| **Primary on ink** (CTA final, hero) | gold-light | ink | — | `#E2C384` | idem | ring gold-light | idem |
| **Secondary** | transparent | primary | 1.5 px primary | fond primary-light | fond primary-light + bordure primary-dark | ring primary | opacité 0.45 |
| **Secondary on ink** | transparent | white | 1.5 px `rgb(255 255 255/.4)` | bordure white, fond `rgb(255 255 255/.08)` | idem | ring gold-light | idem |
| **Tertiary** | linen | text-1 | — | border | — | ring primary | idem |
| **Text / Link** | — | primary | soulignement 1 px `text-underline-offset: 4px` | primary-dark + soulignement 2 px | — | ring primary radius xs | text-3 |
| **Icon** | transparent · 44×44 | text-2 | — | fond linen | — | ring primary | — |
| **Loading** | idem variante | texte masqué, spinner 20 px `Loader2` animé (respecte reduced-motion → texte « … ») | | `aria-busy="true"`, pointer-events none | | | |

**Hiérarchie des actions par écran : 1 Primary maximum visible à la fois** (hors header). Secondary pour l'alternative (WhatsApp). Tertiary pour les actions d'information (tél, e-mail). Text pour « en savoir plus ».

Les variantes V1 `accent`, `outlineWhite`, `ghost`, `ghostWhite` sont mappées : `accent` → Primary on ink · `outlineWhite` → Secondary on ink · `ghost` → Text · `ghostWhite` → supprimé.

---

## 10. CARD SYSTEM

### Quand une carte est **autorisée**
Le contenu est une **unité autonome, répétée ≥ 2 fois, comparable** (3 programmes, 4 installations, 6 réponses FAQ).

### Quand une carte est **interdite**
Un bloc seul (« Pièces à fournir »), une note (« Photos à venir »), une liste, un titre + paragraphe, un CTA. → Utiliser filets, colonnes, `Notice` ou simplement l'espace.

### 4 variantes (pas plus)

| Variante | Fond | Bordure | Radius | Padding | Hover | Contenu |
|---|---|---|---|---|---|---|
| **Card / Default** | white (sur paper/linen) | 1 px border | md | 24 → 32 | bordure border-strong (si cliquable) | Tuile icône 40 → H4 → Body Small |
| **Card / Program** | white | 1 px border ; **bordure gauche 3 px primary** | md | 24 → 32 | shadow-subtle + translateY(−2) si lien | Eyebrow (niveau) → H3 → Body → liste méta (Languages/Clock/BookOpen) → Text link |
| **Card / Stat** | **aucun fond** (texte sur la section) | filet **haut** 1 px border (gold sur ink) | — | 20 top | — | Stat number → Caption. Sur ink : number white, caption inverse-2 |
| **Card / Notice** | sémantique-bg | 1 px sémantique à 30 % | md | 16 → 20 | — | Icône 20 + Caption/Body Small. Remplace toutes les boîtes ambre/bleu « à venir » |

États : `selected` (Program dans le formulaire) = bordure 1.5 px primary + fond primary-light ; `disabled` = opacité 0.5 sans hover.

Sur fond ink : Default devient fond ink-2 + bordure inverse ; Stat garde filet gold.

Objectif chiffré : passer de ≈ 45 cartes à **≤ 18** sur la home.

---

## 11. MOTION SYSTEM

| Token | Valeur | Usage |
|---|---|---|
| `motion-fast` | 120 ms | Couleur, opacité (hover bouton/lien) |
| `motion-base` | 200 ms | Bordure, ombre, transform hover |
| `motion-reveal` | 400 ms | Apparition au scroll (opacité + 12 px) |
| `motion-panel` | 280 ms | Menu mobile, accordéon |
| `ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Entrées, reveals |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Accordéon, onglets |
| Stagger | 60 ms, **max 4 items** puis simultané | Grilles de cartes |

### Règles
- **Reveal** : une seule fois (`once`), déclenché à 15 % de visibilité, `y: 12px → 0`, jamais de scale/clip-path. Implémentation cible : classe CSS `.reveal` + `IntersectionObserver` (hook existant `useScrollReveal`) → **Framer Motion n'est plus nécessaire pour les reveals**. Framer reste pour : accordéon (height auto), menu mobile, transition d'onglets, page transition (fade 200 ms).
- **Hover cartes cliquables** : `translateY(-2px)` + bordure — pas de scale.
- **Boutons** : fond 120 ms ; pas de mouvement.
- **Images** : aucune animation (pas de zoom au hover, pas de Ken Burns).
- **Page transition** : fade 200 ms conservé (`AnimatePresence`), sans déplacement.
- **Interdits** : `repeat: Infinity`, parallaxe, `blur`, pulsation de texte, compteurs animés sur des non-nombres, éléments qui bougent sans interaction.
- **Reduced motion** : `<MotionConfig reducedMotion="user">` à la racine + le bloc CSS existant. Les reveals CSS passent à `opacity` seul.

---

## 12. ACCESSIBILITÉ (intégrée)

- Contraste : uniquement les paires §2.3. Texte ≥ 4.5:1, UI/focus ≥ 3:1.
- Focus : `outline: 2px solid var(--color-primary); outline-offset: 2px` global via `:focus-visible` ; gold-light sur ink. Jamais `outline: none` sans remplacement.
- Cibles : **44 × 44 px minimum** pour tout élément interactif (switch langue, liens footer, onglets, icônes) — padding invisible autorisé.
- Clavier : ordre DOM = ordre visuel ; menu mobile avec focus trap + retour focus ; onglets Programmes avec flèches ← → ; accordéon `aria-expanded` + `aria-controls`.
- Sémantique : 1 `h1` par page ; chaque `section` a un `h2` (visible ou `sr-only`) ; `nav` labellisées ; `main` unique.
- Formulaires : `label` liés, `autocomplete`, `aria-invalid`, `aria-describedby` vers l'erreur, erreur en Body Small error + icône, jamais couleur seule.
- Motion : reduced-motion respecté (§11).
- Langue : `lang` mis à jour ✅ ; boutons EN/FR avec `lang="en"` / `lang="fr"` et `aria-pressed`.
- Images : `alt` descriptif pour les photos réelles ; `alt=""` pour les placeholders (le label textuel visible suffit).

---

## 13. DESIGN TOKENS — proposition `src/styles/tokens.css`

```css
/* EBJV Design Tokens V2 — importé par src/index.css (Phase 2). Tailwind 4 @theme. */
@theme {
  /* ── Reset des palettes V1 pour empêcher les fuites (primary-50…950, accent-*, neutral-*) ── */
  --color-primary-*: initial;
  --color-accent-*: initial;
  --color-neutral-*: initial;
  --color-emerald-*: initial; --color-amber-*: initial; --color-rose-*: initial;
  --color-violet-*: initial;  --color-red-*: initial;   --color-blue-*: initial;

  /* ── Brand ── */
  --color-primary: #0F4C5C;
  --color-primary-dark: #0A3542;
  --color-primary-light: #E3EFF2;
  --color-ink: #081F29;
  --color-ink-2: #0C2A36;
  --color-gold: #B8862E;
  --color-gold-light: #D9B36A;
  --color-gold-deep: #7F5B1C;

  /* ── Neutrals ── */
  --color-paper: #FAF9F6;
  --color-white: #FFFFFF;
  --color-linen: #F2F0EA;
  --color-border: #E2DED5;
  --color-border-strong: #B9B2A4;
  --color-border-inverse: rgb(255 255 255 / 0.14);
  --color-text-1: #111C24;
  --color-text-2: #44515B;
  --color-text-3: #5A666F;
  --color-text-inverse: #FFFFFF;
  --color-text-inverse-2: #BFC5C7;
  --color-text-inverse-3: #97A1A5;

  /* ── Semantic ── */
  --color-success: #1F7A4D;  --color-success-bg: #E6F2EC;
  --color-warning: #7A520C;  --color-warning-bg: #FBF3E1;
  --color-error:   #B42318;  --color-error-bg:   #FBEAE8;
  --color-info:    #0F4C5C;  --color-info-bg:    #E3EFF2;

  /* ── Type ── */
  --font-display: "Playfair Display", "Iowan Old Style", Georgia, serif;
  --font-body: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  --text-display: clamp(2.375rem, 1.5rem + 3.7vw, 4rem);   --text-display--line-height: 1.08; --text-display--letter-spacing: -0.015em;
  --text-h1: clamp(2rem, 1.4rem + 2.5vw, 3rem);            --text-h1--line-height: 1.12;      --text-h1--letter-spacing: -0.01em;
  --text-h2: clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem);      --text-h2--line-height: 1.15;      --text-h2--letter-spacing: -0.01em;
  --text-h3: clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem);    --text-h3--line-height: 1.25;
  --text-h4: 1.25rem;                                      --text-h4--line-height: 1.35;
  --text-lead: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);    --text-lead--line-height: 1.6;
  --text-body: clamp(1rem, 0.97rem + 0.15vw, 1.0625rem);   --text-body--line-height: 1.65;
  --text-body-sm: 0.9375rem;                               --text-body-sm--line-height: 1.6;
  --text-caption: 0.8125rem;                               --text-caption--line-height: 1.5;
  --text-eyebrow: 0.8125rem;                               --text-eyebrow--line-height: 1.2;  --text-eyebrow--letter-spacing: 0.08em;
  --text-stat: clamp(2.5rem, 1.8rem + 2.9vw, 3.5rem);      --text-stat--line-height: 1;       --text-stat--letter-spacing: -0.02em;

  /* ── Spacing (complète l'échelle Tailwind 4px) ── */
  --spacing-section: clamp(4rem, 3rem + 4vw, 6rem);
  --spacing-section-compact: clamp(2.5rem, 2rem + 2vw, 4rem);
  --spacing-section-air: clamp(5rem, 3.5rem + 5vw, 8rem);
  --spacing-section-head: clamp(2.5rem, 2rem + 2vw, 4rem);

  /* ── Radius ── */
  --radius-*: initial;
  --radius-xs: 4px; --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px; --radius-pill: 9999px;

  /* ── Shadow ── */
  --shadow-*: initial;
  --shadow-subtle: 0 1px 2px rgb(8 31 41 / 0.06), 0 1px 3px rgb(8 31 41 / 0.04);
  --shadow-medium: 0 4px 12px rgb(8 31 41 / 0.08), 0 2px 4px rgb(8 31 41 / 0.04);
  --shadow-strong: 0 16px 40px rgb(8 31 41 / 0.16);

  /* ── Container ── */
  --container-page: 80rem;   /* 1280 */
  --container-prose: 52.5rem;/* 840 */
  --container-narrow: 38.75rem; /* 620 */

  /* ── Motion ── */
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 120ms; --duration-base: 200ms; --duration-reveal: 400ms; --duration-panel: 280ms;
}

/* Breakpoints (Tailwind 4 defaults conservés) : sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 + xs 480 (custom-variant existant) */
```

Grille (`:root --grid-*`) : conservée telle quelle, marge desktop 96 → **80 px** ≥ 1440 et gutter desktop 20 → **24 px**.

---

## 14. COMPONENT INVENTORY (architecture recommandée)

Principe : **on étend `src/components/ui`, on ne crée pas de dossier parallèle.** Les sections restent dans `sections/` et ne contiennent plus de styles de carte/bouton inline.

```
src/
  styles/
    tokens.css            ← nouveau (§13)
  components/
    ui/                    FOUNDATION + ACTIONS + CONTENT
      Container.jsx        ← nouveau : variant page | prose | narrow (remplace max-w-* ad hoc)
      Section.jsx          ← nouveau : tone paper | linen | ink ; density standard | compact | air ; gère id + padding + adjacence
      SectionHeading.jsx   ← refonte : eyebrow (texte, pas pill) · title · lead · align left|center ; tone hérité de Section
      Eyebrow.jsx          ← nouveau (label uppercase + filet optionnel)
      Button.jsx           ← refonte variantes §9 (primary | primaryOnInk | secondary | secondaryOnInk | tertiary | text | icon) + loading
      Card.jsx             ← nouveau : variant default | program | stat | notice ; sous-composants Card.Icon, Card.Title, Card.Body, Card.Meta
      Notice.jsx           ← nouveau : tone info | warning | success | error (remplace toutes les boîtes ambre/bleu)
      Badge.jsx            ← refonte : status available | planned | info ; radius xs ; texte 13 px
      Stat.jsx             ← nouveau : value + label + tone
      IconTile.jsx         ← nouveau : 40×40 selon §8
      Accordion.jsx        ← conservé, re-skin (radius md, focus, aria-controls)
      Tabs.jsx             ← nouveau : tablist/tab/tabpanel accessible (Programmes)
      LanguageSwitcher.jsx ← refonte : cibles 44 px, aria-pressed, lang
      Divider.jsx          ← nouveau : filet border | gold (hairline)
      MediaPlaceholder.jsx ← nouveau : ratio + label « Photo à venir » standardisé (remplace 3 versions)
    layout/
      Navbar.jsx           ← refonte visuelle (structure et logique scroll conservées)
      MobileMenu.jsx       ← extrait de Navbar : focus trap, retour focus
      MobileCtaBar.jsx     ← extrait de Navbar
      Footer.jsx           ← refonte
    registration/
      FormField.jsx        ← re-skin + autocomplete + aria-invalid
      Stepper.jsx          ← re-skin tokens
    animations/
      Reveal.jsx           ← remplace ScrollReveal : CSS class + useScrollReveal, sans Framer
      (AnimatedCounter.jsx supprimé — non utilisé)
```

Composants **non créés volontairement** : `Stack`, `Text`, `Heading` génériques (Tailwind suffit) ; `Testimonial` (aucune donnée) ; `Select`/`FileUpload` séparés (FormField couvre le besoin actuel).

---

## 15. COMPOSITION RULES (page)

1. **Max 3 tons de section** : paper, linen, ink. Ordre de la home défini dans ART_DIRECTION_V2 §5.
2. **Max 2 sections ink** sur la home + le footer. Jamais deux ink adjacentes (le footer suit toujours le CTA final : c'est l'exception assumée, séparée par un filet gold).
3. **Max 4 niveaux de titre visibles** par page (Display/H1, H2, H3, H4).
4. **Max 3 grilles de cartes** sur la home ; le reste en compositions éditoriales (split, liste numérotée, tableau, citation, stats sur filet).
5. **1 Primary CTA visible par viewport** (hors header/barre mobile).
6. **Whitespace** : au moins 64 px (desktop) entre deux blocs de nature différente à l'intérieur d'une section.
7. **Densité** : une section = 1 idée. Si elle a besoin de 2 en-têtes internes (cas actuel de Bilingual), c'est 2 sections ou 1 section à 2 colonnes.
8. **Doré** ≤ 5 % de surface, jamais en fond de texte blanc.
9. **Placeholders** : un seul style (`MediaPlaceholder`) et une seule `Notice` de transparence par page, dans la section concernée — pas de répétition.
10. Toute nouvelle valeur (couleur, taille, radius, durée) doit d'abord entrer dans `tokens.css`.
