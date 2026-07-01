import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { Layout } from "@/components/layout/Layout";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { formatFollowers } from "@/utils/formatters";
import type { Platform } from "@/types";

const PLATFORM_BADGE: Record<Platform, React.CSSProperties> = {
  instagram: { background: "linear-gradient(135deg, #F77737, #E1306C)", color: "#fff" },
  youtube:   { background: "#FF0000", color: "#fff" },
  tiktok:    { background: "var(--bg-elevated)", color: "var(--platform-tiktok)", border: "1px solid var(--platform-tiktok)" },
};

export function MyListPage() {
  const profiles = useSelectedProfilesStore((state) => state.items);
  const removeProfile = useSelectedProfilesStore((state) => state.removeProfile);
  const clearProfiles = useSelectedProfilesStore((state) => state.clearProfiles);

  return (
    <Layout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-8)", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--fs-2xl)", letterSpacing: "-0.02em", marginBottom: "var(--space-2)" }}>
            My{" "}
            <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>List</span>
          </h1>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
            {profiles.length === 0
              ? "Your shortlisted creators will appear here."
              : `${profiles.length} creator${profiles.length === 1 ? "" : "s"} shortlisted`}
          </p>
        </div>
        {profiles.length > 0 && (
          <button
            type="button"
            onClick={clearProfiles}
            aria-label="Clear all selected profiles"
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--rounded-md)",
              border: "1px solid var(--status-error-dim)",
              backgroundColor: "var(--status-error-dim)",
              color: "var(--status-error)",
              cursor: "pointer",
              fontSize: "var(--fs-sm)",
              fontWeight: "var(--fw-medium)",
              transition: "all var(--transition-fast)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--status-error)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--status-error-dim)"; }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty state */}
      {profiles.length === 0 ? (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "var(--space-16) var(--space-6)",
          textAlign: "center",
          border: "1px dashed var(--border)",
          borderRadius: "var(--rounded-xl)",
          backgroundColor: "var(--bg-surface)",
          gap: "var(--space-4)",
        }}>
          <div style={{
            width: "64px", height: "64px",
            borderRadius: "var(--rounded-full)",
            background: "var(--bg-elevated)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem",
            marginBottom: "var(--space-2)",
          }}>
            📋
          </div>
          <h2 style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>No creators shortlisted yet</h2>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", maxWidth: "340px", lineHeight: "var(--lh-relaxed)" }}>
            Browse creators on the dashboard and click <strong style={{ color: "var(--text-primary)" }}>+ Add to List</strong> to build your shortlist.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-6)",
              background: "var(--gradient-brand)",
              color: "#fff",
              borderRadius: "var(--rounded-md)",
              textDecoration: "none",
              fontWeight: "var(--fw-semibold)",
              fontSize: "var(--fs-sm)",
              marginTop: "var(--space-2)",
              transition: "opacity var(--transition-fast)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Browse creators →
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--space-4)",
        }}>
          {profiles.map((profile) => (
            <article
              key={profile.id}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--rounded-lg)",
                overflow: "hidden",
                transition: "all var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card header */}
              <div style={{
                padding: "var(--space-5)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, transparent 100%)",
                borderBottom: "1px solid var(--border)",
              }}>
                <Avatar
                  src={profile.avatar}
                  alt={profile.username}
                  size={52}
                  withRing
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: "var(--space-1)" }}>
                    @{profile.username}
                  </p>
                  <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-2)" }}>
                    {profile.fullName}
                  </p>
                  <span style={{
                    ...PLATFORM_BADGE[profile.platform],
                    fontSize: "var(--fs-xs)",
                    fontWeight: "var(--fw-semibold)",
                    padding: "2px var(--space-2)",
                    borderRadius: "var(--rounded-full)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {getPlatformLabel(profile.platform)}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div style={{
                padding: "var(--space-4) var(--space-5)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-3)",
                fontSize: "var(--fs-sm)",
              }}>
                <div>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: "var(--space-1)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Followers</p>
                  <p style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{formatFollowers(profile.followers)}</p>
                </div>
                <div>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: "var(--space-1)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{profile.keyStatLabel}</p>
                  <p style={{ fontWeight: "var(--fw-semibold)", color: "var(--accent)" }}>{profile.keyStatValue}</p>
                </div>
                {profile.avgViews !== undefined && (
                  <div>
                    <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: "var(--space-1)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Avg Views</p>
                    <p style={{ fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{formatFollowers(profile.avgViews)}</p>
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div style={{
                padding: "var(--space-3) var(--space-5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--border)",
                marginTop: "auto",
              }}>
                <Link
                  to={`/profile/${profile.username}?platform=${profile.platform}`}
                  style={{
                    color: "var(--primary)",
                    textDecoration: "none",
                    fontWeight: "var(--fw-semibold)",
                    fontSize: "var(--fs-sm)",
                    transition: "color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                >
                  View profile →
                </Link>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.id)}
                  aria-label={`Remove ${profile.fullName} from list`}
                  style={{
                    padding: "var(--space-1) var(--space-3)",
                    borderRadius: "var(--rounded-md)",
                    border: "1px solid var(--border)",
                    backgroundColor: "transparent",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: "var(--fs-sm)",
                    fontWeight: "var(--fw-medium)",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--status-error)";
                    e.currentTarget.style.backgroundColor = "var(--status-error-dim)";
                    e.currentTarget.style.color = "var(--status-error)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </Layout>
  );
}
