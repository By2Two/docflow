# DocFlow

A web app for creating and exporting structured process documentation as PDF. Part of the [bytwo](https://bytwo.com) suite.

## What it does

DocFlow lets you build process documents by adding and arranging content blocks (text, steps, tables, timelines) and export them as a formatted PDF. Everything runs in the browser; no server needed for document generation.

## Tech stack

- **Angular 20** - standalone components, signals

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
 