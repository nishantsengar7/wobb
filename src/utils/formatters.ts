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
 * Resolves the best available identifier for a profile.
 * Some YouTube accounts are missing the `username` field; falls back to
 * handle → custom_name → user_id so cards always render correctly.
 */
export function resolveUsername(
  profile: Pick<UserProfileSummary, "username" | "handle" | "custom_name" | "user_id">
): string {
  return profile.username ?? profile.handle ?? profile.custom_name ?? profile.user_id;
}
