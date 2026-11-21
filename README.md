# École bilingue Jules & Véronique

Site vitrine bilingue (français / anglais) de l’École bilingue Jules & Véronique, à Ouêdo, en face de la Cité nouvelle, Abomey-Calavi.

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
   http://localhost:5173/ecole-jules-veronique/
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

Les tarifs, témoignages, liens sociaux, logo et photographies ne sont pas inventés : les blocs concernés indiquent qu’ils seront ajoutés après transmission ou validation par l’école. Les fonctionnalités numériques prévues par les TDR sont également signalées comme un projet en cours, et non comme des fonctionnalités déjà disponibles.
