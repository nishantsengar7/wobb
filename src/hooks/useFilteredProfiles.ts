import { useSearchStore } from "@/store/searchStore";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function useFilteredProfiles() {
  const platform = useSearchStore((state) => state.platform);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  return {
    platform,
    allProfiles,
    filtered,
  };
}
