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
