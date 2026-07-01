# Influencer Search & Shortlist Builder (Wobb Frontend Assignment)

A premium, highly-optimized influencer search and shortlist management application built using **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. 

This app allows marketing teams to discover creators across YouTube, Instagram, and TikTok, inspect detailed engagement analytics, and curate shortlists that persist across sessions.

---

## 🚀 Live Demo & Getting Started

* **Live Deployment**: [wobb-three.vercel.app](https://wobb-three.vercel.app/) *(or your actual Vercel deployment URL)*
* **Local Preview**:
  ```bash
  # Clone the repository
  git clone https://github.com/nishantsengar7/wobb.git
  cd wobb

  # Install dependencies (React 19 compatible)
  npm install

  # Run development server
  npm run dev
  ```

---

## 🛠️ Summary of Completed Tasks

### 1. Bug Fixes & Code Quality Audit
* **Stale Closure Click Counters**: Fixed state closure capture traps on search interactions by adopting proper functional state updates (`setClickCount(prev => prev + 1)`).
* **Case-Insensitive Search**: Normalised search parameters, resolving a bug where title-cased profiles (e.g., "Cristiano") failed to match lowercase inputs.
* **YouTube Profile Loader Failures**: Added fallback mechanisms to search index files for creators lacking detailed profile JSON configurations (e.g. Vlad and Niki, Cocomelon).
* **YouTube Image Referrer Blocks**: Embedded `referrerPolicy="no-referrer"` on images to bypass YouTube's localhost origin restrictions. Added a fallback gradient initials avatar system if images are broken.

### 2. UI/UX Overhaul
* **Premium Dark Mode Layout**: Implemented a modern dark SaaS interface (`#0D1117` base / `#161B22` elevated surfaces) with violet-pink brand gradients.
* **Platform Customisation**: Visual identifiers change contextually based on the active platform (TikTok teal, YouTube red, Instagram gradient).
* **Skeleton Loading Screens**: Designed CSS-based skeletal load states to eliminate layout shift while profile assets compile.

### 3. Zustand State Migration
* **Store Splitting**: Replaced native React Context with two focused Zustand stores (`useSearchStore` and `useSelectedProfilesStore`).
* **Persistence Layer**: Integrated Zustand's `persist` middleware to back shortlist state into `localStorage` automatically.

### 4. "Add to List" Feature
* **Deduplication Check**: Prevents duplicate insertions by checking the unique composite ID (`${platform}:${username}`).
* **Micro-interactions**: Compact checkmark badges on list items toggle state and scale up on click. The selection detail syncs globally across the Search dashboard, Profile detail pages, and the dedicated shortlists screen.

### 5. Architectural Refactoring
* **Feature-Based Organization**: Restructured codebase into explicit layers: `components/ui/`, `components/layout/`, `hooks/`, `store/`, `types/`, and `utils/`.
* **Custom Hooks**: Extracted filtration logic into `useFilteredProfiles` to keep the presentation views clean.

### 6. Performance Optimization
* **Route Code-Splitting**: Wrapped routes with `React.lazy` and React `Suspense` for lighter bundle chunks.
* **Memoization Strategy**: Implemented `useMemo` for derived lists and complex state selectors to avoid unnecessary re-renders.

### 7. Automated Testing
* **Unit Test Suite**: Configured `vitest` + `jsdom` + `@testing-library/react` to test store persistence, deduplication logic, and string formatting helpers.

---

## 📦 Libraries Added & Trade-Offs

| Library | Purpose | Trade-off / Rationale |
|---|---|---|
| **Zustand** | Global state management & local storage syncing | Minimal boilerplate compared to Redux, cleaner selector patterns than React Context. |
| **Vitest** | Fast unit testing engine | Replaces heavier Jest setups with zero-config Vite integration. |
| **jsdom** | Virtual browser environment for tests | Lightweight in-memory DOM simulation; saves time over heavy headless browsers. |
| **@testing-library/react** | Component mounting & rendering tests | Tests consumer behavior rather than internal state changes. |

---

## 💡 Engineering Assumptions & Trade-Offs

### Assumptions
* **Identifier Mapping**: YouTube usernames are sometimes missing from the original payload. The app resolves handles and custom names in priority (`handle` ➔ `custom_name` ➔ `username` ➔ `user_id`) to ensure unique, queryable profile routes.
* **Mock Environment**: Local JSON fixtures are treated as static endpoints. Dynamic detail loader lookups fallback to search lists when detailed fixtures are unavailable.

### Trade-offs
* **Local Storage Cache**: Shortlists are persisted inside the browser's `localStorage` for simplicity. A production implementation would write these collections to a relational database through a secure backend API.
* **List Virtualization**: Skipped list virtualization (`react-window`) since the current layout payload is tiny (~10 profiles per platform). If scaling to 10,000+ items, virtualization would be implemented to preserve DOM node budgets.

---

## 🚀 Future Improvements (With More Time)
* **Real-time API Integration**: Swap static JSON imports for a real-time Express/GraphQL server query system.
* **E2E Testing Suite**: Implement Playwright for comprehensive user flow and shortlist behavior tests across simulated device viewports.
* **Framer Motion Integration**: Add fluid transitions for card entries, tab switches, and page changes.
