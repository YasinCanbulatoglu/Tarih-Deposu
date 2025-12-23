# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repository is a small full-stack monorepo:
- **Frontend**: Next.js App Router app in `frontend/` (TypeScript, React, Tailwind CSS v4 via `@tailwindcss/postcss`).
- **Backend**: Express + PostgreSQL API in `backend/`.

The frontend consumes the backend over HTTP (`http://localhost:5000/api/...`) to display and manage historical events.

## Common Commands

All commands are intended to be run from the repo root unless otherwise noted.

### Install dependencies

- Frontend:
  - `cd frontend && npm install`
- Backend:
  - `cd backend && npm install`

### Run the backend (Express API)

The backend server entrypoint is `backend/server.js`.

- Start once (no reload):
  - `cd backend && node server.js`
- Start with auto-reload via `nodemon` (installed as a dev dependency):
  - `cd backend && npx nodemon server.js`

The backend listens on port `5000` by default (see `server.js` and `.env/config.env`).

### Run the frontend (Next.js dev server)

- Start development server:
  - `cd frontend && npm run dev`

This runs Next.js on port `3000` by default. Open `http://localhost:3000` in a browser.

### Build and run the frontend in production mode

- Build:
  - `cd frontend && npm run build`
- Start after build:
  - `cd frontend && npm run start`

### Linting (frontend)

ESLint is configured only for the frontend (via `eslint.config.mjs`).

- Lint all frontend code:
  - `cd frontend && npm run lint`

### Tests

There is **no automated test suite configured** in this repository:
- `backend/package.json` defines a placeholder `npm test` script that exits with an error.
- `frontend/package.json` does not define any test scripts.

Before adding instructions for running individual tests, introduce a test framework (for example Jest, Vitest, or Playwright) and corresponding `test` scripts in the relevant `package.json`.

## Backend Architecture (`backend/`)

### Tech stack

- **Runtime**: Node.js, CommonJS modules.
- **Framework**: Express.
- **Database**: PostgreSQL via the `pg` client library.
- **Dev tooling**: `nodemon` for hot-reload in development.

### Configuration

- `backend/server.js` currently constructs a `pg.Pool` with hard-coded connection parameters (user, host, database, password, port).
- There is an `.env/config.env` file with variables like `DB_USER`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT`, and `PORT`, but `server.js` does **not** yet read from this file.
  - Any change to DB credentials must currently be reflected directly in `server.js`.

### API surface

All routes are mounted directly on the Express app (no router modules):

- `GET /api/events`
  - Returns all rows from `events` ordered by `date_year ASC`.
- `GET /api/events/:slug`
  - Looks up a single event by `slug`.
  - Responds with `404` and `{ error: "Olay bulunamadı" }` if not found.
- `POST /api/events`
  - Expects a JSON body with:
    - `title`, `slug`, `short_description`, `details`,
    - `date_day`, `date_month`, `date_year`,
    - `era`, `category`, `cover_image`.
  - Inserts a new row into the `events` table using those fields.
- `DELETE /api/events/:id`
  - Deletes an event by numeric `id`.

The backend assumes a PostgreSQL `events` table with columns matching the fields used in queries above; see `backend/server.js` for the authoritative list of column names.

## Frontend Architecture (`frontend/`)

### Tech stack

- **Framework**: Next.js 16 with the **App Router** (routes under `app/`).
- **Language**: TypeScript with `strict` enabled in `tsconfig.json`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`, with global styles in `app/globals.css`.
- **Images**: Configured in `next.config.ts` to allow remote images from any HTTP/HTTPS host.
- **Linting**: Configured via `eslint.config.mjs` using Next.js Core Web Vitals + TypeScript presets.

### Data flow and pages

Data for historical events comes exclusively from the backend API at `http://localhost:5000/api/events` and `http://localhost:5000/api/events/:slug`.

Key routes under `frontend/app/`:

- `app/layout.tsx`
  - Defines the root layout, imports `globals.css`, and sets base fonts using `next/font` (Geist).
  - Sets metadata (`title`, `description`) for the site.

- `app/page.tsx` (home page)
  - Client component.
  - Manages **dark mode** by toggling a `dark` class on `document.documentElement`.
  - On mount, fetches all events from `GET /api/events` and maps them into a `StoryCard` view model used for the "Son Eklenen Olaylar" section.
  - Renders:
    - Hero section with a motivation quote and CTA.
    - "Popüler Olaylar" marquee: uses a static list of featured events and links to `/olay/[slug]`.
    - "Tarihsel Dönemler" overview cards (static definitions).
    - "Son Eklenen Olaylar" grid: cards that link to `/olay/[slug]` per event.

- `app/depo/page.tsx` (archive view)
  - Client component.
  - Fetches the full event list from `GET /api/events` on mount and stores it in `allEvents`.
  - Provides two main filters:
    - **Search**: `searchTerm` filter on `title` and `short_description`.
    - **Calendar**: interactive month/year/day selector; filters events by `date_day`, `date_month`, and `date_year` matching the currently selected calendar date.
  - Uses a custom calendar grid computed locally (no external calendar library).
  - Displays filtered events as cards linking to `/olay/[slug]`.
  - Manages dark mode similarly to the home page, including initial theme detection.

- `app/olay/[slug]/page.tsx` (event detail)
  - Client component that uses the new Next.js App Router pattern where route `params` are passed as a `Promise` and unwrapped via `use`.
  - Resolves `slug` from params and fetches a single event from `GET /api/events/:slug`.
  - Shows:
    - A large hero banner with the event cover image, title, era, and date.
    - The short description as a highlighted lead paragraph.
    - Full event content rendered via `dangerouslySetInnerHTML` from `event.details` (the backend stores HTML in this field).
  - If the fetch fails or returns nothing, shows a friendly "Olay Bulunamadı" screen with a link back to home.

- `app/admin/page.tsx` (admin / author panel)
  - Client component providing a simple CRUD interface for events:
    - **List**: fetches `GET /api/events` and lists existing events with `title`, `slug`, and `date_year`.
    - **Create**: a form bound to the same fields expected by `POST /api/events` (including `date_day`, `date_month`, `date_year`, `era`, `category`, `cover_image`, `short_description`, `details`).
    - **Delete**: calls `DELETE /api/events/:id` from the list view and refreshes data.
  - On successful creation, resets the form and refetches the events.

- `app/hakkinda/page.tsx` (about page)
  - Client component explaining the purpose of "Tarih Deposu" and displaying some static metrics and mission/vision content.
  - Shares the same navigation and dark-mode behavior as other main pages.

### Styling and theming

- Global styles live in `app/globals.css`:
  - Tailwind is imported with `@import "tailwindcss";` and fonts are wired via CSS variables.
  - A custom `dark` variant is defined with `@custom-variant dark (&:where(.dark, .dark *));`.
  - Additional keyframes and classes (e.g., `.animate-marquee`) support custom animations used on the home page.
- Dark mode is implemented manually per page by toggling the `dark` class on the root `<html>` element; there is no central theme provider yet.

### TypeScript configuration

- `tsconfig.json` enables `strict` type checking, `noEmit`, and configures module resolution for Next.js.
- A path alias `@/*` points to the frontend root (`frontend/`), but current code mostly uses relative imports.

## How pieces fit together

- The **backend** exposes a minimal REST API around a single `events` table.
- The **frontend** treats this API as the source of truth for all dynamic content:
  - Home (`/`) uses it for "Son Eklenen Olaylar".
  - Archive (`/depo`) uses it for calendar- and search-based filtering.
  - Detail (`/olay/[slug]`) uses it to pull a single event by `slug`.
  - Admin (`/admin`) uses it for create/list/delete operations.
- All pages that depend on events currently fetch client-side using `fetch('http://localhost:5000/...')`; there is no server-side data fetching yet (no `fetch` in Server Components).

When extending the application, keep the backend route contracts (`/api/events`, `/api/events/:slug`, and the expected payload fields) in sync with the types and forms defined in the frontend pages described above.