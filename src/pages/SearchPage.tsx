import { Layout } from "@/components/layout/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { useFilteredProfiles } from "@/hooks/useFilteredProfiles";

export function SearchPage() {
  const { platform, allProfiles, filtered } = useFilteredProfiles();

  return (
    <Layout>
      {/* Hero */}
      <div style={{ marginBottom: "var(--space-10)" }}>
        <h1 style={{
          fontSize: "var(--fs-3xl)",
          fontWeight: "var(--fw-extrabold)",
          letterSpacing: "-0.03em",
          marginBottom: "var(--space-3)",
          lineHeight: "1.1",
        }}>
          <span style={{
            background: "var(--gradient-brand)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Discover</span>{" "}
          Top Creators
        </h1>
        <p style={{ fontSize: "var(--fs-base)", color: "var(--text-secondary)", maxWidth: "480px" }}>
          Find, research, and shortlist influential creators across Instagram, YouTube, and TikTok.
        </p>
      </div>

      <PlatformFilter />

      {/* Results bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--space-5)",
        padding: "var(--space-3) var(--space-4)",
        backgroundColor: "var(--bg-surface)",
        borderRadius: "var(--rounded-md)",
        border: "1px solid var(--border)",
      }}>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
          Showing{" "}
          <span style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>
            {filtered.length}
          </span>
          {" "}of{" "}
          <span style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>
            {allProfiles.length}
          </span>{" "}
          creators on{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "var(--fw-semibold)", color: "var(--primary)" }}>
            {platform}
          </span>
        </p>
        <span style={{
          fontSize: "var(--fs-xs)",
          color: "var(--text-muted)",
          backgroundColor: "var(--bg-elevated)",
          padding: "2px var(--space-2)",
          borderRadius: "var(--rounded-full)",
          fontWeight: "var(--fw-medium)",
        }}>
          {filtered.length} results
        </span>
      </div>

      <ProfileList profiles={filtered} />
    </Layout>
  );
}
