# apps/public-site

Static-site generator for the Brant Studio public website.

## Inputs

| Path | Purpose |
|---|---|
| `build.mjs` | Static generator entry point |
| `legacy/` | Frozen, hash-verified render/content/style copy used by the generator |
| `src/articles.js` | Public sample article metadata/content |
| `src/edition.js` | Edition page render helpers |
| `src/enhance.js` | Optional progressive enhancement |
| `src/public-site.css` | Public-site styles |
| `assets/` | Public screenshots used by the generated pages |

## Output

- 20 routes under `dist/zh/` and `dist/en/`
- `index.html` root entry
- `404.html`
- `sitemap.xml` with 20 URLs
- `robots.txt` allowing public indexing
- path-routed HTML with canonical, hreflang, Open Graph and `index,follow`
- content-hashed CSS/JS assets and SVG/PNG assets

The build has no runtime dependency on the private backend, database, admin UI or
release system.

## Commands

```powershell
$env:PUBLIC_BASE_URL = 'https://brant-studio.pages.dev'
node apps/public-site/build.mjs
```

`dist/` is ignored by Git. There is no deployment credential in this
repository; production deployment is handled separately.

## Legacy copy

`legacy/` is a frozen copy of the original site source and is not edited by hand.
See `legacy/provenance.json` and `legacy/README.md`.
