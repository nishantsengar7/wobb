import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const SearchPage = lazy(() => import("@/pages/SearchPage").then(module => ({ default: module.SearchPage })));
const MyListPage = lazy(() => import("@/pages/MyListPage").then(module => ({ default: module.MyListPage })));
const ProfileDetailPage = lazy(() => import("@/pages/ProfileDetailPage").then(module => ({ default: module.ProfileDetailPage })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
          ⏳ Loading...
        </div>
      }>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/list" element={<MyListPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
