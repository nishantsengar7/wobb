import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";
import { formatEngagementRate, formatFollowers, resolveUsername } from "@/utils/formatters";

export interface SelectedProfile {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  platform: Platform;
  avatar: string;
  followers: number;
  engagementRate?: number;
  avgViews?: number;
  profileUrl?: string;
  keyStatLabel: string;
  keyStatValue: string;
  addedAt: string;
}

interface SelectedProfilesState {
  items: SelectedProfile[];
}

interface SelectedProfilesActions {
  addProfile: (profile: SelectedProfile) => void;
  removeProfile: (id: string) => void;
  toggleProfile: (profile: SelectedProfile) => void;
  clearProfiles: () => void;
  isSelected: (id: string) => boolean;
}

type SelectedProfilesStore = SelectedProfilesState & SelectedProfilesActions;

export function getSelectedProfileId(
  profile: Pick<UserProfileSummary, "user_id" | "username" | "handle" | "custom_name">,
  platform: Platform
) {
  return `${platform}:${resolveUsername(profile)}`;
}

export function createSelectedProfile(
  profile: UserProfileSummary,
  platform: Platform
): SelectedProfile {
  const hasEngagement = profile.engagement_rate !== undefined;

  return {
    id: getSelectedProfileId(profile, platform),
    userId: profile.user_id,
    username: resolveUsername(profile),
    fullName: profile.fullname,
    platform,
    avatar: profile.picture,
    followers: profile.followers,
    engagementRate: profile.engagement_rate,
    avgViews: profile.avg_views,
    profileUrl: profile.url,
    keyStatLabel: hasEngagement ? "Engagement" : "Followers",
    keyStatValue: hasEngagement
      ? formatEngagementRate(profile.engagement_rate)
      : formatFollowers(profile.followers),
    addedAt: new Date().toISOString(),
  };
}

export const useSelectedProfilesStore = create<SelectedProfilesStore>()(
  persist(
    (set, get) => ({
      items: [],
      addProfile: (profile) =>
        set((state) => {
          if (state.items.some((item) => item.id === profile.id)) {
            return state;
          }

          return { items: [...state.items, profile] };
        }),
      removeProfile: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleProfile: (profile) =>
        set((state) => {
          const isSelected = state.items.some((item) => item.id === profile.id);

          if (isSelected) {
            return {
              items: state.items.filter((item) => item.id !== profile.id),
            };
          }

          return { items: [...state.items, profile] };
        }),
      clearProfiles: () => set({ items: [] }),
      isSelected: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "influencer-search-selected-profiles",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
