# OmniStore Base Template

> The canonical Next.js 16 storefront starter for every OmniStore store.
> Base version: `1.0.0` · Stack: Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript 5
> License: MIT

## Sacred Layer (Never edit via CMS or AI tools)
- `app/` — All page routes
- `lib/` — API client, section resolver, utilities
- `context/` — React providers
- `hooks/` — Shared hooks
- `middleware.ts` — Multi-tenant resolver

## Editable Layer
- `components/theme/` — Header, Footer, ProductCard (Miordr templates override here)
- `components/sections/` — Section blocks (AI Editor and CMS Section Editor write here)

## Environment Variables
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_STORE_ID` | Store UUID |
| `NEXT_PUBLIC_STORE_SLUG` | Store slug |
