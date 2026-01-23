
# Copilot Instructions for Rumpke Immo Homepage

## Project Architecture
- Next.js (App Router) with TypeScript for a real estate platform.
- Public pages under `src/app/immobilien/`, admin dashboard under `src/app/admin/`.
- Data models/interfaces: `src/hooks/interfaces/` (always use these for type safety).
- API routes: `src/app/api/` (RESTful, match interfaces).

## Key Patterns & Conventions
- **Components:**
  - UI: `src/components/` (shared), `src/app/admin/components/` (admin-specific).
  - Functional React components and hooks; colocate logic/styles when possible.
  - Admin features modularized by domain (e.g., `agents/`, `properties/`).
- **Styling:**
  - Use CSS modules or global styles (`globals.css`). Component-level `.css` files allowed.
- **State Management:**
  - React Context (`src/context/`), custom hooks (`src/app/admin/hooks/`, `src/context/hooks/`).
  - UI state: `src/store/ui/`.
- **Data Fetching:**
  - React Query (`src/app/providers/ReactQueryProvider.tsx`).
  - API endpoints: `/api/` (use fetch/React Query).
- **Type Safety:**
  - All models/interfaces are TypeScript. Import from `src/hooks/interfaces/`.

## Developer Workflows
- **Setup:**
  - Copy `.env.template` to `.env` and configure variables.
  - Install: `npm install`
  - Start DB: `docker compose up -d`
  - Dev server: `npm run dev`
- **Linting/Formatting:**
  - Lint: `npx eslint .` (config: `eslint.config.mjs`)
  - Format: Prettier (if configured)
- **Testing:**
  - No test setup found; add tests in `__tests__/` or next to components if needed.

## Integration & Data Flow
- **Admin/Public Separation:**
  - Admin: `src/app/admin/` (isolated)
  - Public: `src/app/immobilien/`
  - Shared logic/components: `src/components/`, `src/hooks/`
- **API Communication:**
  - Use fetch/React Query for `/api/` routes
  - Data models must match `src/hooks/interfaces/`
- **Cross-component Communication:**
  - Use context/hooks for shared state (see `src/context/`, `src/store/ui/`)

## Examples
- Add property type: update `src/hooks/interfaces/property-interface.ts` and admin components.
- New admin feature: create folder in `src/app/admin/` (modular structure).
- Shared UI: place in `src/components/`.

## References
- Main entry: `src/app/layout.tsx`
- Admin entry: `src/app/admin/layout.tsx`
- Data models: `src/hooks/interfaces/`
- API: `src/app/api/`
- State/context: `src/context/`, `src/store/ui/`

---
For questions, check the README or ask a maintainer.
