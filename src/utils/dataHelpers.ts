import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";
import { resolveUsername } from "@/utils/formatters";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => item.account.user_profile);
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query) return profiles;
  const normalizedQuery = query.toLowerCase();
  return profiles.filter((p) => {
    const matchUsername = resolveUsername(p).toLowerCase().includes(normalizedQuery);
    const matchFullname = p.fullname.toLowerCase().includes(normalizedQuery);
    return matchUsername || matchFullname;
  });
}

/**
 * Finds a profile summary from search data by matching the resolved username.
 * Used as a fallback when no dedicated profile JSON file exists.
 * Checks the preferred platform first, then the others.
 */
export function findProfileSummaryByUsername(
  username: string,
  preferredPlatform?: Platform
): { profile: UserProfileSummary; platform: Platform } | null {
  const platformOrder: Platform[] = preferredPlatform
    ? [preferredPlatform, ...PLATFORMS.filter((p) => p !== preferredPlatform)]
    : PLATFORMS;

  for (const platform of platformOrder) {
    const profiles = extractProfiles(platform);
    const match = profiles.find(
      (p) => resolveUsername(p).toLowerCase() === username.toLowerCase()
    );
    if (match) return { profile: match, platform };
  }
  return null;
}
