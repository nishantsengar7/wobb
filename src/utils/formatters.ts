import type { UserProfileSummary } from "@/types";

export function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

/**
 * Resolves a stable unique identifier for routing/dedup purposes.
 * Prefers handle → custom_name → username → user_id.
 * Used for URLs and store keys.
 */
export function resolveUsername(
  profile: Pick<UserProfileSummary, "username" | "handle" | "custom_name" | "user_id">
): string {
  return profile.handle ?? profile.custom_name ?? profile.username ?? profile.user_id;
}

/**
 * Resolves the best human-readable display name for the @handle shown in the UI.
 * Prefers custom_name (e.g. "CoComelon") over the raw username (e.g. "checkgate").
 */
export function resolveDisplayName(
  profile: Pick<UserProfileSummary, "username" | "handle" | "custom_name" | "user_id">
): string {
  return profile.custom_name ?? profile.handle ?? profile.username ?? profile.user_id;
}

