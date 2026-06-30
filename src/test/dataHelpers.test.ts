import { describe, it, expect } from "vitest";
import { filterProfiles } from "../utils/dataHelpers";
import type { UserProfileSummary } from "../types";

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "mrbeast",
    fullname: "Jimmy Donaldson",
    url: "https://youtube.com/mrbeast",
    picture: "mrbeast.jpg",
    is_verified: true,
    followers: 240000000,
  },
  {
    user_id: "2",
    username: "cristiano",
    fullname: "Cristiano Ronaldo",
    url: "https://instagram.com/cristiano",
    picture: "cristiano.jpg",
    is_verified: true,
    followers: 620000000,
  },
];

describe("dataHelpers filterProfiles", () => {
  it("should return all profiles if query is empty", () => {
    const result = filterProfiles(mockProfiles, "");
    expect(result).toHaveLength(2);
  });

  it("should match profiles by username case-insensitively", () => {
    const result = filterProfiles(mockProfiles, "BEAST");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("mrbeast");
  });

  it("should match profiles by fullname case-insensitively", () => {
    const result = filterProfiles(mockProfiles, "ronaldo");
    expect(result).toHaveLength(1);
    expect(result[0].fullname).toBe("Cristiano Ronaldo");
  });
});
