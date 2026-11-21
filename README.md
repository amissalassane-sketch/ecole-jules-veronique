# École bilingue Jules & Véronique

Site vitrine bilingue (français / anglais) de l’École bilingue Jules & Véronique, à Ouèdo, en face de la Cité nouvelle, Abomey-Calavi.

## Visualiser le site en local

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

3. Ouvrir l’URL affichée dans le terminal. Avec la configuration actuelle, elle ressemble à :

   ```text
   http://localhost:5173/
   ```

Le site est responsive : redimensionnez la fenêtre pour vérifier les vues mobile, tablette et desktop. Le bouton **EN / FR** permet de tester la version anglaise et française.

Pour tester la version de production :

```bash
npm run build
npm run preview
```

## Données intégrées

Les informations communiquées par l’école sont centralisées dans `src/data/` :

- `school.js` : identité, adresse, contacts, horaires, niveaux et services ;
- `programs.js` : crèche & garderie, maternelle et primaire ;
- `schedule.js` : alternance français / anglais fournie pour les groupes ;
- `admission.js` : test d’admission et pièces à fournir ;
- `activities.js` et `facilities.js` : vie scolaire et infrastructures ;
- `pricing.js` : frais non publiés et paiement actuel à la banque ;
- `faq.js` : questions fréquentes validées.

Les tarifs, témoignages, liens sociaux et photographies ne sont pas inventés : ils seront ajoutés après transmission et validation par l’école. Le logo (`public/logo-*.webp`) et les couleurs (`src/styles/tokens.css`) viennent du blason officiel.

## Mise en ligne sur Hostinger

Le site est servi à la racine du domaine de l’école (`base: '/'` dans `vite.config.js`). Le fichier `public/.htaccess`, copié dans le build, force le HTTPS et renvoie les liens directs (`/registration`) vers `index.html`.

### Option 1 : déploiement automatique (recommandé)

Le workflow `.github/workflows/deploy.yml` compile le site à chaque push et, sur `main`, l’envoie sur Hostinger par FTP. Pour l’activer, dans GitHub → Settings → Secrets and variables → Actions :

1. **Secrets** (onglet *Secrets*) :
   - `HOSTINGER_FTP_SERVER` : l’hôte FTP (hPanel → Fichiers → Comptes FTP), par ex. `ftp.mondomaine.com`
   - `HOSTINGER_FTP_USERNAME` : l’identifiant FTP
   - `HOSTINGER_FTP_PASSWORD` : le mot de passe FTP
2. **Variables** (onglet *Variables*) :
   - `HOSTINGER_DEPLOY` = `true`
   - `HOSTINGER_SERVER_DIR` (facultatif) : dossier de destination, `/public_html/` par défaut

Ensuite, chaque fusion dans `main` met le site à jour en 1 à 2 minutes.

### Option 2 : envoi manuel

```bash
npm run build
```

Puis, dans hPanel → Gestionnaire de fichiers → `public_html`, envoyer **le contenu** du dossier `dist/` (y compris le fichier caché `.htaccess`).
