import { create } from "zustand";
import type { Platform } from "@/types";

interface SearchState {
  platform: Platform;
  searchQuery: string;
  profileClickCount: number;
}

interface SearchActions {
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  recordProfileClick: (username: string) => void;
}

type SearchStore = SearchState & SearchActions;

export const useSearchStore = create<SearchStore>((set) => ({
  platform: "instagram",
  searchQuery: "",
  profileClickCount: 0,
  setPlatform: (platform) =>
    set({
      platform,
      searchQuery: "",
    }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  recordProfileClick: (username) =>
    set((state) => {
      const profileClickCount = state.profileClickCount + 1;
      console.log("Clicked profile:", username, "total clicks:", profileClickCount);

      return { profileClickCount };
    }),
}));
