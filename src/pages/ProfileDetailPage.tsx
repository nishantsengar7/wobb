import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--rounded-md)",
        padding: "var(--space-md)",
        textAlign: "center",
      }}
    >
      {icon && (
        <div style={{ fontSize: "1.5rem", marginBottom: "var(--space-xs)" }}>
          {icon}
        </div>
      )}
      <p
        style={{
          fontSize: "var(--fs-sm)",
          color: "var(--text-secondary)",
          margin: "0 0 var(--space-xs) 0",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "var(--fs-lg)",
          fontWeight: "var(--fw-semibold)",
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            color: "var(--primary)",
            textDecoration: "none",
            fontSize: "var(--fs-base)",
            marginBottom: "var(--space-lg)",
          }}
        >
          ← Back to creators
        </Link>
        <p style={{ color: "var(--status-error)" }}>Invalid profile</p>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title="Loading...">
        <div style={{ textAlign: "center", padding: "var(--space-3xl) 0" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--fs-base)" }}>
            ⏳ Fetching profile data...
          </p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            color: "var(--primary)",
            textDecoration: "none",
            fontSize: "var(--fs-base)",
            marginBottom: "var(--space-lg)",
          }}
        >
          ← Back to creators
        </Link>
        <p style={{ color: "var(--status-error)" }}>
          Could not load profile details for @{username}
        </p>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout>
      {/* Back Navigation */}
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-xs)",
          color: "var(--primary)",
          textDecoration: "none",
          fontSize: "var(--fs-base)",
          marginBottom: "var(--space-2xl)",
          transition: "color var(--transition-fast)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--primary-dark)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary)")}
      >
        ← Back to creators
      </Link>

      {/* Profile Hero Section */}
      <div
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--rounded-lg)",
          padding: "var(--space-2xl)",
          marginBottom: "var(--space-2xl)",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "var(--space-2xl)",
          alignItems: "start",
        }}
      >
        {/* Profile Image */}
        <img
          src={user.picture}
          alt={`${user.fullname} profile picture`}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "var(--rounded-lg)",
            objectFit: "cover",
            border: "2px solid var(--border-light)",
          }}
        />

        {/* Profile Info */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
              marginBottom: "var(--space-sm)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "var(--fs-2xl)",
                fontWeight: "var(--fw-bold)",
                color: "var(--text-primary)",
              }}
            >
              @{user.username}
            </h1>
            <VerifiedBadge verified={user.is_verified} />
          </div>

          <p
            style={{
              fontSize: "var(--fs-lg)",
              color: "var(--text-secondary)",
              margin: "0 0 var(--space-sm) 0",
            }}
          >
            {user.fullname}
          </p>

          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--text-tertiary)",
              margin: "0 0 var(--space-md) 0",
              textTransform: "capitalize",
            }}
          >
            📱 {platform}
          </p>

          {user.description && (
            <p
              style={{
                fontSize: "var(--fs-base)",
                color: "var(--text-secondary)",
                lineHeight: "var(--lh-relaxed)",
                margin: "0 0 var(--space-md) 0",
              }}
            >
              {user.description}
            </p>
          )}

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "var(--space-md)",
                padding: "var(--space-sm) var(--space-md)",
                backgroundColor: "var(--primary)",
                color: "var(--text-inverse)",
                textDecoration: "none",
                borderRadius: "var(--rounded-md)",
                fontWeight: "var(--fw-medium)",
                transition: "all var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary-dark)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View on {platform} →
            </a>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ marginBottom: "var(--space-2xl)" }}>
        <h2
          style={{
            fontSize: "var(--fs-xl)",
            fontWeight: "var(--fw-semibold)",
            marginBottom: "var(--space-md)",
            color: "var(--text-primary)",
          }}
        >
          Performance Metrics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-md)",
          }}
        >
          <StatCard
            label="Followers"
            value={formatFollowersDetail(user.followers)}
            icon="👥"
          />
          {user.engagement_rate !== undefined && (
            <StatCard
              label="Engagement Rate"
              value={`${(user.engagement_rate * 100).toFixed(2)}%`}
              icon="📈"
            />
          )}
          {user.posts_count !== undefined && (
            <StatCard
              label="Total Posts"
              value={user.posts_count.toLocaleString()}
              icon="📸"
            />
          )}
          {user.avg_likes !== undefined && (
            <StatCard
              label="Avg Likes"
              value={formatFollowersDetail(user.avg_likes)}
              icon="❤️"
            />
          )}
          {user.avg_comments !== undefined && (
            <StatCard label="Avg Comments" value={user.avg_comments.toString()} icon="💬" />
          )}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <StatCard
              label="Avg Views"
              value={formatFollowersDetail(user.avg_views)}
              icon="👁️"
            />
          )}
        </div>
      </div>

      {/* Additional Info Section */}
      {(user.gender || user.age_group || user.is_business) && (
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--rounded-md)",
            padding: "var(--space-lg)",
            marginBottom: "var(--space-2xl)",
          }}
        >
          <h3
            style={{
              fontSize: "var(--fs-base)",
              fontWeight: "var(--fw-semibold)",
              marginBottom: "var(--space-md)",
              color: "var(--text-primary)",
            }}
          >
            Profile Information
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "var(--space-md)",
            }}
          >
            {user.gender && (
              <div>
                <p
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--text-secondary)",
                    margin: "0 0 var(--space-xs) 0",
                  }}
                >
                  Gender
                </p>
                <p
                  style={{
                    fontSize: "var(--fs-base)",
                    fontWeight: "var(--fw-medium)",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {user.gender}
                </p>
              </div>
            )}
            {user.age_group && (
              <div>
                <p
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--text-secondary)",
                    margin: "0 0 var(--space-xs) 0",
                  }}
                >
                  Age Group
                </p>
                <p
                  style={{
                    fontSize: "var(--fs-base)",
                    fontWeight: "var(--fw-medium)",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {user.age_group}
                </p>
              </div>
            )}
            {user.is_business !== undefined && (
              <div>
                <p
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--text-secondary)",
                    margin: "0 0 var(--space-xs) 0",
                  }}
                >
                  Account Type
                </p>
                <p
                  style={{
                    fontSize: "var(--fs-base)",
                    fontWeight: "var(--fw-medium)",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {user.is_business ? "Business" : "Personal"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TODO: Add to List Feature */}
      <div style={{ marginTop: "var(--space-2xl)" }}>
        <button
          disabled
          style={{
            padding: "var(--space-md) var(--space-lg)",
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--rounded-md)",
            cursor: "not-allowed",
            fontSize: "var(--fs-base)",
            fontWeight: "var(--fw-medium)",
          }}
        >
          + Add to List (Coming Soon)
        </button>
      </div>
    </Layout>
  );
}
