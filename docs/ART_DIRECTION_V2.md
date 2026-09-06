# EBJV — ART DIRECTION V2

> Comment le Design System V2 s'incarne : identité, imagerie, rythme narratif, blueprint section par section, priorités et roadmap.
> À lire avec `DESIGN_SYSTEM_V2.md` (les valeurs) et `AUDIT_V2.md` (les constats).

---

## 1. ADN visuel

### En une phrase
**« Le prospectus d'une grande école, mis en page par un journal de qualité, lu sur un téléphone. »**

### Mots-clés (dans l'ordre de priorité)

1. **Éditorial** — la typographie porte la hiérarchie ; la page se lit comme un article, pas comme un dashboard.
2. **Académique** — serif, numérotation, filets, tableaux propres ; le sérieux d'un bulletin scolaire.
3. **Humain** — texte à hauteur de parent, photos de vraie vie scolaire, chaleur du papier.
4. **Structuré** — tout tombe sur la grille 12 colonnes ; asymétrie voulue, jamais subie.
5. **Calme** — 3 fonds, 2 couleurs vives, motion discrète ; l'œil se repose.
6. **Contemporain** — air, contrastes francs, ink profond, détails dorés fins.
7. **Premium** — par la retenue et la précision, pas par les effets.

### Curseurs (0 → 10)

| Dimension | V1 | V2 cible |
|---|---|---|
| Sophistication | 6 | 8 |
| Chaleur humaine | 4 | 7 |
| Autorité institutionnelle | 5 | 8 |
| Modernité | 7 | 7 |
| Éditorial | 4 | 8 |
| Minimalisme | 3 | 6 |
| « Tech / SaaS » | 7 | **1** |

### Ce que le site doit évoquer / ne jamais évoquer

| Références d'esprit (pas de copie) | Repoussoirs |
|---|---|
| Sites d'universités européennes bien faits (Sciences Po, ETH), magazines éducation, papeterie scolaire de qualité | Landing SaaS, template Framer, dashboard fintech, site d'agence crypto, brochure Canva, site « kids » multicolore |

---

## 2. Palette en action

- **Paper** `#FAF9F6` est la page. **Linen** `#F2F0EA` est la page qui change de sujet. **Ink** `#081F29` est le moment de gravité (identité, engagement bilingue, décision finale).
- **Teal primary** est *la voix de l'école* : boutons, liens, numéros, icônes.
- **Doré** est *la médaille* : un filet sous un eyebrow, le numéro d'une étape, le trait au-dessus d'un chiffre, le CTA sur ink (texte ink sur fond doré clair). Jamais plus.
- Aucune autre teinte. Les statuts (disponible / en cours) utilisent les sémantiques **uniquement** sur un badge de 13 px.

Répartition visée sur la home : paper 55 % · linen 20 % · ink 20 % · white (cartes) 5 %.

---

## 3. Typographie en action

- **Le H1 dit ce qu'est l'école**, en Playfair 700, 2 lignes max :
  FR *« Une école maternelle et primaire bilingue, à Ouêdo. »* / EN *« A bilingual nursery and primary school in Ouêdo. »*
  La tagline « Éveiller le potentiel, inspirer l'excellence. » devient l'**eyebrow doré** au-dessus du H1 (elle reste la signature de l'école sans porter seule la compréhension). *À valider par l'école.*
- **Eyebrows** : texte doré-profond (sur clair) ou doré-clair (sur ink), uppercase 13 px, tracking 0.08em, **filet 24 px à gauche** — plus de pilule.
- **H2** : Playfair 600, alignés **à gauche** dans 8 colonnes par défaut. Le centré est réservé au CTA final et au hero de page interne.
- **Lead** : Inter 400, 18–20 px, text-2, ≤ 60 caractères/ligne. Le sous-titre ne « re-explique » pas le titre : il donne le fait.
- **Numérotation éditoriale** : `01 · 02 · 03` en Playfair 600 doré pour les étapes, à la place des tuiles carrées.
- **Chiffres** : Playfair 600 tabular, filet doré au-dessus. Uniquement pour de vrais nombres. Les faits non numériques (« Crèche → CM2 ») deviennent une **liste de faits** (H4 + caption), pas des stats.

---

## 4. Direction photographique (à appliquer dès réception des photos ; les placeholders suivent les mêmes ratios)

| Dimension | Règle |
|---|---|
| Sujets | La classe en activité, un enseignant penché sur un cahier, la cour, le portail et la guérite, la cantine, un tableau écrit en deux langues, des mains qui écrivent, des uniformes du vendredi |
| Cadrage | Plans moyens et serrés ; regards **dans l'action**, pas vers l'objectif ; laisser de l'air du côté du texte |
| Lumière | Naturelle, matin ou fin d'après-midi ; pas de flash ; ombres douces |
| Profondeur de champ | Moyenne (f/2.8–4) : sujet net, contexte lisible — l'école doit se reconnaître |
| Couleur | Traitement chaud et légèrement désaturé (−10 %), noirs relevés vers l'ink (teinte bleu-vert), pas de filtre orange/teal marqué |
| Présence humaine | Toujours ≥ 1 personne sauf pour l'architecture ; diversité réelle des élèves et de l'équipe ; autorisation parentale documentée |
| Ratios | Hero 4:5 (mobile) / 3:2 (desktop) ; split éditorial 4:5 ; cartes programme 3:2 ; bandeau vie scolaire 16:9 ; portrait équipe 1:1 |
| Crops | Point focal défini par image (`object-position`) ; le crop mobile recadre **sur le visage/mains**, jamais un simple centrage |
| Traitement UI | Radius lg (16), aucune bordure, aucune ombre sauf en Editorial Split (medium) ; jamais de superposition de texte sur photo sauf hero avec voile ink 60 % |
| Placeholder | `MediaPlaceholder` : fond linen, filet border, icône Lucide 32 text-3, caption « Photo de l'école — à venir » ; **un seul style** pour tout le site |
| Interdit | Banque d'images génériques, images IA présentées comme l'école, enfants isolés identifiables sans consentement, photos de stock de « diversité corporate » |

Hero V2 : **tant qu'aucune photo n'existe**, le hero reste typographique sur ink (pas de placeholder géant) avec un bloc « faits » sur la droite. La photo prendra la colonne droite (7 col) le jour où elle arrive : la structure est prévue pour.

---

## 5. Rythme narratif et alternance des fonds

La home passe de **17 à 11 sections**. Chaque changement de fond a une raison.

| # | Section V2 | Fusionne V1 | Fond | Raison du fond | Layout |
|---|---|---|---|---|---|
| 1 | **Hero** | Hero | **ink** | Gravité d'entrée, identité | Split 6/6 : texte gauche · bloc faits droite (photo plus tard) |
| 2 | **L'école** | Introduction + Statistics | paper | Retour à la lecture | Editorial split 5/7 : media gauche · texte + 4 faits sur filets droite |
| 3 | **Nos engagements** | WhyChoose + TeamProfile | paper (filet haut) | Même sujet que 2 : continuité | Liste éditoriale 2 colonnes numérotée `01–05` — **sans cartes** ; encadrement (2 enseignants/classe, autorisations) en 3 Card/Default sous la liste |
| 4 | **Programmes** | Programs | **linen** | Nouveau sujet : l'offre | Tabs accessibles (desktop) / cartes empilées (mobile) ; Card/Program + bloc « parcours & examens » en Notice info |
| 5 | **Le bilinguisme au quotidien** | Bilingual (citation, tableau, bénéfices) | **ink** | Le cœur de la promesse — le second temps fort | Citation Playfair italic 600 en 8 col · tableau horaire 2 col sur ink-2 · 4 bénéfices en liste (icône + H4 + texte), pas de cartes |
| 6 | **Vie scolaire & cadre** | StudentLife + Facilities | paper | Projection, respiration après l'ink | 2 col : activités par cycle (listes) · installations en 6 Card/Default 3-col avec Badge statut ; bandeau `MediaPlaceholder` 16:9 |
| 7 | **Admission** | Methodology + RegistrationProcess + Pricing (paiement) | **linen** | Passage à l'action | Étapes numérotées `01–06` en 2 col (sans cartes) · colonne droite sticky : pièces à fournir + Notice « frais communiqués par l'administration » + CTA |
| 8 | **Questions fréquentes** | FAQ + DigitalVision (1 entrée « projet numérique ») | paper | Réassurance | Accordion en container narrow, aligné gauche |
| 9 | **Contact** | ContactStrip + bloc « autre question » | paper (filet haut) | Section propre pour l'ancre `#contact` | 3 colonnes : appeler · WhatsApp · adresse + horaires ; Secondary + Tertiary |
| 10 | **CTA final** | FinalCTA | **ink** | Décision | Centré, H2 + lead + 1 Primary-on-ink + 1 Secondary-on-ink |
| 11 | **Footer** | Footer | ink (filet gold) | Conclusion | 4 col desktop / accordéon 2 col mobile |

Retirés de la home (pas du code) tant qu'il n'y a pas de contenu : **Témoignages** (la section revient quand ≥ 2 témoignages validés existent ; un lien « Témoignages — bientôt » n'a aucune valeur pour un parent).

Alternance résultante : `ink · paper · paper · linen · ink · paper · linen · paper · paper · ink · ink(footer)` → jamais plus de 2 clairs consécutifs de même ton, 3 ink séparés par ≥ 2 sections claires.

Transitions : **coupe franche**. Plus de fondu `from-surface to-transparent` sous le hero, plus de blobs qui « lient » les sections. Entre deux sections de même ton : filet `border` pleine largeur de container.

---

## 6. Blueprint section par section

Format : objectif · problèmes V1 (UX / UI / hiérarchie / contenu / spacing / typo / couleur / image / responsive) · solution V2 · conserver / retirer.

### 6.1 Navbar
- **Objectif** : orienter en 1 s, donner l'action principale, changer de langue.
- **Problèmes** : 11 éléments à 1024 px (tél sur 2 lignes) ; « WhatsApp » et le numéro dupliquent le footer ; switch langue 33×24 px ; état transparent → hamburger teal plein sur mobile (lourd) ; logo « J » rendu différemment nav/footer.
- **V2** : hauteur **72 px** desktop / **60 px** mobile. Logo (monogramme J + « Jules & Véronique » Playfair 600) · 5 liens : L'école · Programmes · Vie scolaire · Admission · Contact · CTA Primary sm « Préinscrire » · switch EN/FR 44 px. Tél/WhatsApp quittent la barre (ils sont dans Contact, barre mobile, footer). État transparent sur hero ink (texte white) → solide `white` + `shadow-subtle` + filet border après 24 px. Mobile : logo · switch · hamburger **Icon button** 44 px (pas de fond plein) ; panneau plein écran depuis la droite, liens 17 px / 52 px de haut, CTA en bas, focus trap.
- **Conserver** : logique scroll, anti-flicker, scroll-lock préservant la position, barre CTA mobile (réduite à Primary + WhatsApp icon).

### 6.2 Hero
- **Objectif** : « Quelle école, où, pour qui, que faire maintenant » en 3 s.
- **Problèmes** : 9 éléments ; H1 tagline générique 88 px sur 3 lignes ; dégradé + 2 blobs + trame + fondu = SaaS ; CTA doré texte blanc 2.66:1 ; trust items 12 px à 45 % ; flèche pulsante infinie ; 100dvh force du vide sur grands écrans.
- **V2** (6 éléments max) : eyebrow doré-clair « Éveiller le potentiel, inspirer l'excellence » (signature) · **Display H1 descriptif** 2 lignes · lead 1 phrase (bilingue FR/EN 50/50, maternelle-CM2, Ouêdo, rentrée 2026-2027) · **1 Primary-on-ink** « Préinscrire mon enfant » + 1 Secondary-on-ink « Parler aux admissions » · colonne droite : bloc « faits » sur ink-2 (Niveaux : Crèche → CM2 · Langues : 50 % FR / 50 % EN · Horaires : 8h-16h · Lieu : Ouêdo, face Cité nouvelle) avec filets gold — remplacé par la photo 4:5 quand elle existe. Hauteur : `min-height: min(88dvh, 820px)`, pas 100dvh. Fond ink **uni** ; un seul élément graphique : filet vertical doré 1 px qui descend du header sur la marge gauche (signature typographique de la marque, repris dans le footer).
- **Retirer** : blobs, trame, gradient, fondu bas, flèche animée, badge « Ouêdo, Bénin » en pilule, 3 trust items (absorbés dans le bloc faits), lien « Découvrir l'école ».
- **Mobile** : bloc faits passe **sous** les CTA en liste 2×2 compacte ; H1 38 px ; CTA pleine largeur empilés.

### 6.3 L'école (Intro + Stats)
- **Problèmes** : placeholder image 4:5 géant avec carrés décoratifs ; 4 « stats » dont 3 non numériques, répétées à l'identique 2 sections plus bas ; H2 3 lignes ; adresse/agrément en 12 px gris.
- **V2** : split 5/7. Gauche : `MediaPlaceholder` 4:5 sobre. Droite : eyebrow « Notre école » · H2 « Révéler le meilleur de chaque enfant, en deux langues. » · 2 paragraphes Body (mission, patronage Saint Augustin) · **4 faits** en grille 2×2 sur filets (H4 Playfair : 2025-26 / Crèche → CM2 / Français · English / 50 % · 50 % ; caption dessous) · ligne méta (MapPin adresse · ShieldCheck « Agréments : en cours » en Badge warning). Section Statistics **supprimée** (doublon).
- **Conserver** : textes FR/EN, données `school.js`.

### 6.4 Nos engagements (WhyChoose + Team)
- **Problèmes** : 5 cartes + 3 cartes de même famille visuelle à 1 section d'écart ; tuiles rose/ambre/émeraude/violet ; sous-titre « Les engagements communiqués par l'école… » ; chips « Français / English / 50 % » redondants.
- **V2** : eyebrow « Nos engagements » + H2 aligné gauche 8 col · **liste numérotée éditoriale** en 2 colonnes (01 Bilinguisme quotidien · 02 Deux enseignants par classe · 03 Deux systèmes éducatifs · 04 Cadre sécurisé · 05 Perspectives nationales et internationales) — numéro Playfair doré, H4, Body Small ; filets entre items. Puis sous-titre H3 « Un encadrement autorisé » + 3 Card/Default (enseignants · autorisations d'enseigner · direction autorisée) + caption « Agréments et reconnaissances officielles : en cours ». Zéro tuile colorée.

### 6.5 Programmes
- **Problèmes** : onglets pilule avec « Âges à confirmer » dans chaque onglet ; panneau image placeholder 4:5 avec couleur par programme (3 teintes supplémentaires) ; 6 sous-blocs (détails, matières, systèmes, diplômes, CTA, note) ; note « secondaire en cours » 2 fois ; contraste 11 px.
- **V2** : fond linen. Eyebrow + H2 gauche. **Desktop** : `Tabs` accessible (3 onglets soulignés 2 px primary, pas de pilule) → `tabpanel` = Card/Program large : colonne 4 col `MediaPlaceholder` 3:2 · 8 col : Badge « Niveaux ouverts 2026-2027 » · H3 · Body · méta en liste 2 col (Languages / Clock / BookOpen / Target) · matières en chips radius xs · Text link « Demander des informations → ». **Mobile** : pas d'onglets, **3 Card/Program empilées** (le tab-scroll horizontal cache l'existence des autres programmes). En dessous, **une** Notice info « Parcours et examens : CEP, BEPC, BAC · Common Entrance, Junior/Senior WAEC — la création du secondaire est en cours. » Suppression de la couleur par programme.

### 6.6 Le bilinguisme au quotidien
- **Problèmes** : 1 889 px de haut ; fenêtre macOS avec 3 pastilles ; citation qui pulse ; 2 en-têtes internes ; tableau 12 px avec 2 couleurs d'alternance ; 4 cartes verre.
- **V2** : fond ink. Eyebrow doré-clair « Programme bilingue » + H2 white gauche 8 col · **citation** Playfair 600 italic 28–40 px white, filet doré vertical à gauche, « — 50 % des cours en français, 50 % en anglais » (sans guillemets décoratifs, sans cadre) · lead inverse-2 « Une alternance organisée… » · **tableau horaire** : 2 groupes côte à côte sur ink-2, radius md, bordure inverse ; cellules 15 px ; Français en white, Anglais en gold-light (1 seule couleur d'accent) ; en-tête de colonne inverse-3 uppercase 13 px ; caption note sous le tableau · **4 bénéfices** en grille 2×2 : icône 24 gold-light + H4 white + Body Small inverse-2, séparés par filets inverse — pas de cartes. Hauteur cible ≤ 1 200 px desktop.

### 6.7 Vie scolaire & cadre (StudentLife + Facilities)
- **Problèmes** : 2 grosses cartes de listes + 7 cartes installations + carte « photos à venir » = 10 cartes ; cartes « planned » en ambre plein.
- **V2** : paper. Eyebrow + H2 « Apprendre aussi par la créativité, le jeu et le cadre. » · bandeau `MediaPlaceholder` 16:9 pleine largeur container (futur bandeau photo cour/classe) · **2 colonnes** : « CI, CP, CE1 » / « CE2, CM1, CM2 » avec H4 + liste à puces primary — sans cartes · H3 « Installations » + **6 Card/Default 3-col** (les 7 de V1 : fusionner « sécurité » et « guérite » si doublon) avec Badge success « Disponible » / warning « En cours » 13 px — fond blanc identique pour tous (le statut n'est pas une couleur de carte).

### 6.8 Admission (Methodology + RegistrationProcess + Pricing paiement)
- **Problèmes** : parcours raconté 2 fois (4 étapes puis 6) ; carré gradient avec bulles animées ; 6 cartes étapes avec 2 icônes chacune ; frais : 1 alerte ambre + 3 cartes + 2 cartes + CTA + 2 lignes 11 px = 9 blocs pour dire « contactez-nous ».
- **V2** : linen. Eyebrow « Admission » + H2 « Des étapes simples pour préparer la rentrée. » · **colonne gauche 7 col** : 6 étapes en liste verticale numérotée `01–06` Playfair doré-profond, filet vertical de progression, H4 + Body Small · **colonne droite 5 col sticky** : bloc blanc bordé (une seule Card/Default) « Pièces à fournir » (liste Check) → Notice warning « Frais scolaires communiqués par l'administration. Paiement à la banque ; mobile money et carte envisagés. » → Notice info « Cantine : repas + goûter · Transport : non assuré » → **Primary « Préinscrire mon enfant »** + Text « Demander les tarifs sur WhatsApp ». Mobile : colonne droite passe sous les étapes, non sticky. Section Pricing autonome supprimée ; l'ancre `#pricing` (nav « Frais ») pointe sur ce bloc.

### 6.9 Questions fréquentes (+ DigitalVision)
- **Problèmes** : DigitalVision = 4 cartes pour dire « ça n'existe pas encore » ; FAQ correcte mais en 14 px, bloc contact imbriqué.
- **V2** : paper. Container narrow, H2 gauche · Accordion : question Inter 600 17 px, réponse Body, chevron 20, filets border, radius md, `aria-controls` · **ajouter 1 entrée** « Y a-t-il un espace parents / paiement en ligne ? » qui résume DigitalVision honnêtement. Section DigitalVision supprimée de la home (le composant reste disponible).

### 6.10 Contact
- **Problèmes** : ancre `#contact` dans la FAQ ; ContactStrip en doublon avec le bloc FAQ ; 3 boutons de styles différents (vert WhatsApp, teal clair, outline).
- **V2** : paper, filet haut. Section compacte 3 colonnes : **Appeler** (Phone · numéro en H4 tabular · horaires caption) · **WhatsApp** (MessageCircle · numéro · « Réponse aux heures d'ouverture ») · **Venir** (MapPin · adresse · « Ouêdo, face Cité nouvelle »). Boutons Tertiary uniformes. Le vert WhatsApp disparaît (l'icône suffit ; pas de couleur de marque tierce).

### 6.11 CTA final
- **Problèmes** : gradient + 2 blobs ; 3 CTA (2 outline) ; ligne contact 30 % ; 764 px de haut.
- **V2** : ink uni, densité « air ». Eyebrow doré-clair « Rentrée 2026-2027 » · H2 white centré 2 lignes « Préparons ensemble la rentrée. » · lead inverse-2 · **Primary-on-ink** (gold-light / texte ink) + Secondary-on-ink « Parler aux admissions » · rien d'autre. Séparé du footer par un filet gold pleine largeur.

### 6.12 Footer
- **Problèmes** : copyright 1.84:1 ; icônes sociales fausses ; 2 layouts (desktop/mobile) dupliqués dans le JSX ; liens 16 px de haut ; « Année 2026-2027 » → `#programs`.
- **V2** : ink. **Desktop 12 col** : 4 col marque (monogramme + nom Playfair + description inverse-2 + CTA Secondary-on-ink) · 2 col « L'école » · 2 col « Admission » · 4 col « Contact » (liste icône 16 + texte 15 px inverse-2, cibles 44 px). Bandeau bas : copyright inverse-3 (5.7:1) · Confidentialité · Conditions (masqués tant que `href="#"`) · switch langue. **Mobile** : marque → contact → 2 colonnes de liens → bandeau. Un seul JSX, classes responsive. Sociaux : rendus uniquement si URL présente, avec icône Lucide `Facebook` / `Instagram`.

### 6.13 Page Pré-inscription
- **Objectif** : conserver le parcours ; re-skinner.
- **V2** : H1 32–48 px · Stepper tokens (étapes validées primary, pas émeraude) · carte formulaire Card/Default radius md · inputs 48 px radius sm bordure border-strong, focus ring primary · erreurs Notice error inline · boutons Primary/Text · `autocomplete` · Notice info pour « note finale » (remplace `text-blue-600`).

---

## 7. Content design (règles d'écriture)

| Élément | Règle |
|---|---|
| H1 | ≤ 60 caractères, factuel, contient « bilingue » |
| H2 | ≤ 45 caractères, 1 idée, verbe ou promesse concrète ; pas de « Unlock », « Shape the future » |
| Eyebrow | 1–3 mots, nom de rubrique |
| Lead | 1 phrase, ≤ 160 caractères, un fait |
| Paragraphe | ≤ 65 mots ; 2 paragraphes max par bloc |
| Carte | Titre ≤ 5 mots ; corps ≤ 30 mots |
| CTA principal | **Un seul libellé partout** : « Préinscrire mon enfant » (FR) / « Pre-register my child » (EN). Le formulaire s'intitule « Demande de pré-inscription ». |
| CTA secondaire | « Parler aux admissions » (WhatsApp) — unique aussi |
| Statuts | « Disponible » / « En cours » / « À confirmer » — vocabulaire fermé |
| Transparence | Une Notice par sujet, une fois : frais (Admission), agréments (L'école), photos (placeholder lui-même) |
| Ton | Vouvoiement ; « votre enfant » côté parents, « les élèves » côté école ; « apprenants » retiré du site public |
| Chiffres | Uniquement réels ; format `50 % · 50 %`, `8h00–16h00`, `2026–2027` (tiret demi-cadratin) |

---

## 8. Responsive art direction

| Largeur | Direction |
|---|---|
| **320–375** | Une colonne stricte. H1 38 px → 34 px à 320. CTA pleine largeur, 52 px. Cartes sans image. Tableau horaire : 1 groupe à la fois, `overflow-x: auto` **avec** indicateur visuel (ombre latérale) — ou liste jour → matin/après-midi. Onglets remplacés par empilement. Footer en accordéon 2 col. Barre CTA fixe conservée mais 56 px. |
| **390–414** | Idem ; grille faits 2×2 ; installations 1 col. |
| **480** | CTA côte à côte ; installations 2 col ; activités 2 col. |
| **768** | 8 col : splits 4/4 ; cartes 2 par ligne ; nav toujours mobile (hamburger) mais panneau 400 px latéral ; hero texte + bloc faits empilés avec faits en 4 col. |
| **1024** | Nav desktop apparaît **avec 5 liens** (tient en 1 ligne grâce au retrait tél/WhatsApp) ; splits 5/7 ; hero 6/6. |
| **1280–1440** | Layout cible complet ; container 1280 ; marges 80–96. |
| **1600+** | Container fixe 1280 ; fonds pleine largeur ; hero limité en hauteur (820 px) pour éviter le vide ; typographie plafonnée (clamp). |

Images : `sizes`/`srcset` obligatoires dès les vraies photos ; `object-position` défini par image ; jamais `height: 100vh` sur une image.

Tables : `min-width` retiré ; à < 480 px le tableau bascule en liste définie (`<dl>`) via CSS `display: block` sur `tr`.

Formulaires : 1 colonne < 640, 2 colonnes ≥ 640 ; inputs 16 px (évite zoom iOS, déjà géré).

---

## 9. Principes d'art direction (non négociables)

1. **La clarté avant la décoration.** Si un élément ne porte pas d'information ou d'action, il n'est pas là.
2. **La typographie porte la hiérarchie.** Pas de tuile, de pilule ou de couleur pour compenser un titre faible.
3. **Le blanc est structurel.** L'espace entre deux blocs est une décision de grille, pas un reste.
4. **Chaque couleur a un rôle.** 3 fonds, 1 voix (teal), 1 médaille (doré), 4 statuts. Rien d'autre.
5. **Une carte est une unité, pas un cadre.** Ce qui n'est pas comparable ne se met pas en carte.
6. **Le doré ne se clique jamais en blanc.** Sur fond doré, le texte est ink.
7. **Le mouvement explique, il ne décore pas.** Aucune animation sans début déclenché par l'utilisateur ou l'entrée dans le viewport, aucune boucle.
8. **Le mobile est dessiné, pas compressé.** Chaque section a une composition mobile propre (empilement, liste, accordéon).
9. **La vérité avant le remplissage.** Un placeholder honnête vaut mieux qu'une image stock ; une donnée absente ne s'invente pas.
10. **Un seul appel principal.** Même libellé, même couleur, même position relative sur toute la page.
11. **Tout tombe sur la grille.** 4 / 8 / 12 colonnes ; on vérifie avec Ctrl+G avant de livrer.
12. **La cohérence bat la nouveauté.** Une section qui a besoin d'un nouveau composant a d'abord besoin d'une justification.

---

## 10. Priorités consolidées

| P | Visuel | UX | Accessibilité | Système / composants | Contenu | Responsive |
|---|---|---|---|---|---|---|
| **P0** | Bouton doré texte blanc ; textes à opacité < 4.5:1 | Scroll (✅ corrigé) | Contrastes ; focus visible | `tokens.css` | — | — |
| **P1** | Retrait blobs/gradients/verre/fenêtre macOS ; radius & ombres tokenisés ; 45 → ≤ 18 cartes ; couleurs hors palette | 17 → 11 sections ; hero 6 éléments ; CTA unique | Cibles 44 px ; focus trap menu ; `MotionConfig` ; `aria-pressed` langue | Section, Container, Card, Notice, Reveal CSS, Button V2, Tabs | H1 descriptif ; libellé CTA unique ; retrait « apprenants » ; sous-titres factuels | Corps 16 px mobile ; programmes empilés ; hero ≤ 88dvh |
| **P2** | Filet doré signature ; numérotation éditoriale ; tableau horaire | Section Contact propre ; footer en 1 JSX | `autocomplete`, `aria-invalid`, `aria-controls` ; icônes `aria-hidden` | MediaPlaceholder ; IconTile ; Divider ; code-split `/registration` ; polices 21 → 5 fichiers | FAQ « projet numérique » ; statuts vocabulaire fermé | Tableau → `<dl>` < 480 ; footer accordéon |
| **P3** | Micro-états hover cartes | — | — | Suppression code mort ; QA scripts versionnés | — | Ajustements 1600+ |

---

## 11. Roadmap d'implémentation (Phase 4 — une étape = une PR / un commit vérifié)

Chaque étape se termine par : capture 375 / 768 / 1440 · test overflow · test scroll · contraste des nouvelles paires · `npm run build` · `npm run lint`.

| Étape | Périmètre | Dépend de |
|---|---|---|
| **4.0 Fondations** | `src/styles/tokens.css` ; `index.css` (base, focus global, reveal CSS, grille 80/24) ; `index.html` (polices 5 fichiers, preload, og:image) ; `MotionConfig` ; `Button` V2 ; `Section` · `Container` · `Eyebrow` · `SectionHeading` V2 · `Card` · `Notice` · `Badge` V2 · `IconTile` · `Stat` · `Divider` · `MediaPlaceholder` · `Reveal` ; mapping temporaire des anciennes classes pour que **le site reste fonctionnel visuellement** entre chaque étape | — |
| **4.1 Navbar** | Navbar + MobileMenu (focus trap) + MobileCtaBar + LanguageSwitcher 44 px | 4.0 |
| **4.2 Hero** | Hero V2 typographique + bloc faits ; textes H1 FR/EN (à valider) | 4.0, 4.1 |
| **4.3 L'école** | Fusion Introduction + Statistics ; retrait `Statistics` de HomePage | 4.0 |
| **4.4 Programmes** | `Tabs` ; Card/Program ; empilement mobile ; Notice examens | 4.0 |
| **4.5 Nos engagements** | Fusion WhyChoose + TeamProfile en liste éditoriale | 4.0 |
| **4.6 Bilinguisme** | Section ink : citation, tableau, bénéfices | 4.0 |
| **4.7 Vie scolaire & cadre** | Fusion StudentLife + Facilities | 4.0 |
| **4.8 Admission** | Fusion Methodology + RegistrationProcess + Pricing ; ancres `#pricing`, `#registration-process` conservées | 4.0 |
| **4.9 FAQ + Contact** | Accordion V2 ; entrée « projet numérique » ; section Contact ; retrait DigitalVision/ContactStrip/Testimonials de HomePage | 4.0 |
| **4.10 CTA final + Footer** | Ink uni ; footer 1 JSX | 4.0 |
| **4.11 Pré-inscription** | FormField, Stepper, RegistrationPage re-skin ; code-split route | 4.0 |
| **5 QA** | 10 largeurs · scroll 4 modes · clavier · reduced-motion · FR/EN · Lighthouse ; scripts `scripts/qa/*.mjs` versionnés ; nettoyage code mort | tout |

Ordre justifié : Navbar et Hero d'abord car ils fixent l'état « transparent → solide » et la première impression ; ensuite les sections dans l'ordre de lecture, les fusions étant indépendantes entre elles (parallélisables si besoin) ; formulaire en dernier car il ne dépend que des composants de 4.0.

---

## 12. Definition of Done (Phase 4 → 5)

- [ ] Aucune classe `emerald|amber|rose|violet|red|blue-*`, `white/xx` textuelle, `text-[1?px]`, `rounded-(xl|2xl|3xl)`, `blur-3xl`, `backdrop-blur`, `bg-gradient-*` dans `src/` (grep = 0).
- [ ] Aucune valeur hors `tokens.css` pour couleur, radius, ombre, durée.
- [ ] Home ≤ 11 sections ; hauteur ≤ 12 000 px à 1440 et ≤ 15 000 px à 375.
- [ ] 100 % des paires texte/fond ≥ 4.5:1 (script de vérification).
- [ ] 100 % des éléments interactifs ≥ 44 × 44 px (script).
- [ ] 0 texte < 13 px ; corps ≥ 16 px sur mobile (script).
- [ ] 0 overflow horizontal à 320–1600 (script).
- [ ] Scroll molette / touch / clavier OK sur `/` et `/registration`, après ouverture/fermeture du menu et navigation retour (script).
- [ ] `prefers-reduced-motion` : aucun `transform` animé.
- [ ] FR/EN : aucune clé manquante ; H1/CTA identiques en sens.
- [ ] Bundle initial < 300 kB gz ; polices ≤ 5 fichiers.
- [ ] `npm run build` + `npm run lint` verts.

---

# DESIGN FREEZE V2 — décisions verrouillées avant Phase 4

1. Palette : **16 couleurs + 4 sémantiques** de `DESIGN_SYSTEM_V2.md` §2 ; aucune opacité textuelle ; doré jamais en fond de texte blanc.
2. Typographie : Playfair 600/700 + Inter 400/500/600 ; échelle §3 ; **plancher 13 px, corps mobile 16 px**.
3. Espacement : échelle 8-pt §4 ; sections 64 / 80 / 96 (+ compact 40–64, air 80–128).
4. Grille : 4 / 8 / 12 ; container 1280 ; marges 16 / 32→80 / 80 ; gutters 16 / 20 / 24.
5. Radius : 4 / 8 / 12 / 16 / pill. Ombres : subtle / medium / strong, jamais sur cartes ni boutons au repos.
6. Icônes : Lucide, stroke 1.75, tailles 16 / 20 / 24 / 32, vocabulaire fermé §8.
7. Boutons : 7 variantes §9 ; **1 Primary par viewport** ; libellé unique « Préinscrire mon enfant » / « Parler aux admissions ».
8. Cartes : 4 variantes §10 ; ≤ 18 sur la home.
9. Motion : 120 / 200 / 400 / 280 ms ; reveal CSS ; aucune boucle ; `MotionConfig reducedMotion="user"`.
10. Structure home : **11 sections**, ordre et fonds §5 de ce document ; Témoignages, DigitalVision, Statistics, ContactStrip, Pricing retirés de la home (fusionnés ou en attente de contenu).
11. Hero : typographique sur ink, 6 éléments, H1 descriptif (texte à valider par l'école), `min-height: min(88dvh, 820px)`.
12. Vocabulaire SaaS banni : blobs, gradients décoratifs, verre, fenêtre macOS, pulsations, trames.
13. Données : rien d'inventé ; placeholders via `MediaPlaceholder` ; transparence via `Notice`, une fois par sujet.
14. Architecture : React/Vite/Tailwind 4, `LanguageContext`, `src/data`, routes, formulaire — **inchangés**. Les nouveaux composants vivent dans `src/components/ui`.

> **Points ouverts nécessitant votre validation avant 4.2** : (a) le H1 descriptif proposé et le passage de la tagline en eyebrow ; (b) le retrait de la section Témoignages de la home tant qu'elle est vide ; (c) le retrait du téléphone/WhatsApp de la barre de navigation desktop ; (d) le libellé unique du CTA « Préinscrire mon enfant ».
