import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { useSearchStore } from "@/store/searchStore";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const platform = useSearchStore((state) => state.platform);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

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

      <PlatformFilter />

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

      <ProfileList profiles={filtered} />
    </Layout>
  );
}
