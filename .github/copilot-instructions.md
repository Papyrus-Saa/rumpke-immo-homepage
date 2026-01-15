# Copilot Instructions for Rumpke Immo Homepage

## Project Overview
- This is a Next.js (App Router) TypeScript project for a real estate platform, with both public and admin interfaces.
- The codebase is organized under `src/app/` with clear separation between public pages (e.g., `immobilien/`) and admin dashboard (`admin/`).
- Data models and interfaces are in `src/hooks/interfaces/`.
- API routes are in `src/app/api/` and follow RESTful conventions.

## Key Patterns & Conventions
- **Component Structure:**
  - UI components are in `src/components/` and `src/app/admin/components/`.
  - Use functional React components and hooks. Prefer colocating component-specific logic and styles.
  - Admin features are modularized by domain (e.g., `agents/`, `properties/`, `categories/`).
- **Styling:**
  - Use CSS modules or global styles in `globals.css`. Some components have their own `.css` files.
- **State Management:**
  - Uses React Context (see `src/context/`) and custom hooks (see `src/app/admin/hooks/`, `src/context/hooks/`).
  - UI state is managed in `src/store/ui/`.
- **Data Fetching:**
  - Uses React Query (see `ReactQueryProvider.tsx`).
  - API endpoints are under `src/app/api/`.
- **Type Safety:**
  - All data models/interfaces are TypeScript (`.ts`/`.tsx`).
  - Always import and use types from `src/hooks/interfaces/`.

## Developer Workflows
- **Development:**
  - Copy `.env.template` to `.env` and set environment variables.
  - Install dependencies: `npm install`
  - Start database: `docker compose up -d`
  - Run dev server: `npm run dev`
- **Testing:**
  - No explicit test setup found; add tests in `__tests__/` or alongside components if needed.
- **Linting/Formatting:**
  - Lint config: `eslint.config.mjs`. Run `npx eslint .`.
  - Format with Prettier if configured.

## Integration & Data Flow
- **Admin and Public Separation:**
  - Admin dashboard (`src/app/admin/`) is isolated from public pages.
  - Shared logic/components should be placed in `src/components/` or `src/hooks/`.
- **API Communication:**
  - Use fetch/React Query to interact with backend via `/api/` routes.
  - Data models must match interfaces in `src/hooks/interfaces/`.

## Examples
- To add a new property type, update `src/hooks/interfaces/property-interface.ts` and relevant admin components.
- For a new admin feature, create a folder in `src/app/admin/` and follow the modular structure.

## References
- Main entry: `src/app/layout.tsx`
- Admin entry: `src/app/admin/layout.tsx`
- Data models: `src/hooks/interfaces/`
- API: `src/app/api/`
- State/context: `src/context/`, `src/store/ui/`

---
For questions, check the README or ask a maintainer.
