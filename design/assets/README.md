# design/assets — reference assets (NOT shipped)

This folder is **outside `public/`** on purpose: Vite copies `public/` verbatim
into `dist/`, so anything here is never deployed.

| File | What | Licence | Decision |
|---|---|---|---|
| `phosphor-icons.zip` | Phosphor Icons full pack (≈ v2.1, March 2024): 1 512 glyphs × 6 weights, SVG / SVG Flat / PNG / icon font. 47 MB, 27 281 files. | MIT — `LICENSE` inside the archive (© 2020-2024 Phosphor Icons) | Audited 2026-09-06. **Lucide stays the only functional icon library** (DS V2 §12). Phosphor is allowed **only** for brand logos that Lucide does not ship — `whatsapp-logo`, and `facebook-logo` / `instagram-logo` once real URLs exist — as **individual `fill` SVGs** copied into `src/` together with the MIT notice, in the phase that needs them. No npm package, no PNG, no icon font, no replacement of existing Lucide icons. |

See `docs/ICONOGRAPHY_GAPS.md` for the icon vocabulary and gaps.
