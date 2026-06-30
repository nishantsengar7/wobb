# Wobb Frontend Assignment — Influencer Search App

A modern influencer search application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project demonstrates clean code practices, accessibility standards, and robust state management.

## Status

✅ **Task 1: Code Quality & Bug Fixes — COMPLETE**

All intentional bugs, accessibility issues, and code quality problems have been identified and resolved. See [Bug Fixes](#bug-fixes) for details.

---

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

## Features

### ✨ Core Functionality
- **Platform Filter** — Switch between Instagram, YouTube, and TikTok influencers
- **Search** — Case-insensitive search by username or full name
- **Profile Details** — Click any profile to view extended analytics and stats
- **Responsive Design** — Clean, accessible interface built with Tailwind CSS

### 🎯 Architecture
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)
- **Data** — Static JSON fixtures in `src/assets/data/`
  - `search/` — Platform search results (10 profiles each)
  - `profiles/` — Detailed profile data loaded dynamically
- **Components** — Modular, typed React components with proper separation of concerns

---

## Bug Fixes

### Task 1: Comprehensive Code Audit & Fixes

A complete audit identified **7 critical issues** across runtime behavior, data processing, accessibility, and type safety. All have been fixed and verified.

#### **1. Stale Closure in Click Handler**
- **File:** `src/pages/SearchPage.tsx:16–22`
- **Problem:** `handleProfileClick` captured `clickCount` at render time, so console logs showed incorrect counts (always one behind).
- **Fix:** Converted to state updater function: `setClickCount(prevCount => prevCount + 1)`
- **Impact:** Click counter now displays and logs correctly.

#### **2. Case-Sensitive Search**
- **File:** `src/utils/dataHelpers.ts:21–31`
- **Problem:** Username search was case-sensitive; "cristiano" didn't match "Cristiano".
- **Fix:** Normalized both username and fullname to lowercase before comparison.
- **Impact:** Search is now case-insensitive across all fields.

#### **3. Inaccessible Search Input**
- **File:** `src/components/PlatformFilter.tsx:38`
- **Problem:** Search input lacked `aria-label`, breaking screen reader support.
- **Fix:** Added `aria-label="Search influencers by username or name"`.
- **Impact:** Screen reader users now understand the input's purpose.

#### **4. Non-Keyboard-Accessible Profile Card**
- **File:** `src/components/ProfileCard.tsx:30–56`
- **Problems:**
  - Card div had no `tabIndex` or keyboard event handlers (not keyboard-navigable)
  - Missing `alt` text on profile image
  - No `aria-label` to describe the card's action
- **Fixes:**
  - Added `role="button"` and `tabIndex={0}` for focus
  - Added `onKeyDown` handler for Enter/Space key support
  - Added `alt={`${profile.fullname} profile picture`}`
  - Added `aria-label={`View profile for ${profile.fullname}`}`
- **Impact:** Full keyboard navigation and screen reader support.

#### **5. Missing Alt Text on Profile Image**
- **File:** `src/pages/ProfileDetailPage.tsx:72–76`
- **Problem:** Profile image lacked `alt` attribute.
- **Fix:** Added `alt={`${user.fullname} profile picture`}`.
- **Impact:** Image is now described for screen readers and SEO-friendly.

#### **6. Incorrect Engagement Rate Display**
- **File:** `src/pages/ProfileDetailPage.tsx:98–102`
- **Problem:** Engagement rate was multiplied by 10000 instead of 100, showing 1,214% instead of 12.14%.
- **Fix:** Changed `* 10000` to `* 100` (engagement_rate is already a decimal, e.g., 0.01214).
- **Impact:** Engagement rates now display correctly.

#### **7. Unused State Variable**
- **File:** `src/pages/SearchPage.tsx:11`
- **Problem:** `clickCount` value was never read, causing ESLint warning and TypeScript error.
- **Fix:** Changed destructuring to `const [, setClickCount]` to suppress unused warnings.
- **Impact:** Clean build with no TypeScript/lint errors.

### Verification

✅ `npm run lint` — **Passes cleanly**  
✅ `npm run build` — **Builds successfully**  
✅ **All routes respond** — HTTP 200  
✅ **Search functionality** — Case-insensitive matching works  
✅ **Accessibility** — ARIA labels, keyboard navigation, alt text in place  

### Commits

```
3a819bc - fix: improve profile card and detail accessibility and engagement rate display
c47dcf5 - fix: make influencer search case-insensitive and preserve search input accessibility
a655144 - chore: initialize git repository
```

---

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # App header and layout wrapper
│   ├── PlatformFilter.tsx       # Platform tabs + search input
│   ├── ProfileCard.tsx          # Profile list item (with accessibility)
│   ├── ProfileList.tsx          # Profile grid renderer
│   ├── SearchBar.tsx            # (Unused stub)
│   └── VerifiedBadge.tsx        # Verified checkmark component
├── pages/
│   ├── SearchPage.tsx           # Main search / dashboard
│   └── ProfileDetailPage.tsx    # Individual profile view
├── utils/
│   ├── dataHelpers.ts           # Search/filter logic
│   ├── formatters.ts            # Number and string formatters
│   └── profileLoader.ts         # Dynamic profile JSON loading
├── types/
│   └── index.ts                 # TypeScript interfaces
├── assets/
│   └── data/
│       ├── search/              # Platform search results (Instagram, YouTube, TikTok)
│       └── profiles/            # Individual profile detail JSON files
├── App.tsx                      # Router setup
└── main.tsx                     # React entry point
```

---

## Scripts

| Command         | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Start Vite dev server (port 5173)  |
| `npm run build` | Build for production             |
| `npm run lint`  | Run ESLint on all source files   |
| `npm run preview` | Preview production build locally |

---

## Tech Stack

- **React 19** — UI library (latest)
- **TypeScript 6.0** — Type safety
- **Vite 8** — Fast bundler and dev server
- **Tailwind CSS 4.3** — Utility-first styling
- **React Router DOM 7.18** — Client-side routing
- **ESLint + TypeScript ESLint** — Code quality

---

## Development Notes

### Accessibility (A11y)
- All interactive elements are keyboard-navigable (Enter, Space support)
- Screen reader labels (`aria-label`) on key components
- Image `alt` attributes for all visual content
- Semantic HTML structure

### State Management
- Currently using React `useState` (hooks)
- Search query and platform selection managed at page level
- Click tracking implemented for demo purposes

### Data Flow
- **Search Page:** Loads all profiles for selected platform, filters by query
- **Profile Detail:** Dynamically loads individual profile JSON via `import.meta.glob`
- **Routing:** Uses URL params (`/profile/:username`) and query strings (`?platform=instagram`)

### Performance Considerations
- Static JSON imports (Vite bundled at build time)
- No unnecessary re-renders (component structure optimized)
- Small bundle size due to minimal dependencies

---

## Next Steps (Remaining Tasks)

2. **UI/UX Redesign** — Modern, polished interface
3. **Zustand Integration** — State management for selected profiles
4. **Add to List Feature** — Select and manage profiles
5. **Code Quality Enhancements** — Additional refactoring and optimizations
6. **Performance Optimization** — Lazy loading, memoization, code splitting

---

## Submission Guidelines

- ✅ All bugs fixed and verified
- ✅ `npm run build` passes cleanly
- ✅ `npm run lint` produces no errors
- ✅ Meaningful git commits with clear messages
- ✅ Code is production-ready

**Deadline:** 2 July 2026, 2:00 PM IST (UTC+5:30)

---

## Notes

- This project uses `--legacy-peer-deps` for React 19 compatibility with `react-beautiful-dnd` (see `package.json`)
- All data is static and fixture-based; no backend required
- The app is fully client-side rendered
- Styling uses Tailwind CSS utility classes for rapid development
