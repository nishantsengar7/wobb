import { describe, it, expect, beforeEach } from "vitest";
import { useSelectedProfilesStore, type SelectedProfile } from "../store/selectedProfilesStore";

const mockProfile: SelectedProfile = {
  id: "instagram:testuser",
  userId: "123",
  username: "testuser",
  fullName: "Test User",
  platform: "instagram",
  avatar: "avatar.jpg",
  followers: 5000,
  keyStatLabel: "Followers",
  keyStatValue: "5K",
  addedAt: new Date().toISOString(),
};

describe("selectedProfilesStore", () => {
  beforeEach(() => {
    useSelectedProfilesStore.getState().clearProfiles();
  });

  it("should add a profile to the list", () => {
    const store = useSelectedProfilesStore.getState();
    store.addProfile(mockProfile);
    expect(useSelectedProfilesStore.getState().items).toHaveLength(1);
    expect(useSelectedProfilesStore.getState().items[0].id).toBe(mockProfile.id);
  });

  it("should prevent duplicate profile additions", () => {
    const store = useSelectedProfilesStore.getState();
    store.addProfile(mockProfile);
    store.addProfile(mockProfile);
    expect(useSelectedProfilesStore.getState().items).toHaveLength(1);
  });

  it("should remove a profile from the list", () => {
    const store = useSelectedProfilesStore.getState();
    store.addProfile(mockProfile);
    store.removeProfile(mockProfile.id);
    expect(useSelectedProfilesStore.getState().items).toHaveLength(0);
  });

  it("should toggle selection state of a profile", () => {
    const store = useSelectedProfilesStore.getState();
    store.toggleProfile(mockProfile);
    expect(useSelectedProfilesStore.getState().items).toHaveLength(1);
    store.toggleProfile(mockProfile);
    expect(useSelectedProfilesStore.getState().items).toHaveLength(0);
  });
});
