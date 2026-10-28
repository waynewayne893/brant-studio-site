# Brant Studio — public site source

This repository contains the static-site source for the public website:

- Production site: https://brant-studio.pages.dev/
- Source scope: `apps/public-site/` only
- The private backend, admin UI, database, deployment controls and internal
  reports are intentionally **not** included.

## Build

Requires Node.js 20+; no npm dependencies are required for the static build.

```powershell
$env:PUBLIC_BASE_URL = 'https://brant-studio.pages.dev'
node apps/public-site/build.mjs
```

Output:

```text
apps/public-site/dist/
  20 routes / 34 files
```

Or:

```powershell
npm run build
```

## What this is

A small static-site generator that renders the public bilingual pages,
journal samples, metadata, canonical/hreflang links, sitemap, robots and 404.
It uses only Node.js built-in modules and the files in `apps/public-site/`.

## What this is not

- Not the private CMS/admin backend.
- Not the database, authentication or release system.
- Not a deployment credential store.
- Not a source for user data or private analytics.

## License

See `LICENSE` and `ASSET_NOTICE.md`. The default is All Rights Reserved; no
open-source license is granted until the owner explicitly changes it.
