# Iconographie — écarts et décisions (Phase 2.1)

Référence : `docs/EBJV_DESIGN_SYSTEM_ART_DIRECTION_V2.md` §12.
Bibliothèque unique autorisée : **lucide-react 1.27** (licence ISC, déjà en dépendance).
Règles appliquées : trait **1.75** partout (règle CSS globale `svg.lucide { stroke-width: 1.75 }` dans `src/index.css`), tailles cibles **16 / 20 / 24 / 32**, aucun SVG « maison », aucun pack externe téléchargé.

---

## 1. Icônes manquantes dans Lucide

| Besoin | Lucide le plus proche | Problème | Alternative retenue |
|---|---|---|---|
| **Facebook** (lien réseau social, footer) | `Globe` (utilisé aujourd'hui), `Share2`, `Link` | Lucide a **retiré toutes les icônes de marques** (`Facebook`, `Instagram`, `Linkedin`, `Youtube`, `Twitter`) ; elles n'existent plus dans la version installée. Un icône générique ne permet pas d'identifier le réseau. | **Lien texte** « Facebook » (`aria-label` + libellé visible) précédé de `ExternalLink` 16 px. Aucun logo de marque n'est dessiné. À traiter en 2.11 (Footer). |
| **Instagram** | `ExternalLink` (utilisé aujourd'hui), `Camera`, `Image` | Idem : icône de marque absente ; `Camera` induirait en erreur. | Idem : lien texte « Instagram » + `ExternalLink` 16 px. |
| **WhatsApp** (nav, hero, CTA final, page inscription) | `MessageCircle` (utilisé aujourd'hui) | Pas de logo WhatsApp dans Lucide. `MessageCircle` est reconnaissable comme « messagerie », pas comme WhatsApp. | **Conserver `MessageCircle` + libellé texte « WhatsApp » toujours visible** (jamais icône seule, sauf bouton icône avec `aria-label`). Couleur : primaire ou encre, **pas le vert de marque** (hors palette). |
| **Drapeaux FR / EN** (sélecteur de langue) | `Languages`, `Globe` | Lucide ne fournit pas de drapeaux ; les drapeaux sont de toute façon déconseillés (une langue ≠ un pays). | Sélecteur **texte** « FR / EN » (déjà le cas) ; `Languages` 16 px optionnel en préfixe. |
| **Logo école** (monogramme « J » du header) | — | Ce n'est pas une icône : c'est une identité. Aujourd'hui rendu en lettre Playfair dans un cercle CSS. | Conserver le monogramme typographique tant que l'école n'a pas fourni son logo officiel (fichier SVG/PNG source à documenter dans `src/data/school.js`). |
| **Pictogramme « cantine »** | `Utensils` (utilisé) | OK, aucun écart. | — |
| **Pictogramme « transport scolaire »** | `BusFront` (utilisé) | OK. | — |
| **Pictogramme « uniforme »** | `Shirt` | Non utilisé aujourd'hui ; disponible si besoin en 2.x. | `Shirt`. |
| **Pictogramme « mobile money / Kkiapay / FedaPay »** (page inscription, paiement non configuré) | `Smartphone`, `CreditCard`, `Banknote` | Pas de logos opérateurs (MTN MoMo, Moov, Celtiis) dans Lucide ; logos propriétaires → interdits sans licence. | `Smartphone` + libellé texte de l'opérateur. Aucun logo d'opérateur. |

## 2. Écarts d'usage à corriger (constat 2.1, correction section par section en 2.2 → 2.11)

| Constat | Détail | Cible V2 |
|---|---|---|
| Tailles hors grille | Occurrences actuelles : 15 px ×18, 14 px ×10, 13 px ×8, 12 px ×5, 11 px ×3, 17/18/19/22 px, 28/30/34/40 px | Aligner sur **16 / 20 / 24 / 32** (16 dans les boutons et liens, 20 dans les listes, 24 dans les tuiles d'icône, 32 max pour une tuile large). Aucune icône sous 16 px. |
| Trait | Défaut Lucide = 2 | **1.75** — appliqué globalement en CSS dès 2.1 ; ne plus passer `strokeWidth` manuellement. |
| Icônes décoratives non masquées | Plusieurs icônes ornementales sans `aria-hidden` | `aria-hidden="true"` sur toute icône accompagnée d'un texte ; `aria-label` sur le parent quand l'icône est seule. |
| Icônes « festives » | `Sparkles`, `PartyPopper`, `Trophy`, `Star` (hero, badges) | Proscrites par §12 (ton institutionnel) ; remplacer par du texte ou supprimer lors du redesign des sections concernées. Ne pas inventer de substitut. |
| Sprite SVG orphelin | `public/icons.svg` n'est référencé nulle part | Supprimer en 2.12 (nettoyage final). |

## 3. Ce qui est explicitement refusé

- Dessiner ou copier des logos (Facebook, Instagram, WhatsApp, MTN, Moov…) — droits de marque.
- Installer `simple-icons`, `react-icons`, Font Awesome ou tout pack tiers : hors périmètre DS (une seule bibliothèque) et non demandé.
- Emojis comme icônes d'interface.

## 4. Suivi

- 2.1 : règle CSS trait 1.75 ✔ · document créé ✔
- 2.3 (L'école) : section réduite à **3 icônes Lucide** — `Image` 32 (MediaPlaceholder), `MapPin` 20 (adresse), `ShieldCheck` 20 (Notice agréments). Supprimées : `Shield`, `School`, `CalendarDays`, `Languages`, `Scale` (icônes devant chaque « stat », interdites §12 « numéro + icône côte à côte »). ZIP Phosphor (`design/assets/phosphor-icons.zip`) inspecté : aucun logo de marque requis dans cette section → aucun asset Phosphor utilisé, conformément à l'arbitrage validé.
- 2.4 (Engagements) : **2 icônes Lucide** — `GraduationCap` 20 et `ShieldCheck` 20 dans `IconTile` sm, uniquement sur les 2 Card/Default « encadrement autorisé ». Liste 01–05 sans icône (numéro Playfair gold-deep). Supprimées : `Globe`, `Heart`, `Lightbulb`, `Shield`, `Target`, `UsersRound`, `Languages` 14 px (tuiles colorées rose/ambre/émeraude/violet). Aucun asset Phosphor requis (pas de logo de marque).
- 2.5 (Programmes) : Lucide 16 px dans la méta (`Languages`, `Clock`, `BookOpen`, `Target`), `ArrowRight` 16 en fin de Text link, `FileText` 20 dans la Notice, `Image` 32 dans le MediaPlaceholder. Supprimées : `ChevronRight` 15, `Layers3` 14, `BookOpen` 40 coloré par programme. Aucun asset Phosphor.
- 2.6 (Bilinguisme) : 4 icônes Lucide **24** gold-light devant les bénéfices (`Languages`, `BookOpen`, `Users`, `GraduationCap`) — vocabulaire §12. Supprimées : `Globe`, `Sparkles`, `Brain`, `MessageSquareText`, `CalendarDays` 20 (tuiles verre). Aucun asset Phosphor.
- 2.7 (Vie scolaire & cadre) : `Image` 32 dans le MediaPlaceholder ; 7 icônes Lucide **20** dans `IconTile` sm pour les 8 installations (`Building2` ×2 classes/administration, `BookOpen`, `Computer`, `Gamepad2`, `Dumbbell`, `Utensils`, `ShieldCheck`) — statut porté par le `Badge`, pas par la couleur. Supprimées : `Palette`, `Trophy`, `Sparkles`, `CheckCircle2`, `Clock3` (cartes d’activités et pastilles de statut V1). Aucun asset Phosphor.
- 2.8 (Admission) : `Check` 16 (stroke 2) devant les pièces à fournir, `Banknote` 20 dans la Notice warning frais, `Utensils` 20 dans la Notice info services, `ExternalLink` 16 en fin de Text link WhatsApp « Demander les tarifs » (lien externe, vocabulaire §12). Numéros 01–06 Playfair gold-deep sans icône. Supprimées : `Search`, `Lightbulb`, `FlaskConical`, `TrendingUp` (tuiles gradient Methodology), `ClipboardList`, `UserCheck`, `FileText`, `CheckCircle`, `CreditCard`, `PartyPopper` (cartes d’étapes), `HelpCircle`, `MessageCircle` 12, `BusFront`, `Clock3` (Pricing). Aucun asset Phosphor.
- 2.9 (FAQ + Contact) : Accordion re-skin `ChevronDown` 20 (rotation 180°). Contact : `Phone`, `MessageCircle`, `Mail` 20 dans `IconTile` sm ; `MapPin`, `Clock` 16 devant l’adresse et les horaires — tous §12. Supprimées : `Mail`/`Phone`/`MessageCircle` 15 (boutons du bloc FAQ), `ArrowRight` 15 et pastilles vert émeraude (ContactStrip), `FileText`, `GraduationCap`, `MessageCircle`, `ShieldCheck`, `Clock` 12 (cartes DigitalVision, section retirée). Aucun asset Phosphor.
- 2.10 (CTA final + Footer) : CTA — `MessageCircle` 20 dans le Secondary on Ink. Footer — `Phone`, `MessageCircle`, `Mail`, `MapPin`, `Clock` 16 inverse-3 devant les contacts (§19). Réseaux sociaux : aucune URL dans `school.js` → rien rendu, **aucun logo de marque nécessaire** (Phosphor non sollicité) ; le jour où une URL existe, le lien est rendu en texte accessible. Supprimées : `ArrowRight` 18, `Calendar` 18 (CTA) ; `Globe`/`ExternalLink` (fausses icônes sociales), `ArrowUpRight` 13/14, icônes 13/14 px du double JSX footer. Aucun asset Phosphor.
- 2.11 (Pré-inscription) (`RegistrationPage`, `Stepper`, `FormField`) : Lucide `ChevronDown` 16 (select, remplace la flèche data-URI), `AlertCircle` 16 (message d'erreur inline, style Notice), `Check` 16/24 (étape faite / tuile finale), `ArrowLeft`/`ArrowRight` 16 (Retour / Continuer), `MessageCircle` 20 (WhatsApp), `Phone` 20, `MapPin` 20, `Clock` 20 (bloc contact), `Banknote` 20 (NoticeCard paiement banque), `ExternalLink` 16 (uniquement sur le lien carte — externe fonctionnel). Aucune icône décorative, aucun ajout hors vocabulaire §12. Couleurs d'étape emerald supprimées (primary / primary-light / linen).
- 2.2 → 2.11 : normalisation des tailles et `aria-hidden` section par section, remplacement des liens sociaux par des liens texte (Footer, 2.10) ✔
- 2.12 : `public/icons.svg` supprimé ✔ (jamais référencé) ; sections non montées retirées (`DigitalVision`, `ContactStrip`, `Testimonials`) → leurs icônes hors vocabulaire disparaissent du code (`FileText`, `GraduationCap` 12, `ShieldCheck` 12, `ArrowRight` 15, `Quote` 24…). Aucun asset Phosphor dans `src/`, `public/` ni `dist/`.
