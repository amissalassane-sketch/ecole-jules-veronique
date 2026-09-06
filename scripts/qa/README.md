# QA scripts (Chromium headless)

Ces scripts ont servi au diagnostic P0 du scroll et à l'audit responsive (voir `docs/AUDIT_V2.md`).
Ils ne font pas partie du build. Prérequis : le serveur Vite lancé sur `http://localhost:5173`.

```bash
# dans un dossier séparé pour ne pas alourdir package.json
npm i puppeteer            # ou puppeteer-core + @sparticuz/chromium si le CDN Chrome est bloqué
node scripts/qa/scroll-test.mjs        # molette · clavier · touch · menu mobile · navigation inter-routes
node scripts/qa/responsive-audit.mjs   # 320→1600 : overflow X, tailles de police, cibles < 40 px, captures
```

Adapter les deux premières lignes (import / launch) selon le binaire disponible.

## Scripts V2 (`scripts/qa/v2/`)

Outillage utilisé depuis la Phase 2.7 (réinstallable en quelques secondes après une réinitialisation du bac à sable) :

```bash
mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i puppeteer-core @sparticuz/chromium
# Décompresser les libs AL2023 embarquées si le système n'a pas les dépendances Chromium :
node -e "const z=require('zlib'),fs=require('fs');fs.writeFileSync('/tmp/al2023.tar',z.brotliDecompressSync(fs.readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')))" && mkdir -p /tmp/al2023 && tar -xf /tmp/al2023.tar -C /tmp/al2023
export LD_LIBRARY_PATH=/tmp/al2023/lib:/tmp
R=<chemin du dépôt>/scripts/qa/v2
node $R/section.mjs '#student-life' life   # audit d'une section : 10 largeurs FR + 390/1440 EN, captures dans /tmp/shots
node $R/scroll.mjs                          # scroll P0
node $R/navhero.mjs                         # Navbar + Hero
node $R/anchors.mjs                         # ancres, /registration, FR→EN
npm run build && node $R/pages-fallback.mjs # simule GitHub Pages (404.html) : rechargement direct de /registration et /confirmation
```
