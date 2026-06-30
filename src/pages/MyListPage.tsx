import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { formatFollowers } from "@/utils/formatters";

export function MyListPage() {
  const profiles = useSelectedProfilesStore((state) => state.items);
  const removeProfile = useSelectedProfilesStore((state) => state.removeProfile);
  const clearProfiles = useSelectedProfilesStore((state) => state.clearProfiles);

  return (
    <Layout title="My List">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--space-md)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--fs-base)",
          }}
        >
          {profiles.length === 0
            ? "Selected creators will appear here."
            : `${profiles.length} selected creator${profiles.length === 1 ? "" : "s"}.`}
        </p>
        {profiles.length > 0 && (
          <button
            type="button"
            onClick={clearProfiles}
            aria-label="Clear all selected profiles"
            style={{
              padding: "var(--space-sm) var(--space-md)",
              borderRadius: "var(--rounded-md)",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "var(--fs-sm)",
              fontWeight: "var(--fw-medium)",
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {profiles.length === 0 ? (
        <div
          style={{
            padding: "var(--space-3xl)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--rounded-md)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "var(--space-sm)" }}>No profiles selected</h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Add creators from the dashboard or profile details to build your shortlist.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              padding: "var(--space-sm) var(--space-md)",
              backgroundColor: "var(--primary)",
              color: "var(--text-inverse)",
              borderRadius: "var(--rounded-md)",
              textDecoration: "none",
              fontWeight: "var(--fw-semibold)",
            }}
          >
            Browse creators
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-md)",
          }}
        >
          {profiles.map((profile) => (
            <article
              key={profile.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
                padding: "var(--space-md)",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--rounded-md)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                }}
              >
                <img
                  src={profile.avatar}
                  alt={`${profile.fullName} profile picture`}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--rounded-full)",
                    objectFit: "cover",
                    border: "2px solid var(--border-light)",
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <h2
                    style={{
                      fontSize: "var(--fs-base)",
                      margin: "0 0 var(--space-xs) 0",
                    }}
                  >
                    @{profile.username}
                  </h2>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--fs-sm)",
                    }}
                  >
                    {profile.fullName}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--space-sm)",
                  fontSize: "var(--fs-sm)",
                }}
              >
                <div>
                  <p style={{ color: "var(--text-tertiary)" }}>Platform</p>
                  <p style={{ fontWeight: "var(--fw-semibold)" }}>
                    {getPlatformLabel(profile.platform)}
                  </p>
                </div>
                <div>
                  <p style={{ color: "var(--text-tertiary)" }}>Followers</p>
                  <p style={{ fontWeight: "var(--fw-semibold)" }}>
                    {formatFollowers(profile.followers)}
                  </p>
                </div>
                <div>
                  <p style={{ color: "var(--text-tertiary)" }}>
                    {profile.keyStatLabel}
                  </p>
                  <p style={{ fontWeight: "var(--fw-semibold)" }}>
                    {profile.keyStatValue}
                  </p>
                </div>
                {profile.avgViews !== undefined && (
                  <div>
                    <p style={{ color: "var(--text-tertiary)" }}>Avg views</p>
                    <p style={{ fontWeight: "var(--fw-semibold)" }}>
                      {formatFollowers(profile.avgViews)}
                    </p>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  marginTop: "auto",
                }}
              >
                <Link
                  to={`/profile/${profile.username}?platform=${profile.platform}`}
                  style={{
                    color: "var(--primary)",
                    textDecoration: "none",
                    fontWeight: "var(--fw-semibold)",
                    fontSize: "var(--fs-sm)",
                  }}
                >
                  View profile
                </Link>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.id)}
                  aria-label={`Remove ${profile.fullName} from list`}
                  style={{
                    padding: "var(--space-xs) var(--space-sm)",
                    borderRadius: "var(--rounded-md)",
                    border: "1px solid var(--status-error)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--status-error)",
                    cursor: "pointer",
                    fontSize: "var(--fs-sm)",
                    fontWeight: "var(--fw-medium)",
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
