import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { MyListPage } from "@/pages/MyListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/list" element={<MyListPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
