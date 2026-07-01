# Wobb Frontend Assignment — Influencer Search App

A premium, portfolio-grade influencer search and list builder application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. 

This application provides a dark-mode SaaS interface allowing marketers to discover, search, view analytics for, and shortlist creators across Instagram, YouTube, and TikTok.

---

## Status

🏆 **All Tasks 1–7 completed successfully.** The codebase is clean, well-tested, optimized for production performance, highly accessible, and visually redesigned.

- **Task 1: Code Quality & Bug Fixes** — ✅ COMPLETE
- **Task 2: UI Redesign (Premium Dark SaaS)** — ✅ COMPLETE
- **Task 3: Zustand State Migration** — ✅ COMPLETE
- **Task 4: Add to List Feature** — ✅ COMPLETE
- **Task 5: Codebase Refactoring** — ✅ COMPLETE
- **Task 6: Performance Optimization** — ✅ COMPLETE
- **Task 7: Test Suite Setup** — ✅ COMPLETE

---

## Quick Start

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run the development server
npm run dev

# 3. Open in your browser
# http://localhost:5173
```

---

## Core Features

- **Segmented Search Engine** — Search creators in real-time by username, full name, or handle across Instagram, YouTube, and TikTok.
- **Shortlist Builder ("My List")** — Add or remove creators from a persistent list (via Zustand store backed by local storage). Shortlist metrics are computed on the fly.
- **Interactive Analytics View** — Explore detailed stats cards showing followers, engagement rates, average views, total engagements, and demographic insights.
- **Robust CDN Fallback System** — Prevents broken profile pictures when YouTube CDN requests are blocked from localhost.
- **Refined Micro-Interactions** — Hover-state scale transformations, glowing borders, active state highlights, and toggle animation feedback.

---

## Bug Fixes & Refinements

During development and audits, several critical issues were resolved to elevate the app's stability, user experience, and visual fidelity:

### 1. YouTube Creator Profile Loader Failures
- **Issue:** Several YouTube creators (e.g. Vlad and Niki, CoComelon, PewDiePie) did not have a dedicated detail `.json` file in the profiles directory. Clicking on their cards resulted in a blank/error page because `ProfileDetailPage` could not read the profile.
- **Fix:** Implemented a robust fallback system in the detail page. If the dynamic profile file fetch fails, it searches the cached search summary lists using a helper utility. The page then dynamically renders using this summary data so every creator profile resolves beautifully.

### 2. Missing YouTube Username Field
- **Issue:** Several entries in the YouTube search JSON lacked a `username` field, having only `handle` and `custom_name` keys. This caused cards to show `@undefined` and broken navigation links to `/profile/undefined`.
- **Fix:** Created a `resolveUsername` formatter that falls back in priority: `handle` ➔ `custom_name` ➔ `username` ➔ `user_id`. Also added `resolveDisplayName` to show friendly handles (e.g. `@CoComelon` instead of `@checkgate`).

### 3. YouTube CDN Image Blocking (Hotlink Restriction)
- **Issue:** YouTube CDN domains (`yt3.googleusercontent.com`) block requests from `localhost` due to the `Referer` header checking, showing broken image icons.
- **Fix:** Implemented a custom `Avatar` component that applies `referrerPolicy="no-referrer"` to the image tags to skip origin reporting. It also includes an `onError` handler that automatically serves a personalized initials gradient placeholder if the image fails.

### 4. Stale Closures & Legacy State Bugs
- **Issue:** Click logging was one step behind due to state-capturing closures.
- **Fix:** Migrated search states and counter click states into a granular Zustand store, removing local hook synchronization logic.

---

## Design System & UX Redesign

The application was overhauled from a generic Tailwind layout to a premium dark mode SaaS dashboard with Linear-like aesthetics:

- **Color Palette:** Pure dark background (`#0D1117`), deep gray surfaces (`#161B22`), purple-to-pink gradient accents (`#7C3AED` to `#EC4899`), and clear status greens (`#3FB950`).
- **Typography:** Google Fonts' **Inter** loaded as the primary sans-serif face for clean readability.
- **Platform Badges:** Custom brand identities mapped dynamically (YouTube: red, TikTok: teal outline, Instagram: orange-to-purple gradient).
- **Responsive Layout:** CSS-in-JS properties bound dynamically to grid templates for fluid layouts on mobile, tablet, and desktop screens.
- **Skeleton Loaders:** CSS keyframe pulse animations represent loading states, preventing layout shift while assets are resolved.

---

## Technical Architecture & State

### State Management (Zustand)
- **Search Store:** Tracks selected platform, search inputs, and page-specific interactions.
- **Selected Profiles Store:** Manages list-builder selections (add, remove, clear all) with auto-persistence enabled using Zustand's `persist` middleware (backing data to `localStorage`).

### Performance Optimizations
- **Route-Based Code Splitting:** `react-router-dom` routes are split using `React.lazy` and `Suspense` wrapper modules.
- **Selective Memoization:** Handlers and selectors are memoized to prevent cascading re-renders during high-frequency keystroke typing.
- **Granular Selectors:** Zustand hooks select slice-level values only, avoiding unnecessary global component updates.

### Test Suite (Vitest + JSDOM)
Includes a fully configured testing environment to guarantee logic stability:
- `vitest` runs unit tests in a simulated browser environment.
- Tests verify store state persistence, filtering logic, and formatters.

---

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts the Vite dev server at `http://localhost:5173` |
| `npm run build` | Compiles TypeScript and runs the production rollup compiler |
| `npm run lint` | Code analysis check using ESLint |
| `npm run test` | Starts the Vitest unit test runner |
