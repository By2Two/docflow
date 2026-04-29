# DocFlow

A web app for creating and exporting structured process documentation as PDF. Part of the [bytwo](https://bytwo.com) suite.

## What it does

DocFlow lets you build process documents by adding and arranging content blocks (text, steps, tables, timelines) and export them as a formatted PDF. Everything runs in the browser; no server needed for document generation.

## Tech stack

- **Angular 20** - standalone components, signals
- **jsPDF** - client-side PDF generation
- **Supabase** - authentication
- **GitHub Pages** - hosting

## Architecture

```
src/
  app/
    components/     # UI components (block, sidebar, timeline, pdf-preview, header)
    services/       # document, pdf, supabase, locale, toast
    models/         # block data model
    i18n/           # PT/EN translations
  environments/     # generated at build time from .env, not committed
```

Authentication is handled by Supabase. Environment variables are injected at build time via `scripts/generate-env.js`, which reads from a local `.env` file or from CI secrets.
 
## Deploy

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages automatically. Supabase credentials are stored as repository secrets (`SUPABASE_URL`, `SUPABASE_KEY`).
