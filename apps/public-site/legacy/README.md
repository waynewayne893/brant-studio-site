# Legacy source copy

This directory is a frozen, hash-verified copy of the original site source and
assets used by the static generator. It is not edited by hand.

- `provenance.json` records the source manifest.
- `package.json` marks this directory as an ESM package for Node imports.
- The frozen baseline remains unchanged.

The public source repository includes this copy because `build.mjs` uses its
pure render/content functions to generate static pages.
