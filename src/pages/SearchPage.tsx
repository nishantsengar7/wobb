import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setClickCount] = useState(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    setClickCount((prevCount) => {
      const nextCount = prevCount + 1;
      console.log("Clicked profile:", username, "total clicks:", nextCount);
      return nextCount;
    });
  };

  return (
    <Layout title="Discover Top Creators">
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <p
          style={{
            fontSize: "var(--fs-base)",
            color: "var(--text-secondary)",
            margin: "0 0 var(--space-lg) 0",
          }}
        >
          Browse and discover influential creators across social platforms
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-lg)",
          padding: "var(--space-md)",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--rounded-md)",
          border: "1px solid var(--border-light)",
          fontSize: "var(--fs-sm)",
          color: "var(--text-secondary)",
        }}
      >
        <div>
          Showing{" "}
          <span style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>
            {filtered.length}
          </span>{" "}
          of{" "}
          <span style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>
            {allProfiles.length}
          </span>{" "}
          creators on{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "var(--fw-semibold)" }}>
            {platform}
          </span>
        </div>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}

